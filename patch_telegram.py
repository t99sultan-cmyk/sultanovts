import os

api_path = "src/app/api/telegram/route.ts"
form_path = "src/components/MultiStepForm.tsx"

with open(api_path, "r", encoding="utf-8") as f:
    api_c = f.read()

api_old = """    const message = `
🔥 <b>Новая заявка на Стратегический Разбор! (990 KZT)</b>

👤 <b>Имя:</b> ${data.name || 'Не указано'}
📱 <b>Контакты (TG/WA):</b> ${data.phone || 'Не указаны'}
🔗 <b>Ссылка/Логин:</b> ${data.link || 'Не указана'}
💵 <b>Оборот:</b> ${data.revenue || 'Не указан'}
🎯 <b>Главная боль:</b> ${data.pain || 'Не указана'}
${data.customPain ? `📝 <b>Свой вариант боли:</b> ${data.customPain}\\n` : ''}
⚡️ <b>Основная задача на разбор:</b> ${data.task || 'Не указана'}
    `;"""

api_new = """    const painMap: Record<string, string> = {
      quality: 'Заявки есть, но они некачественные',
      quantity: 'Заявок мало, отдел продаж простаивает',
      price: 'Цена лида растет, не окупается',
      scale: 'Уперлись в стеклянный потолок',
      custom: 'Свой вариант'
    };
    
    // Safety escape for telegram HTML
    const escapeHTML = (str: string) => str ? String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : 'Не указана';

    const painText = data.pain ? (painMap[data.pain] || data.pain) : 'Не указана';

    const message = `
🔥 <b>Новая заявка на Стратегический Разбор! (990 KZT)</b>

👤 <b>Имя:</b> ${escapeHTML(data.name)}
📱 <b>Контакты:</b> ${escapeHTML(data.phone)}
🔗 <b>Ссылка:</b> ${escapeHTML(data.link)}
💵 <b>Оборот:</b> ${escapeHTML(data.revenue)}
💰 <b>Готовый бюджет:</b> ${escapeHTML(data.budget)}
🎯 <b>Главная боль:</b> ${escapeHTML(painText)}
${data.customPain ? `📝 <b>Свой вариант боли:</b> ${escapeHTML(data.customPain)}\n` : ''}
⚡️ <b>Основная задача:</b>
${escapeHTML(data.task)}
    `;"""

api_c = api_c.replace(api_old, api_new)
with open(api_path, "w", encoding="utf-8") as f:
    f.write(api_c)

with open(form_path, "r", encoding="utf-8") as f:
    form_c = f.read()

form_old = """body: JSON.stringify({ name, phone, link, revenue, pain, customPain, task })"""
form_new = """body: JSON.stringify({ name, phone, link, revenue, budget, pain, customPain, task })"""
form_c = form_c.replace(form_old, form_new)

with open(form_path, "w", encoding="utf-8") as f:
    form_c = form_c.write(form_c)
print("Forms patched")
