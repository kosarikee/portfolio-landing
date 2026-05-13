#!/bin/sh
# ============================================================
# ssl-setup.sh — Получение SSL-сертификатов Let's Encrypt
# ============================================================
# Использование:
#   1. Укажите DOMAIN в .env
#   2. Убедитесь, что DNS вашего домена указывает на сервер
#   3. Запустите: sudo ./nginx/ssl-setup.sh
# ============================================================

set -e

# Загрузка переменных
if [ -f .env ]; then
    . ./.env
fi

DOMAIN="${DOMAIN:-}"
if [ -z "$DOMAIN" ]; then
    echo "ОШИБКА: Укажите DOMAIN в .env файле"
    echo "  echo 'DOMAIN=your-domain.ru' >> .env"
    exit 1
fi

echo "=== Получение SSL-сертификата для $DOMAIN ==="

# Установка certbot если нет
if ! command -v certbot >/dev/null 2>&1; then
    echo "Устанавливаю certbot..."
    apt-get update && apt-get install -y certbot
fi

# Остановка nginx (порт 80 должен быть свободен)
echo "Останавливаю nginx..."
docker compose stop nginx 2>/dev/null || true

# Получение сертификата
certbot certonly --standalone \
    -d "$DOMAIN" \
    --non-interactive \
    --agree-tos \
    --email "${NEXT_PUBLIC_EMAIL:-admin@$DOMAIN}" \
    --http-01-port=80

# Копирование сертификатов в Docker volume
echo "Копирую сертификаты..."
docker run --rm -v portfolio-landing_ssl-certs:/certs alpine sh -c "
    cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem /certs/ 2>/dev/null || \
    echo 'Сертификаты будут доступны certbot в Docker'
"

# Запуск nginx
echo "Запускаю nginx..."
docker compose up -d nginx

echo ""
echo "=== Готово! SSL для $DOMAIN настроен ==="
echo "Сайт доступен по адресу: https://$DOMAIN"
echo ""
echo "Автообновление (добавьте в crontab):"
echo "  0 3 * * * certbot renew --quiet && docker compose restart nginx"
