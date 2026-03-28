'use client';
import { useState } from 'react';

export default function ROMICalculator() {
  const [dailyBudgetUSD, setDailyBudgetUSD] = useState(100);
  const [ticket, setTicket] = useState(150000);

  // Realistic B2B math for lost revenue without a system
  // Assuming $1 = 1 click.
  const clicksPerDay = dailyBudgetUSD;
  // Without retargeting, you lose 80% of warm traffic. 
  // Let's say a good funnel returns ~2% of total clicks as extra clients.
  const lostClientsPerDay = Math.max(1, Math.floor(clicksPerDay * 0.02)); 
  const lostRevenuePerDay = lostClientsPerDay * ticket;

  return (
    <div className="bg-gradient-to-br from-[#0A0D14] to-[#05050A] border border-red-500/20 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(239,68,68,0.05)] w-full max-w-[400px] mx-auto mt-8 mb-4">
      <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 blur-[40px] pointer-events-none rounded-bl-full"></div>
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
          <span className="text-[18px]">🩸</span>
        </div>
        <div>
          <h3 className="text-white font-bold text-[16px] leading-tight">Ваша упущенная выгода</h3>
          <p className="text-gray-400 text-[11px] uppercase tracking-widest font-black">Калькулятор потерь</p>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Budget Slider */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <label className="text-gray-300 text-[13px] font-medium">Рекламный бюджет в день</label>
            <span className="text-white font-numbers font-black text-[16px]">${dailyBudgetUSD.toLocaleString('ru-RU')}</span>
          </div>
          <input 
            type="range" 
            min="100" 
            max="3000" 
            step="50"
            value={dailyBudgetUSD} 
            onChange={(e) => setDailyBudgetUSD(Number(e.target.value))}
            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
        </div>

        {/* Ticket Slider */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <label className="text-gray-300 text-[13px] font-medium">Средний чек с клиента</label>
            <span className="text-white font-numbers font-black text-[16px]">{ticket.toLocaleString('ru-RU')} ₸</span>
          </div>
          <input 
            type="range" 
            min="50000" 
            max="2000000" 
            step="50000"
            value={ticket} 
            onChange={(e) => setTicket(Number(e.target.value))}
            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
        </div>

        {/* Result Block */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5 mt-8 text-center relative overflow-hidden transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent pointer-events-none"></div>
          <p className="text-gray-400 text-[12px] font-medium mb-1 relative z-10">Без системы вы теряете <strong className="text-red-400">КАЖДЫЙ ДЕНЬ</strong>:</p>
          <div className="text-red-500 font-numbers font-black text-[32px] sm:text-[36px] tracking-tight leading-none mb-2 relative z-10 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)] min-h-[40px]">
            - {lostRevenuePerDay.toLocaleString('ru-RU')} ₸
          </div>
          <p className="text-gray-500 text-[12px] relative z-10">≈ {lostClientsPerDay} «теплых» клиентов уходят к конкурентам</p>
        </div>
        
        <p className="text-[11px] text-gray-500 text-center leading-relaxed">
          *Расчет строится на базе средних показателей. Это деньги, которые вы УЖЕ заплатили Цукербергу, но не забрали в кассу из-за отсутствия архитектуры "дожима" (Цифровой тени).
        </p>
      </div>
    </div>
  );
}
