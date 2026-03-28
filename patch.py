import re
import sys

def patch_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Chunk 1: Background of "System: 4 puzzles"
    q1 = """            <div className="bg-gray-900 rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-[50px] pointer-events-none"></div>
              <h2 className="text-[13px] text-orange-500 font-black uppercase tracking-widest mb-3">Система: 4 пазла кратного роста</h2>
              <h3 className="text-[28px] font-bold leading-[1.1] text-white mb-4 tracking-tight">
                Почему ваш текущий маркетинг не выполняет планы?
              </h3>
              <p className="text-gray-300 font-medium text-[14px] bg-white/5 border border-white/10 p-4 rounded-xl">
                (И 4 правила, как нужно строить систему на 300 000 000+ ₸ в год)
              </p>
            </div>"""
    r1 = """            <div className="bg-[#05050A] rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(249,115,22,0.15)] relative overflow-hidden border border-orange-500/20">
              <AnimatedGridPattern 
                numSquares={30} 
                maxOpacity={0.15} 
                duration={3} 
                className="absolute inset-0 w-full h-full opacity-50 text-orange-500"
              />
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/30 blur-[80px] pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 blur-[60px] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col items-start">
                <div className="inline-flex items-center space-x-2 bg-orange-500/10 backdrop-blur-md border border-orange-500/30 rounded-full px-3 py-1.5 mb-4 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                  <span className="text-[11px] font-black text-orange-400 tracking-widest uppercase">Система: 4 пазла кратного роста</span>
                </div>
                
                <h3 className="text-[30px] font-black leading-[1.1] text-white mb-5 tracking-tight drop-shadow-md">
                  Почему ваш текущий <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">маркетинг</span> не выполняет планы?
                </h3>
                <p className="text-gray-200 font-bold text-[15px] bg-white/5 border border-white/10 p-5 rounded-xl backdrop-blur-sm relative overflow-hidden group w-full">
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></span>
                  (И 4 правила, как нужно строить бизнес-систему с выручкой <span className="text-orange-400">300 000 000+ ₸</span> в год)
                </p>
              </div>
            </div>"""
    content = content.replace(q1, r1)

    # Chunk 2: Market Situation
    q2 = """                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                  <p>
                    <strong className="text-gray-900 block mb-1">Ситуация на рынке:</strong> Ваш текущий специалист радостно отчитывается: «Я привел 100 заявок по 1 доллару!». Вы смотрите в кассу — а там пусто. Отдел продаж кричит, что лиды — мусор, а таргетолог отвечает, что менеджеры не умеют продавать.
                  </p>
                </div>"""
    r2 = """                <div className="bg-gradient-to-br from-red-50 to-gray-50 p-6 rounded-2xl border border-red-100 shadow-[inset_0_2px_10px_rgba(239,68,68,0.05)] relative group bg-white">
                  <div className="absolute top-4 right-4 text-2xl group-hover:animate-bounce">📉</div>
                  <p className="relative z-10 text-gray-800 leading-relaxed">
                    <strong className="text-red-600 block mb-3 text-[16px] uppercase tracking-wide border-b border-red-200 pb-2 w-max pr-4">Ситуация на рынке:</strong> 
                    Ваш текущий специалист радостно отчитывается: «Я привел 100 заявок по 1 доллару!». Вы смотрите в кассу — а там пусто. Отдел продаж кричит, что лиды — мусор, а таргетолог отвечает, что менеджеры не умеют продавать. 
                    <span className="inline-block mt-2 font-bold text-white px-2 py-0.5 rounded shadow-sm animate-pulse-glow" style={{background: '#ef4444'}}>Это слив бюджета, а не маркетинг!</span>
                  </p>
                </div>"""
    content = content.replace(q2, r2)
    
    # Chunk 3: Dubai
    q3 = """                       {/* 10th Branch - Dubai! */}
                       <div className="relative h-14 rounded-[1rem] bg-gradient-to-r from-yellow-400 to-orange-500 border border-orange-300 flex items-center justify-center shadow-[0_10px_30px_rgba(249,115,22,0.3)] opacity-0 animate-build overflow-visible col-span-2 mt-2" style={{ animationDelay: '3.3s' }}>
                          <span className="text-[18px] font-black text-white/40 absolute left-4">#10</span>
                          <span className="text-[14px] sm:text-[16px] font-black text-white uppercase tracking-widest flex items-center gap-2 z-10">
                            Дубай 🇦🇪
                          </span>
                          <div className="absolute -top-3 right-[-10px] bg-gray-900 text-white text-[9px] font-bold px-2 py-1 rounded shadow-xl uppercase tracking-wider whitespace-nowrap z-20 animate-bounce" style={{ animationDelay: '3.8s' }}>
                            Новый рынок 🔥
                          </div>
                          {/* Radiating rings */}
                          <div className="absolute inset-0 rounded-[1rem] border-2 border-orange-400 opacity-0 bg-transparent animate-ping" style={{ animationDelay: '3.8s', animationDuration: '2s' }}></div>
                       </div>"""
    r3 = """                       {/* 10th Branch - Dubai! */}
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.5, y: 20 }}
                         whileInView={{ opacity: 1, scale: 1, y: 0 }}
                         transition={{ duration: 0.8, delay: 1.5, type: 'spring' }}
                         viewport={{ once: true, margin: "-50px" }}
                         onViewportEnter={() => {
                           setTimeout(() => {
                             import("canvas-confetti").then((confetti) => {
                               confetti.default({
                                 particleCount: 150,
                                 spread: 80,
                                 origin: { y: 0.6 },
                                 colors: ['#F97316', '#EAB308', '#FFFFFF', '#3B82F6']
                               });
                             });
                           }, 1500);
                         }}
                         className="relative h-14 rounded-[1rem] bg-gradient-to-r from-yellow-400 to-orange-500 border border-orange-300 flex items-center justify-center shadow-[0_10px_30px_rgba(249,115,22,0.3)] overflow-visible col-span-2 mt-2"
                       >
                          <span className="text-[18px] font-black text-white/40 absolute left-4">#10</span>
                          <span className="text-[14px] sm:text-[16px] font-black text-white uppercase tracking-widest flex items-center gap-2 z-10">
                            Дубай 🇦🇪
                          </span>
                          <div className="absolute -top-3 right-[-10px] bg-gray-900 text-white text-[9px] font-bold px-2 py-1 rounded shadow-xl uppercase tracking-wider whitespace-nowrap z-20 animate-bounce">
                            Новый рынок 🔥
                          </div>
                          {/* Radiating rings */}
                          <div className="absolute inset-0 rounded-[1rem] border-2 border-orange-400 bg-transparent animate-ping" style={{ animationDuration: '2s' }}></div>
                       </motion.div>"""
    content = content.replace(q3, r3)

    # Chunk 4: Infobusiness
    q4 = """                  <div className="bg-purple-50 p-5 rounded-2xl border border-purple-200 mt-5 shadow-sm">
                    <p className="mb-2">
                      <strong className="text-gray-900 text-[15px]">Международный кейс: Инфобизнес (Чек 900 000 ₸)</strong>
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-[14px] space-y-1">
                       <li>Мы убили «бесплатные вебинары» и сделали стартовый продукт за 1 000 ₸.</li>
                       <li>Мы не продавали его «в лоб». Мы выстроили специальную механику прогрева через таргет.</li>
                       <li><strong>Итог:</strong> До 30% таких людей покупали флагман за 900 000 ₸. Клиент обошелся дешевле, чем при бесплатных доступах!</li>
                    </ul>
                  </div>"""
    r4 = """                  <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-[1.5rem] border-[1.5px] border-purple-300 shadow-[0_10px_30px_rgba(168,85,247,0.1)] mt-5 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
                    <p className="mb-4 relative z-10">
                      <span className="text-gray-900 text-[16px] font-bold flex flex-wrap items-center gap-2">
                        Кейс: 
                        <span className="relative inline-block px-2 py-1 bg-purple-600 text-white rounded-md shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:scale-105 transition">Инфобизнес</span>
                        (Чек 
                        <span className="font-bold text-white px-2 py-1 rounded animate-pulse" style={{background: '#9333ea'}}>900 000 ₸</span>)
                      </span>
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-[14px] space-y-2 relative z-10 text-gray-800">
                       <li>Мы убили «бесплатные вебинары» и сделали стартовый продукт за 1 000 ₸.</li>
                       <li>Мы не продавали его «в лоб». Мы выстроили специальную механику прогрева через таргет.</li>
                       <li className="font-medium bg-purple-100/50 p-2 rounded-lg"><strong>Итог:</strong> До 30% таких людей покупали флагман за <strong className="text-purple-700 underline decoration-purple-400 decoration-2 underline-offset-2 animate-pulse">900 000 ₸</strong>. Клиент обошелся дешевле!</li>
                    </ul>
                  </div>"""
    content = content.replace(q4, r4)

    # Chunk 5: Invoices header
    q5 = """          <h3 className="text-[26px] font-black text-center text-gray-900 dark:text-white mb-3 tracking-tight leading-tight max-w-sm mx-auto">Бизнес доверяет мне чеки от 500k до 2 млн ₸ уже с 2018 года</h3>
          <p className="text-gray-500 dark:text-gray-400 text-[14px] text-center mb-6 max-w-sm mx-auto font-medium px-4">Я не «выстрелил» вчера. Моя система генерирует системную прибыль в любой кризис.</p>"""
    r5 = """          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white border border-gray-700 rounded-full px-4 py-2 mb-6 shadow-xl w-max ml-auto mr-auto flex">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[11px] font-black tracking-widest uppercase">Факты и цифры</span>
          </div>
          <h3 className="text-[28px] font-black text-center text-gray-900 dark:text-white mb-4 tracking-tight leading-tight max-w-sm mx-auto mt-2">
            Бизнес <span className="text-orange-600 underline decoration-orange-300 decoration-4 underline-offset-4">доверяет</span> мне чеки от 500k до 2 млн ₸
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-[15px] text-center mb-8 max-w-sm mx-auto font-medium px-4 leading-relaxed">Это не просто скриншоты. За каждым чеком стоит системная прибыль, которую сгенерировала наша команда.</p>"""
    content = content.replace(q5, r5)

    pattern = re.compile(
        r'<div className="w-\[300px\] shrink-0 snap-center bg-\[#0A0D14\].*?</div>\n            </div>', 
        re.DOTALL
    )
    
    def replacer(match):
        text = match.group(0)
        client_name = re.search(r'block">\s*(.*?)\s*</span>', text).group(1)
        price = re.search(r'text-\[20px\]">\s*(.*?)\s*</div>', text).group(1)
        image_src = re.search(r'src="(.*?)"', text).group(1)
        
        return f"""<div className="w-[300px] shrink-0 snap-center bg-white dark:bg-[#0A0D14] rounded-[2rem] border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col relative shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] transform-gpu hover:z-50" style={{{{ transform: 'translateZ(0)' }}}}>
                {{/* Premium "Paid" Badge */}}
                <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] z-20 flex items-center gap-1.5 uppercase tracking-widest">
                  <span className="text-[12px]">✓</span> Оплачено
                </div>
                
                <div className="w-full h-36 bg-gray-50 flex items-center justify-center p-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none z-10"></div>
                  <img src="{image_src}" alt="Счет {price}" className="w-full h-full object-contain filter contrast-125 transition-transform duration-700 group-hover:scale-110 relative z-0" />
                </div>
                
                <div className="p-6 flex flex-col border-t border-gray-100 dark:border-white/5 bg-white dark:bg-[#0A0D14] relative z-20">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Доверили:</span>
                  <div className="text-[14px] font-bold text-gray-800 dark:text-gray-200 mb-3 leading-tight">{client_name}</div>
                  <div className="text-orange-500 font-numbers font-black text-[24px] leading-none">{price}</div>
                </div>
            </div>"""

    content = pattern.sub(replacer, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Patched successfully!")

if __name__ == "__main__":
    patch_file("/Users/timur/Antigravity/architect-marketing/src/app/page.tsx")
