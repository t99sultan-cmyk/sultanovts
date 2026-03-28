import re

def patch_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Rule Headers Redesign
    # Rule 1
    content = content.replace(
        '<div className="w-14 h-14 shrink-0 rounded-[1.2rem] bg-orange-100 flex items-center justify-center font-numbers font-black text-[24px] text-orange-500 border border-orange-200">1</div>',
        '<div className="w-16 h-16 shrink-0 rounded-[1.2rem] bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-numbers font-black text-[30px] text-white shadow-[0_10px_20px_rgba(249,115,22,0.3)] border-2 border-orange-200 relative overflow-hidden"><div className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full animate-shimmer" style={{animationDuration: "3s", animationIterationCount: "infinite"}}></div>1</div>'
    )
    content = content.replace(
        '<h2 className="text-[20px] font-bold text-gray-900 leading-tight flex-1">\n                  Правило 1: Отказ от метрики «дешевый лид»',
        '<h2 className="text-[24px] font-black text-gray-900 leading-tight flex-1">\n                  Правило 1: Отказ от метрики <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">«дешевый лид»</span>'
    )

    # Rule 2
    content = content.replace(
        '<div className="w-14 h-14 shrink-0 rounded-[1.2rem] bg-purple-100 flex items-center justify-center font-numbers font-black text-[24px] text-purple-600 border border-purple-200">2</div>',
        '<div className="w-16 h-16 shrink-0 rounded-[1.2rem] bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center font-numbers font-black text-[30px] text-white shadow-[0_10px_20px_rgba(168,85,247,0.3)] border-2 border-purple-200 relative overflow-hidden"><div className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full animate-shimmer" style={{animationDuration: "3s", animationIterationCount: "infinite"}}></div>2</div>'
    )
    content = content.replace(
        '<h2 className="text-[20px] font-bold text-gray-900 leading-tight flex-1">\n                  Правило 2: Отказ от «Бесплатников» и убийственных скидок\n                </h2>',
        '<h2 className="text-[24px] font-black text-gray-900 leading-tight flex-1">\n                  Правило 2: Отказ от <span className="text-purple-600">«Бесплатников»</span> и <span className="marker-highlight text-white px-2 py-0.5 rounded" style={{background: "#9333ea"}}>убийственных скидок</span>\n                </h2>'
    )

    # Rule 3
    content = content.replace(
        '<div className="w-14 h-14 shrink-0 rounded-[1.2rem] bg-blue-100 flex items-center justify-center font-numbers font-black text-[24px] text-blue-600 border border-blue-200">3</div>',
        '<div className="w-16 h-16 shrink-0 rounded-[1.2rem] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-numbers font-black text-[30px] text-white shadow-[0_10px_20px_rgba(59,130,246,0.3)] border-2 border-blue-200 relative overflow-hidden"><div className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full animate-shimmer" style={{animationDuration: "3s", animationIterationCount: "infinite"}}></div>3</div>'
    )
    content = content.replace(
        '<h2 className="text-[20px] font-bold text-gray-900 leading-tight flex-1">\n                  Правило 3: Система «Безопасного масштабирования»',
        '<h2 className="text-[24px] font-black text-gray-900 leading-tight flex-1">\n                  Правило 3: Система <span className="text-blue-600">«Безопасного масштабирования»</span>'
    )

    # Rule 4
    content = content.replace(
        '<div className="w-14 h-14 shrink-0 rounded-[1.2rem] bg-emerald-100 flex items-center justify-center font-numbers font-black text-[24px] text-emerald-600 border border-emerald-200">4</div>',
        '<div className="w-16 h-16 shrink-0 rounded-[1.2rem] bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-numbers font-black text-[30px] text-white shadow-[0_10px_20px_rgba(16,185,129,0.3)] border-2 border-emerald-200 relative overflow-hidden"><div className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full animate-shimmer" style={{animationDuration: "3s", animationIterationCount: "infinite"}}></div>4</div>'
    )
    content = content.replace(
        '<h2 className="text-[20px] font-bold text-gray-900 leading-tight flex-1">\n                  Правило 4: «Эффект присутствия»',
        '<h2 className="text-[24px] font-black text-gray-900 leading-tight flex-1">\n                  Правило 4: <span className="text-emerald-600">«Эффект присутствия»</span>'
    )

    # 2. Rule 2 Highlights
    q_rule2_1 = """Но таргетолог со слезами просит: <em>«Дайте акцию!»</em>. В итоге вы получаете базу халявщиков, доходимость падает до 30%, а ваши менеджеры превращаются в бесплатных психологов для людей с фразой «я просто спросить»."""
    r_rule2_1 = """Но таргетолог со слезами просит: <em className="text-red-500 font-bold">«Дайте акцию!»</em>. В итоге вы получаете <span className="marker-highlight text-white px-2 py-0.5 rounded shadow-sm" style={{background: "#db2777"}}>базу халявщиков</span>, доходимость падает <strong className="text-red-600">до 30%</strong>, а ваши менеджеры превращаются в бесплатных психологов для людей с фразой <span className="underline decoration-purple-400 decoration-wavy">«я просто спросить»</span>."""
    content = content.replace(q_rule2_1, r_rule2_1)

    # 3. Rule 4 Highlights
    q_rule4_1 = """                    <strong className="text-gray-900 block mb-1">Ситуация на рынке:</strong> 95% людей не покупают сразу. Они кликают и уходят «подумать». Таргетологи на этом этапе прекращают работу и ищут новых «прохожих». <strong>В итоге:</strong> Вы уже заплатили за внимание, но не забрали деньги — клиент уходит к более настойчивым конкурентам."""
    r_rule4_1 = """                    <strong className="text-emerald-700 block mb-2 text-[16px] border-b border-emerald-200 pb-2">Ситуация на рынке:</strong> <span className="font-bold text-red-600 text-[16px] animate-pulse">95% людей не покупают сразу</span>. Они кликают и уходят «подумать». Таргетологи на этом этапе прекращают работу и ищут новых «прохожих». <br/><br/><strong className="text-gray-900 bg-red-100 px-2 py-1 rounded">В итоге:</strong> Вы уже заплатили за внимание, но <span className="marker-highlight text-white px-2 py-0.5 rounded shadow-sm" style={{background: "#ef4444"}}>не забрали деньги</span> — клиент уходит к более настойчивым конкурентам."""
    content = content.replace(q_rule4_1, r_rule4_1)

    # 4. Animated Branches on Scroll
    # Find the mapping of animated new branches:
    q_branches = """                       {/* Animated new branches */}
                       {[ 
                         { n: 3, c: 'Алматы' },
                         { n: 4, c: 'Алматы' },
                         { n: 5, c: 'Алматы' },
                         { n: 6, c: 'Алматы' },
                         { n: 7, c: 'Шымкент' },
                         { n: 8, c: 'Шымкент' },
                         { n: 9, c: 'Астана' }
                       ].map((b, i) => (
                         <div key={b.n} className="h-12 rounded-[1rem] bg-orange-50 border border-orange-200 flex items-center shadow-sm opacity-0 animate-build relative overflow-hidden pl-2.5 sm:pl-4" style={{ animationDelay: `${0.5 + i * 0.4}s` }}>"""
    r_branches = """                       {/* Animated new branches */}
                       {[ 
                         { n: 3, c: 'Алматы' },
                         { n: 4, c: 'Алматы' },
                         { n: 5, c: 'Алматы' },
                         { n: 6, c: 'Алматы' },
                         { n: 7, c: 'Шымкент' },
                         { n: 8, c: 'Шымкент' },
                         { n: 9, c: 'Астана' }
                       ].map((b, i) => (
                         <motion.div 
                           key={b.n} 
                           initial={{ opacity: 0, scale: 0.5, y: 20 }}
                           whileInView={{ opacity: 1, scale: 1, y: 0 }}
                           viewport={{ once: true, margin: "0px" }}
                           transition={{ duration: 0.4, delay: 0.2 + i * 0.2, type: 'spring' }}
                           className="h-12 rounded-[1rem] bg-orange-50 border border-orange-200 flex items-center shadow-sm relative overflow-hidden pl-2.5 sm:pl-4"
                         >"""
    content = content.replace(q_branches, r_branches)
    # the closing tag mapping (</div> to </motion.div>)
    # This is tricky without exact bounds, but we know the structure:
    # <span className="...">#{b.n}</span>
    # <span className="...">...</span>
    # </div>
    # It's better to replace the whole block if possible, but the inside is small.
    q_branch_close = """                           <span className="text-[11px] sm:text-[13px] font-bold text-orange-600 uppercase tracking-wide leading-none">{b.c}</span>
                         </div>
                       ))}"""
    r_branch_close = """                           <span className="text-[11px] sm:text-[13px] font-bold text-orange-600 uppercase tracking-wide leading-none">{b.c}</span>
                         </motion.div>
                       ))}"""
    content = content.replace(q_branch_close, r_branch_close)

    # 5. Invoices Font Size
    content = content.replace('text-[14px] font-bold text-gray-800 dark:text-gray-200 mb-3', 'text-[18px] sm:text-[20px] font-black text-gray-900 dark:text-gray-100 mb-3')
    content = content.replace('text-[24px] leading-none', 'text-[32px] sm:text-[36px] drop-shadow-md leading-none')

    # 6. Block 5 Background 
    q_block5 = """          {/* STATIC PREMIUM DARK NOISE BACKGROUND */}
          <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none bg-[#05050A] border-t border-gray-100">
             <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
             <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-[#05050A]/90 to-[#05050A]"></div>
          </div>"""
    r_block5 = """          {/* STATIC PREMIUM DARK NOISE BACKGROUND */}
          <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none bg-[#05050A] border-t-2 border-orange-500/30">
             <AnimatedGridPattern 
                numSquares={40} 
                maxOpacity={0.15} 
                duration={4} 
                className="absolute inset-0 w-full h-full opacity-30 text-emerald-500"
              />
             <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>
             <div className="absolute inset-0 bg-gradient-to-b from-[#05050A] via-[#05050A]/90 to-[#05050A]"></div>
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-orange-500/10 blur-[120px] rounded-full"></div>
          </div>"""
    content = content.replace(q_block5, r_block5)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    patch_file("/Users/timur/Antigravity/architect-marketing/src/app/page.tsx")
