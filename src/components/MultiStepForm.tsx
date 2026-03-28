"use client";
import React, { useState } from 'react';
import MagneticButton from '@/components/MagneticButton';
import { cn } from '@/lib/utils';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);

  // Form Data
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [link, setLink] = useState('');
  const [revenue, setRevenue] = useState('');
  const [budget, setBudget] = useState('');
  const [pain, setPain] = useState('');
  const [customPain, setCustomPain] = useState('');
  const [task, setTask] = useState('');

  const playClickSound = () => {
    // Sound mock
  };

  const handleNext = () => {
    playClickSound();
    if (step === 1 && (!name || !phone || !link)) {
       setShowError(true); setTimeout(() => setShowError(false), 2000); return;
    }
    if (step === 2 && (!revenue || !budget)) {
       setShowError(true); setTimeout(() => setShowError(false), 2000); return;
    }
    setStep(s => s + 1);
  };

  const handlePrev = () => {
    playClickSound();
    setStep(s => s - 1);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    playClickSound();
    if (!pain || !task || (pain === 'custom' && !customPain)) {
       setShowError(true);
       setTimeout(() => setShowError(false), 2000);
       return;
    }
    
    setIsSubmitting(true);
    try {
      // API call to the NextJS endpoint
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, link, revenue, budget, pain, customPain, task })
      });
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setIsSuccess(true); // Fallback to success visually
    }
  };

  if (isSuccess) {
    return (
      <div id="successState" className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(249,115,22,0.2)]">
          <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-[22px] font-bold mb-3 tracking-tight text-white">Анкета получена!</h3>
        <p className="text-gray-300 text-[14px] leading-relaxed mb-6">
          Я лично изучу ваш проект. Если он подойдет под наши критерии, я свяжусь с вами в течение <strong>24-48 часов</strong>.
        </p>
        
        <div className="w-full h-[1px] bg-white/5 mb-6"></div>
        
        <p className="text-[14px] font-bold text-white mb-4 uppercase tracking-widest text-orange-500">Последний шаг</p>
        <p className="text-gray-400 text-[13px] leading-relaxed mb-4">
          Подтвердите намерения и забронируйте за собой место символическим депозитом (990 ₸).
        </p>
        <p className="text-gray-500 text-[13px] leading-relaxed mb-6 italic border-l-2 border-[#2E221D] pl-3 text-left">
          Если по итогам изучения анкеты мы поймем, что вы не подходите по критериям и мы не сможем взять вас в работу — <strong>мы сделаем вам полный возврат средств.</strong>
        </p>
        <a href="https://pay.kaspi.kz/pay/v8cgtz6k" target="_blank" rel="noopener noreferrer" className="w-full block">
          <div className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:scale-105 text-white font-bold text-[15px] py-4 rounded-[1.2rem] shadow-[0_0_20px_rgba(249,115,22,0.4)] relative overflow-hidden h-14 flex items-center justify-center transition-all">
            Оплатить через Kaspi
          </div>
        </a>
      </div>
    );
  }

  return (
    <div id="wizard-container">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-bold text-orange-500 uppercase tracking-widest">Шаг {step} из 3</span>
        </div>
        <div className="w-full h-1.5 bg-[#140C06] rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 transition-all duration-500 ease-out" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="relative min-h-[300px]">
        {/* STEP 1 */}
        {step === 1 && (
        <div className="w-full animate-in fade-in slide-in-from-right-4 duration-500">
          <h4 className="text-[15px] font-bold mb-4 text-white">Контактная информация</h4>
          <div className="space-y-4 mb-6">
            <div className="relative group">
              <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-[#0F0A08] border border-[#2E221D] rounded-[1.2rem] px-5 py-4 text-white text-[15px] focus:outline-none focus:border-orange-500 transition-all placeholder-transparent peer" placeholder="Ваше Имя *" />
              <label className={`absolute left-5 top-4.5 text-gray-500 font-medium text-[15px] transition-all peer-focus:-translate-y-7 peer-focus:text-[11px] peer-focus:text-orange-500 ${name ? '-translate-y-7 text-[11px] text-orange-500' : ''} pointer-events-none bg-[#0A0705] px-1.5 rounded`}>Ваше Имя *</label>
            </div>
            <div className="relative group mt-6">
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full bg-[#0F0A08] border border-[#2E221D] rounded-[1.2rem] px-5 py-4 text-white text-[15px] focus:outline-none focus:border-orange-500 transition-all placeholder-transparent peer" placeholder="WhatsApp / Telegram *" />
              <label className={`absolute left-5 top-4.5 text-gray-500 font-medium text-[15px] transition-all peer-focus:-translate-y-7 peer-focus:text-[11px] peer-focus:text-orange-500 ${phone ? '-translate-y-7 text-[11px] text-orange-500' : ''} pointer-events-none bg-[#0A0705] px-1.5 rounded`}>WhatsApp / Telegram *</label>
            </div>
            <div className="relative group mt-6">
              <input type="text" value={link} onChange={e => setLink(e.target.value)} required className="w-full bg-[#0F0A08] border border-[#2E221D] rounded-[1.2rem] px-5 py-4 text-white text-[15px] focus:outline-none focus:border-orange-500 transition-all placeholder-transparent peer" placeholder="Логин Инстаграм или Сайт *" />
              <label className={`absolute left-5 top-4.5 text-gray-500 font-medium text-[15px] transition-all peer-focus:-translate-y-7 peer-focus:text-[11px] peer-focus:text-orange-500 ${link ? '-translate-y-7 text-[11px] text-orange-500' : ''} pointer-events-none bg-[#0A0705] px-1.5 rounded`}>Логин Инстаграм или Сайт *</label>
            </div>
          </div>
          <MagneticButton className="w-full block" onClick={handleNext}>
            <div className="w-full bg-[#131320] text-white font-bold text-[16px] py-4 rounded-[1.2rem] shadow-[0_5px_20px_rgba(255,255,255,0.05)] border border-white/5 h-14 flex items-center justify-center hover:bg-[#1a1a2e] transition-colors relative overflow-hidden">
              {showError ? 'Заполните все поля 👆' : 'Далее'}
            </div>
          </MagneticButton>
        </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
        <div className="w-full animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="mb-6">
            <h4 className="text-[15px] font-bold mb-4 text-white">Оцифровка бизнеса</h4>
            <p className="text-[13px] font-semibold text-gray-400 mb-3 pl-1">Ваша средняя выручка в месяц?</p>
            <div className="space-y-2 mb-6">
              {['До 10 000 000 ₸', '10 000 000 – 20 000 000 ₸', '20 000 000 – 40 000 000 ₸', '40 000 000 – 50 000 000 ₸', '50 000 000 ₸ и выше'].map(val => (
                <label key={val} className="flex items-center cursor-pointer bg-[#0F0A08] border border-[#2E221D] rounded-[1rem] p-3.5 transition-colors hover:bg-[#1C130F]">
                  <input type="radio" name="rev" value={val} onChange={e => setRevenue(e.target.value)} checked={revenue === val} className="peer sr-only" />
                  <div className={`w-4 h-4 border-2 rounded-full mr-3 transition-all relative ${revenue === val ? 'border-orange-500 bg-orange-500 scale-110' : 'border-gray-600'}`}></div>
                  <span className="text-[14px] font-medium text-gray-200">{val}</span>
                </label>
              ))}
            </div>
            
            <p className="text-[13px] font-semibold text-gray-400 mb-3 pl-1">Какой бюджет В ДЕНЬ вы готовы выделять?</p>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {['$20 – $100', '$100 – $300', '$300 – $600', '$600 – $1000+'].map((val) => (
                <label key={val} className="cursor-pointer relative">
                  <input type="radio" name="budget" value={val} onChange={e => setBudget(e.target.value)} checked={budget === val} className="peer sr-only" />
                  <div className={`radio-card bg-[#0F0A08] border text-[13px] font-bold font-numbers text-center py-4 rounded-[1rem] transition-colors ${budget === val ? 'border-orange-500 text-orange-500 bg-orange-500/10' : 'border-[#2E221D] text-gray-400 hover:bg-[#1C130F]'}`}>
                    {val}
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <MagneticButton className="w-[30%] block" onClick={handlePrev} pullFactor={0.15}>
              <div className="w-full bg-[#0F0A08] border border-[#2E221D] hover:bg-white/5 text-gray-300 font-semibold text-[14px] py-4 rounded-[1.2rem] h-14 flex items-center justify-center transition-colors">Назад</div>
            </MagneticButton>
            <MagneticButton className="w-[70%] block" onClick={handleNext}>
              <div className="w-full bg-[#131320] text-white font-bold text-[16px] py-4 rounded-[1.2rem] shadow-[0_5px_20px_rgba(255,255,255,0.05)] border border-white/5 h-14 flex items-center justify-center hover:bg-[#1a1a2e] transition-colors">
                {showError ? 'Выберите варианты 👆' : 'Далее'}
              </div>
            </MagneticButton>
          </div>
        </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
        <div className="w-full animate-in fade-in slide-in-from-right-4 duration-500">
           <div className="mb-6">
            <h4 className="text-[15px] font-bold mb-4 text-white">Погружение в проблему</h4>
            <p className="text-[13px] font-semibold text-gray-400 mb-3 pl-1">Какая главная проблема прямо сейчас?</p>
            <div className="space-y-2 mb-6">
              {[
                { val: 'quality', label: 'Заявки есть, но они некачественные' },
                { val: 'quantity', label: 'Заявок мало, отдел продаж простаивает' },
                { val: 'price', label: 'Цена лида растет, не окупается' },
                { val: 'scale', label: 'Уперлись в стеклянный потолок' },
                { val: 'custom', label: 'Свой вариант' }
              ].map(item => (
                <div key={item.val}>
                  <label className="flex items-center cursor-pointer bg-[#0F0A08] border border-[#2E221D] rounded-[1rem] p-3.5 transition-colors hover:bg-[#1C130F]">
                    <input type="radio" name="pain" value={item.val} onChange={e => setPain(e.target.value)} checked={pain === item.val} className="peer sr-only" />
                    <div className={`w-4 h-4 border-2 rounded-full mr-3 shrink-0 transition-all relative ${pain === item.val ? 'border-orange-500 bg-orange-500 scale-110' : 'border-gray-600'}`}></div>
                    <span className="text-[14px] font-medium text-gray-200">{item.label}</span>
                  </label>
                  {pain === 'custom' && item.val === 'custom' && (
                    <input type="text" value={customPain} onChange={e => setCustomPain(e.target.value)} placeholder="Напишите свой вариант..." className="w-full mt-2 bg-transparent border-b border-[#2E221D] focus:border-orange-500 px-2 py-2 text-[14px] text-white focus:outline-none transition-colors" />
                  )}
                </div>
              ))}
            </div>

            <p className="text-[13px] font-semibold text-gray-400 mb-3 pl-1">Главная задача на ближайшие 2-3 месяца?</p>
            <textarea value={task} onChange={e => setTask(e.target.value)} placeholder="Расскажите подробнее..." rows={3} className="w-full bg-[#0F0A08] border border-[#2E221D] rounded-[1rem] p-4 text-white text-[14px] font-medium focus:outline-none focus:border-orange-500 transition-all resize-none mb-4"></textarea>

          </div>

          <div className="flex space-x-3">
            <MagneticButton className="w-[30%] block" onClick={handlePrev} pullFactor={0.15}>
              <div className="w-full bg-[#0F0A08] border border-[#2E221D] hover:bg-white/5 text-gray-300 font-semibold text-[14px] py-4 rounded-[1.2rem] h-14 flex items-center justify-center transition-colors">Назад</div>
            </MagneticButton>
            <MagneticButton className="w-[70%] block" onClick={handleSubmit}>
              <div className={`w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold text-[15px] py-4 rounded-[1.2rem] shadow-[0_0_20px_rgba(249,115,22,0.4)] relative overflow-hidden h-14 flex items-center justify-center transition-all ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
                <span className="relative z-10">{isSubmitting ? 'Отправка...' : showError ? 'Заполните всё 👆' : 'Отправить анкету'}</span>
              </div>
            </MagneticButton>
          </div>
        </div>
        )}
      </form>
    </div>
  );
}
