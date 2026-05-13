"use server";

export interface FormState {
  success?: boolean;
  error?: string;
}

export async function submitContactForm(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name")?.toString().trim();
  const contact = formData.get("contact")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const address = formData.get("address")?.toString().trim();

  if (!name || !contact || !description) {
    return { error: "Пожалуйста, заполните все поля" };
  }

  if (name.length < 2) {
    return { error: "Имя должно содержать хотя бы 2 символа" };
  }

  if (contact.length < 3) {
    return { error: "Укажите корректный телефон или Telegram-логін" };
  }

  if (description.length < 5) {
    return { error: "Опишите задачу подробнее (хотя бы 5 символов)" };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Missing Telegram configuration in env");
    return { error: "Ошибка конфигурации сервера. Попробуйте позже." };
  }

  const now = new Date();
  const dateStr = now.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const addressLine = address && address.length > 0
    ? `<b>📍 Адрес:</b> ${escapeHtml(address)}`
    : `<b>📍 Адрес:</b> Не указан`;

  const message = [
    "<b>📩 Новая заявка с лендинга</b>",
    "",
    `<b>👤 Имя:</b> ${escapeHtml(name)}`,
    `<b>📞 Контакт:</b> ${escapeHtml(contact)}`,
    addressLine,
    `<b>📝 Задача:</b> ${escapeHtml(description)}`,
    "",
    `<i>🕐 ${dateStr}</i>`,
  ].join("\n");

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    const body = await response.json().catch(() => ({}));

    if (!response.ok || !body?.ok) {
      console.error("Telegram API error:", response.status, body);
      if (response.status === 401) {
        return { error: "Ошибка авторизации бота. Сообщите владельцу." };
      }
      if (response.status === 429) {
        return { error: "Слишком много запросов. Подождите минуту." };
      }
      return { error: "Не удалось отправить заявку. Попробуйте позже." };
    }

    return { success: true };
  } catch (e) {
    console.error("Network error sending Telegram message:", e);
    return { error: "Ошибка сети. Проверьте подключение и попробуйте ещё раз." };
  }
}

export async function submitReview(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("reviewName")?.toString().trim();
  const text = formData.get("reviewText")?.toString().trim();
  const photo = formData.get("reviewPhoto");

  if (!name || !text) {
    return { error: "Пожалуйста, заполните все поля" };
  }

  if (name.length < 2) {
    return { error: "Имя должно содержать хотя бы 2 символа" };
  }

  if (text.length < 10) {
    return { error: "Напишите отзыв подробнее (хотя бы 10 символов)" };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Missing Telegram configuration in env");
    return { error: "Ошибка конфигурации сервера. Попробуйте позже." };
  }

  const now = new Date();
  const dateStr = now.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const caption = [
    "<b>⭐️ НОВЫЙ ОТЗЫВ НА МОДЕРАЦИЮ</b>",
    "",
    `<b>👤 От кого:</b> ${escapeHtml(name)}`,
    `<b>💬 Текст:</b> ${escapeHtml(text)}`,
    "",
    `<i>🕐 ${dateStr}</i>`,
  ].join("\n");

  try {
    const hasPhoto = photo instanceof File && photo.size > 0;

    if (hasPhoto) {
      const tgFormData = new FormData();
      tgFormData.append("chat_id", chatId);
      tgFormData.append("photo", photo);
      tgFormData.append("caption", caption);
      tgFormData.append("parse_mode", "HTML");

      const response = await fetch(
        `https://api.telegram.org/bot${token}/sendPhoto`,
        {
          method: "POST",
          body: tgFormData,
        }
      );

      const body = await response.json().catch(() => ({}));

      if (!response.ok || !body?.ok) {
        console.error("Telegram API error (sendPhoto):", response.status, body);
        if (response.status === 401) {
          return { error: "Ошибка авторизации бота. Сообщите владельцу." };
        }
        return { error: "Не удалось отправить отзыв с фото. Попробуйте без фото." };
      }

      return { success: true };
    }

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: caption,
          parse_mode: "HTML",
        }),
      }
    );

    const body = await response.json().catch(() => ({}));

    if (!response.ok || !body?.ok) {
      console.error("Telegram API error:", response.status, body);
      if (response.status === 401) {
        return { error: "Ошибка авторизации бота. Сообщите владельцу." };
      }
      return { error: "Не удалось отправить отзыв. Попробуйте позже." };
    }

    return { success: true };
  } catch (e) {
    console.error("Network error sending Telegram message:", e);
    return { error: "Ошибка сети. Проверьте подключение и попробуйте ещё раз." };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
