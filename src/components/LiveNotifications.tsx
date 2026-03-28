'use client';
import { useState, useEffect } from 'react';

const NOTIFICATIONS = [
  { name: 'Алмат (Астана)', sum: '450 000 ₸', service: 'Разработка стратегии' },
  { name: 'Айгерим (Алматы)', sum: '1 200 000 ₸', service: 'Комплексный маркетинг' },
  { name: 'Ерлан (Шымкент)', sum: '850 000 ₸', service: 'Настройка системы' },
  { name: 'Динара (Атырау)', sum: '500 000 ₸', service: 'Целевой трафик' },
  { name: 'Проект из Дубая', sum: '$2,500', service: 'Архитектура продаж' },
  { name: 'Сеть клиник', sum: '1 950 000 ₸', service: 'Под ключ' },
];

export default function LiveNotifications() {
  const [currentNotif, setCurrentNotif] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const triggerRandomNotif = () => {
      const idx = Math.floor(Math.random() * NOTIFICATIONS.length);
      setCurrentNotif(NOTIFICATIONS[idx]);
      setVisible(true);
      
      // Hide after 5 seconds
      setTimeout(() => {
        setVisible(false);
      }, 5000);
    };

    // First notif after 8 seconds
    timeoutId = setTimeout(() => {
      triggerRandomNotif();
      
      // Then every 20-35 seconds
      intervalId = setInterval(() => {
        triggerRandomNotif();
      }, Math.floor(Math.random() * 15000) + 20000);
    }, 8000);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={`fixed bottom-6 left-5 z-[500] transition-all duration-700 transform ${visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
      {currentNotif && (
        <div className="bg-[#12121A]/90 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl shadow-[0_15px_40px_rgba(34,197,94,0.15)] flex items-center gap-3 w-[260px] sm:w-[280px]">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex flex-col items-center justify-center shrink-0 border border-green-500/40 relative">
            <span className="text-[18px]">💰</span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
          <div>
            <div className="text-[9px] text-green-400 font-bold uppercase tracking-widest mb-0.5">Поступление • Kaspi</div>
            <div className="text-white font-numbers font-black text-[16px] leading-tight mb-0.5">+ {currentNotif.sum}</div>
            <div className="text-[11px] text-gray-400 leading-tight">От {currentNotif.name}</div>
          </div>
        </div>
      )}
    </div>
  );
}
