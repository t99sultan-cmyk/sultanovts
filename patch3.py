import re

def patch_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find all 6 invoice cards we previously modified
    pattern = re.compile(
        r'<div className="w-\[300px\] shrink-0 snap-center bg-white dark:bg-\[#0A0D14\].*?</div>\n            </div>', 
        re.DOTALL
    )
    
    def replacer(match):
        text = match.group(0)
        
        # Extract name, price, image
        client_name = re.search(r'leading-tight">(.*?)</div>', text).group(1)
        price = re.search(r'leading-none">(.*?)</div>', text).group(1)
        image_src = re.search(r'img src="(.*?)"', text).group(1)
        
        return f"""<div className="w-[300px] shrink-0 snap-center bg-[#0A0D14] rounded-[2rem] border border-white/10 overflow-hidden flex flex-col relative shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(249,115,22,0.2)] transform-gpu hover:z-50" style={{{{ transform: 'translateZ(0)' }}}}>
                {{/* Premium "Paid" Badge */}}
                <div className="absolute top-4 right-4 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-[10px] font-black px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)] z-20 flex items-center gap-1.5 uppercase tracking-widest backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                  <span className="text-[12px]">✓</span> Оплачено
                </div>
                
                <div className="w-full h-36 bg-[#F5F5F7] flex items-center justify-center overflow-hidden p-3 mix-blend-screen relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] to-transparent opacity-60 z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-20"></div>
                  <img src="{image_src}" alt="Счет {price}" className="w-full h-full object-contain filter grayscale contrast-125 object-center mix-blend-multiply transition-transform duration-700 group-hover:scale-110" />
                </div>
                
                <div className="p-6 flex flex-col border-t border-white/5 bg-gradient-to-b from-[#0A0D14] to-black relative z-20">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Доверил:</span>
                  <div className="text-[15px] sm:text-[16px] font-bold text-gray-200 mb-3 leading-tight">{client_name}</div>
                  <div className="text-orange-500 font-numbers font-black text-[28px] sm:text-[32px] drop-shadow-[0_0_15px_rgba(249,115,22,0.4)] leading-none tracking-tight">{price}</div>
                </div>
            </div>"""

    content = pattern.sub(replacer, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Patched successfully!")

if __name__ == "__main__":
    patch_file("/Users/timur/Antigravity/architect-marketing/src/app/page.tsx")
