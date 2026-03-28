'use client';

export default function ClientRoadmap() {
  return (
    <div className="my-16 px-5 relative z-10 w-full max-w-[800px] mx-auto reveal opacity-0 translate-y-8 transition-all duration-1000 [&.active]:opacity-100 [&.active]:translate-y-0">
      <div className="inline-flex items-center space-x-2 bg-[#0F0F1A] shadow-md border border-white/10 rounded-full px-5 py-2.5 mb-8 mx-auto flex justify-center w-max">
        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse-glow"></div>
        <span className="text-[11px] font-black text-white tracking-widest uppercase">Этапы работы</span>
      </div>
      
      <h3 className="text-[32px] font-black text-center text-white mb-10 tracking-tight leading-tight">
        Архитектура <span className="text-orange-500 underline decoration-orange-500/50 underline-offset-4">масштабирования</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        
        {/* Step 1 */}
        <div className="bg-gradient-to-br from-[#0F0F1A] to-[#141423] p-6 sm:p-8 rounded-[2rem] border border-blue-500/20 shadow-[0_10px_30px_rgba(59,130,246,0.05)] hover:border-blue-500/50 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] group-hover:bg-blue-500/20 transition-all"></div>
          <div className="text-[40px] font-black text-blue-500/20 absolute -top-2 right-4 group-hover:text-blue-500/40 transition-colors">01</div>
          <h4 className="font-bold text-white text-[18px] mb-3 relative z-10 flex items-center gap-3">
             <span className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-400 text-sm">✓</span>
             Анкета и WhatsApp
          </h4>
          <p className="text-gray-400 text-[14px] leading-relaxed relative z-10">Вы заполняете форму ниже, после чего автоматически переходите в мой личный WhatsApp для быстрой связи.</p>
        </div>

        {/* Step 2 */}
        <div className="bg-gradient-to-br from-[#0F0F1A] to-[#1A121F] p-6 sm:p-8 rounded-[2rem] border border-purple-500/20 shadow-[0_10px_30px_rgba(168,85,247,0.05)] hover:border-purple-500/50 transition-all duration-500 group relative overflow-hidden mt-0 md:mt-10">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] group-hover:bg-purple-500/20 transition-all"></div>
          <div className="text-[40px] font-black text-purple-500/20 absolute -top-2 right-4 group-hover:text-purple-500/40 transition-colors">02</div>
          <h4 className="font-bold text-white text-[18px] mb-3 relative z-10 flex items-center gap-3">
             <span className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center text-purple-400 text-sm">✓</span>
             Оплата и Запись
          </h4>
          <p className="text-gray-400 text-[14px] leading-relaxed relative z-10">Вносите депозит (990 ₸) для фиксации места, и мы подбираем удобное для вас время. Я работаю только с теми, кто готов к диалогу.</p>
        </div>

        {/* Step 3 */}
        <div className="bg-gradient-to-br from-[#0F0F1A] to-[#0F1A15] p-6 sm:p-8 rounded-[2rem] border border-emerald-500/20 shadow-[0_10px_30px_rgba(16,185,129,0.05)] hover:border-emerald-500/50 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] group-hover:bg-emerald-500/20 transition-all"></div>
          <div className="text-[40px] font-black text-emerald-500/20 absolute -top-2 right-4 group-hover:text-emerald-500/40 transition-colors">03</div>
          <h4 className="font-bold text-white text-[18px] mb-3 relative z-10 flex items-center gap-3">
             <span className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 text-sm">✓</span>
             Глубокий ресерч
          </h4>
          <p className="text-gray-400 text-[14px] leading-relaxed relative z-10">До созвона я лично сажусь за анализ вашей ниши. Изучаю прямых конкурентов, рекламные креативы и цифры рынка.</p>
        </div>

        {/* Step 4 */}
        <div className="bg-gradient-to-br from-[#1A0A05] to-[#1F0F0A] p-6 sm:p-8 rounded-[2rem] border border-orange-500/40 shadow-[0_15px_40px_rgba(249,115,22,0.15)] hover:border-orange-500 transition-all duration-500 group relative overflow-hidden mt-0 md:mt-10">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-[50px] group-hover:bg-orange-500/30 transition-all"></div>
          <div className="text-[40px] font-black text-orange-500/20 absolute -top-2 right-4 group-hover:text-orange-500/40 transition-colors">04</div>
          <div className="bg-orange-500 text-white text-[10px] uppercase font-black px-3 py-1 rounded-full mb-4 tracking-widest inline-flex group-hover:animate-pulse shadow-md relative z-10">ФИНАЛ</div>
          <h4 className="font-bold text-orange-400 text-[18px] mb-3 relative z-10">Стратегическая сессия</h4>
          <p className="text-gray-300 text-[14px] leading-relaxed relative z-10">Встречаемся в Zoom на 45 минут. На сессии мы всё детально разбираем, и я показываю точный план выхода на системную выручку.</p>
        </div>
        
      </div>
    </div>
  );
}
