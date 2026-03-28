import os

FILE_PATH = "src/app/page.tsx"

with open(FILE_PATH, "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    '"настройки в кабинете"': '&quot;настройки в кабинете&quot;',
    '"секретные фишки"': '&quot;секретные фишки&quot;',
    '"Дожима"': '&quot;Дожима&quot;',
    '"Цифровую тень"': '&quot;Цифровую тень&quot;',
    '"дожима"': '&quot;дожима&quot;',
    '"везения"': '&quot;везения&quot;',
    '"по косточкам"': '&quot;по косточкам&quot;',
    '>"</div>': '>&quot;</div>',
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(FILE_PATH, "w", encoding="utf-8") as f:
    f.write(content)
print("Quotes fixed successfully!")
