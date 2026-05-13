# ============================================================
# Makefile — управление Docker-развёртыванием
# ============================================================
# Доступные команды:
#   make build    — собрать Docker-образ
#   make up       — запустить все сервисы
#   make down     — остановить все сервисы
#   make restart  — перезапустить сервисы
#   make logs     — посмотреть логи
#   make status   — статус контейнеров
#   make clean    — остановить и удалить volumes
# ============================================================

.PHONY: build up down restart logs status clean

# Сборка образа
build:
	docker compose build

# Запуск всех сервисов
up:
	docker compose up -d

# Остановка сервисов
down:
	docker compose down

# Перезапуск
restart: down up

# Логи
logs:
	docker compose logs -f

# Статус контейнеров
status:
	docker compose ps

# Полная очистка (остановить + удалить volumes)
clean:
	docker compose down -v
