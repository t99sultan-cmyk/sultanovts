import os

page_path = "src/app/page.tsx"

with open(page_path, "r", encoding="utf-8") as f:
    c = f.read()

# 1. Swipe Hint for Logos
logos_old = """            <h4 className="text-[22px] sm:text-[26px] font-black mb-10 text-center text-orange-500 px-5 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)] tracking-tight">Компании, доверившие мне свою архитектуру роста:</h4>"""
logos_new = """            <h4 className="text-[22px] sm:text-[26px] font-black mb-6 text-center text-orange-500 px-5 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)] tracking-tight">Компании, доверившие мне свою архитектуру роста:</h4>            
            <div className="flex items-center justify-end pr-6 mb-2 mt-[-10px] sm:hidden animate-pulse">
               <span className="text-[11px] font-black text-white/50 uppercase tracking-widest flex items-center gap-1">Листать <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></span>
            </div>"""
c = c.replace(logos_old, logos_new)

# 2. 300 million brighter
m300_old = """<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] animate-pulse text-[36px] sm:text-[44px] border-b-4 border-red-500/50 inline-block mt-2 mb-3">300 000 000 ₸ в год</span>"""
m300_new = """<span className="text-white drop-shadow-[0_0_20px_rgba(249,115,22,1)] font-black animate-pulse text-[40px] sm:text-[50px] border-b-[5px] border-orange-500 inline-block mt-2 mb-3 bg-gradient-to-r from-orange-600/30 to-red-600/30 px-4 md:px-7 py-2 rounded-[1rem] shadow-[inset_0_0_20px_rgba(249,115,22,0.3)] backdrop-blur-sm">300 000 000 ₸ в год</span>"""
c = c.replace(m300_old, m300_new)

# 3. 990 KZT
kzt990_old = """                  <div className="shrink-0 bg-gradient-to-br from-[#1A0A05] to-[#0A0502] px-8 py-4 rounded-[1.5rem] border-2 border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.2)] group-hover:scale-105 transition-transform duration-500">
                    <div className="text-[44px] sm:text-[52px] font-numbers font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-600 leading-none tracking-tight drop-shadow-md">990 ₸</div>
                  </div>"""
kzt990_new = """                  <div className="shrink-0 relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 px-8 sm:px-10 py-5 rounded-[1.5rem] shadow-[0_15px_40px_rgba(249,115,22,0.5)] group-hover:scale-110 transition-transform duration-500 border border-orange-400/70">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay"></div>
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/40 rounded-full blur-[25px]"></div>
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-red-900/50 rounded-full blur-[20px]"></div>
                    <div className="text-[48px] sm:text-[60px] font-numbers font-black text-white leading-none tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)] relative z-10 flex items-center justify-center gap-2">
                       990 <span className="text-[28px] sm:text-[36px] text-white/80 pb-2">₸</span>
                    </div>
                  </div>"""
c = c.replace(kzt990_old, kzt990_new)


with open(page_path, "w", encoding="utf-8") as f:
    f.write(c)
