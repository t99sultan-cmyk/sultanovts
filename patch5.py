import os

page_path = "src/app/page.tsx"

with open(page_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Invoices
content = content.replace("Expert Naira", "Expert Neuro")
content = content.replace('alt="Счет 1 250 000 ₸"', 'alt="Счет 500 000 ₸"')
content = content.replace('Комплексный маркетинг', 'Лидогенерация')
content = content.replace('1 250 000 ₸', '@FIVE_HUNDRED_K@')
content = content.replace('@FIVE_HUNDRED_K@', '500 000 ₸') # Hack to safely replace the third invoice price

# 2. 30 000 000 block glowing redesign
block1 = """              <h2 className="text-[26px] font-black mb-8 leading-tight tracking-tight text-white text-left">
                Чтобы ваш бизнес делал <span className="text-orange-500">300 000 000 ₸ в год</span>, вам не нужны «новые фишки». Вам нужно внедрить эти 4 правила.
              </h2>"""
block2 = """              <div className="relative mb-10 p-6 sm:p-8 rounded-[2rem] border-2 border-orange-500/50 bg-[#1A0A05] shadow-[0_0_50px_rgba(249,115,22,0.15)] overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-600/20 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>
                <h2 className="text-[24px] sm:text-[30px] font-black leading-tight tracking-tight text-white text-left relative z-10">
                  Чтобы ваш бизнес сделал <br className="hidden sm:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] animate-pulse text-[36px] sm:text-[44px] border-b-4 border-red-500/50 inline-block mt-2 mb-3">30 000 000 ₸ в год</span><br className="hidden sm:block"/>
                  Вам не нужны «новые фишки» — вам нужно <span className="bg-orange-500/20 px-2 rounded">внедрить эти 4 правила.</span>
                </h2>
              </div>"""
content = content.replace(block1, block2)

# 3. Block 5 Quote Highlight
quote1 = """              «Итог простой: высокие результаты в бизнесе — это не магия. Это жесткая физика маркетинга. Если у вас посчитана экономика, выстроена фильтрация лидов и система "дожима" — ваш бизнес неизбежно растет. Именно эта архитектура делает продажи управляемыми»."""
quote2 = """              <span className="font-bold text-white text-[18px]">«Итог простой:</span> высокие результаты в бизнесе — это не магия. Это <span className="marker-highlight text-white px-2 py-0.5 rounded shadow-sm bg-orange-600 font-bold mx-1">жесткая физика маркетинга</span>. Если у вас посчитана экономика, выстроена фильтрация лидов и система "дожима" — ваш бизнес <span className="text-orange-400 font-bold border-b border-orange-500/50 mx-1 animate-pulse">неизбежно растет</span>. Именно эта архитектура делает продажи управляемыми»."""
content = content.replace(quote1, quote2)

# 4. Logos Track enlarge
logos1 = 'className="relative bg-white shrink-0 snap-center rounded-[1.25rem] w-[140px] h-[80px] sm:w-[160px] sm:h-[90px] flex flex-col items-center justify-center p-3 border border-gray-100 shadow-[0_5px_15px_rgba(0,0,0,0.04)] transition-all duration-300 hover:scale-[1.03] group cursor-pointer"'
logos2 = 'className="relative bg-white shrink-0 snap-center rounded-[1.5rem] w-[180px] h-[90px] sm:w-[220px] sm:h-[110px] flex flex-col items-center justify-center p-4 border border-gray-100 shadow-[0_15px_25px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.05] group cursor-pointer"'
content = content.replace(logos1, logos2)
content = content.replace('<h4 className="text-[18px] font-black mb-6 text-center text-white px-5 drop-shadow-md">', '<h4 className="text-[22px] sm:text-[26px] font-black mb-10 text-center text-orange-500 px-5 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)] tracking-tight">')

# 5. Deliverables Refactoring (3 colored cards)
card1_old = """                <div className="bg-[#0F0F1A] shadow-md border border-white/5 rounded-[2rem] p-6 flex items-start gap-4 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/30">
                    <span className="font-numbers font-black text-orange-500 text-[18px]">1</span>"""
card1_new = """                <div className="bg-gradient-to-br from-[#0F0F1A] to-[#141423] shadow-lg border border-blue-500/20 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 transition-transform hover:-translate-y-1 text-center sm:text-left hover:border-blue-500/50 group">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-transform">
                    <span className="font-numbers font-black text-blue-400 text-[18px]">1</span>"""
content = content.replace(card1_old, card1_new)

card2_old = """                <div className="bg-[#0F0F1A] shadow-md border border-white/5 rounded-[2rem] p-6 flex items-start gap-4 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/30">
                    <span className="font-numbers font-black text-orange-500 text-[18px]">2</span>"""
card2_new = """                <div className="bg-gradient-to-br from-[#0F0F1A] to-[#1A121F] shadow-lg border border-purple-500/20 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 transition-transform hover:-translate-y-1 text-center sm:text-left hover:border-purple-500/50 group">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform">
                    <span className="font-numbers font-black text-purple-400 text-[18px]">2</span>"""
content = content.replace(card2_old, card2_new)

card3_old = """                <div className="bg-[#0F0F1A] shadow-md border border-white/5 rounded-[2rem] p-6 flex items-start gap-4 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/30">
                    <span className="font-numbers font-black text-orange-500 text-[18px]">3</span>"""
card3_new = """                <div className="bg-gradient-to-br from-[#0F0F1A] to-[#0F1A15] shadow-lg border border-emerald-500/20 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 transition-transform hover:-translate-y-1 text-center sm:text-left hover:border-emerald-500/50 group">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
                    <span className="font-numbers font-black text-emerald-400 text-[18px]">3</span>"""
content = content.replace(card3_old, card3_new)

# 6. Anti-Persona Realism
anti1_old = """<strong className="text-white">Тем, кто ищет "волшебников".</strong> Мой маркетинг — это сухие цифры, аналитика и математика, а не пляски со случайным таргетом."""
anti1_new = """<strong className="text-white">Ищете "волшебную таблетку".</strong> Вы надеетесь, что можно закинуть 50$ в таргет и завтра получить миллионную прибыль, не меняя свой продукт."""
content = content.replace(anti1_old, anti1_new)

anti2_old = """<strong className="text-white">Бизнесам без отдела продаж.</strong> Если ваши менеджеры обрабатывают лиды по 5 часов — никакой гениальный трафик вас не спасет."""
anti2_new = """<strong className="text-white">У вас нет отдела продаж.</strong> Ваши лиды висят сутками, трубку никто не берет, и вы наивно считаете, что "хороший маркетолог должен сам всё продавать"."""
content = content.replace(anti2_old, anti2_new)

anti3_old = """<strong className="text-white">Хочу "просто попробовать".</strong> Построение конвейера продаж требует партнерства, погружения в экономику и жесткой дисциплины."""
anti3_new = """<strong className="text-white">Вам не нужен рост.</strong> Вы боитесь системного подхода, не готовы вкладывать бюджет в трафик и не способны обрабатывать по 30-50 заявок ежедневно."""
content = content.replace(anti3_old, anti3_new)

# 7. 50k Guarantee Upgrade
guar1 = """                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] overflow-hidden border-2 border-green-500/50 shadow-[0_15px_50px_rgba(34,197,94,0.25)] mb-5 relative group-hover:-translate-y-2 transition-transform duration-500">"""
guar2 = """                  <div className="absolute -top-10 -right-10 text-[120px] opacity-[0.03] select-none pointer-events-none font-black text-green-500 rotate-12">ГАРАНТИЯ</div>
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-[2.5rem] overflow-hidden border-4 border-green-500/50 shadow-[0_20px_60px_rgba(34,197,94,0.4)] mb-6 relative group-hover:-translate-y-3 group-hover:scale-105 transition-all duration-500">"""
content = content.replace(guar1, guar2)

with open(page_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patched successfully!")
