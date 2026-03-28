import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Telegram Bot configuration from environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn("Telegram tokens are not configured in .env.local");
      return NextResponse.json({ success: false, error: "Telegram API is not configured" }, { status: 500 });
    }

    const painMap: Record<string, string> = {
      quality: 'Заявки есть, но они некачественные',
      quantity: 'Заявок мало, отдел продаж простаивает',
      price: 'Цена лида растет, не окупается',
      scale: 'Уперлись в стеклянный потолок',
      custom: 'Свой вариант'
    };

    // Safety escape for telegram HTML
    const escapeHTML = (str: any) => str ? String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : 'Не указана';
    const painText = data.pain ? (painMap[data.pain] || data.pain) : 'Не указана';

    // Creating beautiful message formatting
    const message = `
🔥 <b>Новая заявка на Стратегический Разбор!</b>

👤 <b>Имя:</b> ${escapeHTML(data.name)}
📱 <b>Контакты (TG/WA):</b> ${escapeHTML(data.phone)}
🔗 <b>Ссылка/Логин:</b> ${escapeHTML(data.link)}
💵 <b>Оборот:</b> ${escapeHTML(data.revenue)}
💰 <b>Бюджет в день:</b> ${escapeHTML(data.budget)}
🎯 <b>Главная боль:</b> ${escapeHTML(painText)}
${data.customPain ? `📝 <b>Свой вариант:</b> ${escapeHTML(data.customPain)}\n` : ''}
⚡️ <b>Основная задача на разбор:</b>
<i>${escapeHTML(data.task)}</i>
    `;

    // Send to Telegram
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      console.error("Telegram API Error:", result);
      return NextResponse.json({ success: false, error: result.description }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending to telegram:", error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
