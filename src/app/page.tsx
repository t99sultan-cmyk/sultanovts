'use client';

import { useEffect, useRef, useState } from 'react';
import AnimatedCounter from '@/components/AnimatedCounter';
import MultiStepForm from '@/components/MultiStepForm';
import CountdownTimer from '@/components/CountdownTimer';
import HorizontalScroll from '@/components/HorizontalScroll';
import LiveNotifications from '@/components/LiveNotifications';
import ROMICalculator from '@/components/ROMICalculator';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import CursorGlow from '@/components/CursorGlow';
import ClientRoadmap from '@/components/ClientRoadmap';
import MagneticButton from '@/components/MagneticButton';
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/Spotlight";
import { SparklesCore } from "@/components/ui/Sparkles";
import ShimmerButton from "@/components/ui/ShimmerButton";
import { TextRevealByWord } from "@/components/ui/TextRevealByWord";
import { Meteors } from "@/components/ui/Meteors";
import { AnimatedGridPattern } from "@/components/ui/AnimatedGridPattern";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { TiltCard } from "@/components/ui/TiltCard";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isBottomHidden, setIsBottomHidden] = useState(false);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.querySelectorAll('.marker-highlight').forEach((marker, index) => {
            (marker as HTMLElement).style.animationDelay = `${0.3 + index * 0.2}s`;
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = containerRef.current.offsetHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setScrollProgress(scrollPercent);

      const formSection = document.getElementById('offer-section');
      if (formSection) {
        const formRect = formSection.getBoundingClientRect();
        const isOfferReached = formRect.top <= (window.innerHeight * 0.8);
        setIsHeaderVisible(isOfferReached);
        setIsBottomHidden(!isOfferReached);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToOffer = () => {
    document.getElementById('offer-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const logos = [
    "/IMG_2369.png", "/IMG_2372.png", "/IMG_2374.png", "/IMG_2375.png", "/IMG_2376.png", 
    "/IMG_2379.png", "/IMG_2380.png", "/IMG_2381.png", "/IMG_2382.png", "/IMG_2383.png", 
    "/IMG_2384.png", "/IMG_2385.png", "/IMG_2388.png", "/IMG_2389.png", "/IMG_2395.png", 
    "/IMG_2396.png", "/IMG_2397.png", "/IMG_2398.png"
  ];

  return (
    <>
      <div 
        id="read-progress" 
        className="fixed top-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-orange-500 to-orange-400 z-[1000] max-w-[430px] rounded-r-sm shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      ></div>
      <CursorGlow />
      <div ref={containerRef} className="w-full max-w-[430px] bg-white min-h-screen relative shadow-[0_0_80px_rgba(0,0,0,0.1)] overflow-clip pb-36 sm:border-x border-gray-200 mx-auto text-[15px] leading-relaxed selection:bg-orange-200 selection:text-gray-900" id="main-container">
        
        {/* HERO PODCAST VIDEO BACKGROUND (Premium Dark/Vignette) */}
        <div className="absolute top-0 left-0 w-full h-[700px] overflow-hidden pointer-events-none z-0 bg-[#05050A] rounded-b-[4rem]">
          <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover scale-105 opacity-60 mix-blend-screen object-[50%_40%]">
            <source src="/podcast.mp4" type="video/mp4" />
          </video>
          {/* Intense dark vignette fading to solid white at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#05050A]/60 via-[#05050A]/90 to-white"></div>
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        </div>

        {/* LIGHT THEME BACKGROUNDS */}
        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none z-0 animate-float"></div>
        <div className="absolute top-[800px] right-[-100px] w-[250px] h-[250px] bg-orange-300/10 blur-[90px] rounded-full pointer-events-none z-0"></div>

        {/* HEADER */}
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[92%] max-w-[400px] z-[90] transition-transform duration-500 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-[150%]'}`}>
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg rounded-full px-2 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-3 pl-2">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center font-bold text-gray-400">
                Т
              </div>
              <div>
                <p className="text-[13px] font-bold leading-none tracking-tight text-gray-900">Тимур</p>
                <p className="text-[9px] text-orange-500 uppercase tracking-wider mt-1 font-bold">Архитектор продаж</p>
              </div>
            </div>
            <MagneticButton onClick={scrollToOffer} pullFactor={0.2}>
              <ShimmerButton 
                background="var(--color-accent)" 
                shimmerColor="#ffffff" 
                className="text-white shadow-md text-[12px] font-bold px-5 py-2.5 rounded-full border border-white/10"
              >
                Аудит
              </ShimmerButton>
            </MagneticButton>
          </div>
        </div>

        {/* HERO SECTION */}
        <header className="pt-20 px-5 relative z-10 pb-12">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse-glow"></div>
            <span className="text-[10px] font-bold text-gray-200 tracking-widest uppercase">Преимущество 1: Фокус на ROMI (окупаемости)</span>
          </div>

          <div className="text-[34px] leading-[1.1] font-bold mb-6 tracking-tight text-white drop-shadow-md">
            <TextRevealByWord text="Помогаю клиентам зарабатывать" className="font-bold text-white drop-shadow-md inline-block mb-1" />
            <br/>
            <span className="text-orange-500 text-[40px] block mt-1 font-numbers font-black drop-shadow-[0_0_15px_rgba(249,115,22,0.4)] relative">
              <SparklesCore minSize={0.4} maxSize={1} particleDensity={30} className="absolute inset-0 w-full h-full -z-10 opacity-50" particleColor="#F97316" />
              360 000 000 ₸ <span className="text-[20px] font-bold text-orange-400/80">в год</span>
            </span>
          </div>

          <p className="text-[16px] text-gray-300 mb-8 font-medium leading-relaxed drop-shadow-sm">
            с помощью системного таргета. Знаю, как превратить ваш рекламный бюджет в <span className="marker-highlight text-white" style={{background: '#f97316'}}>чистую прибыль</span>.
          </p>

          <div className="bg-white/90 backdrop-blur-xl rounded-[1.5rem] p-6 border border-gray-200 mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.1)] reveal">
             <p className="text-[15px] font-bold text-gray-900 leading-relaxed italic">
               «Мы не считаем клики и лайки. Наша главная метрика — сколько тенге <span className="marker-highlight text-white" style={{background: '#f97316'}}>чистой прибыли</span> принес каждый вложенный в рекламу тенге».
             </p>
          </div>

          {/* COMBINED EXPERT INTRO & EXPERIENCE BLOCK */}
          <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-200 mb-8 shadow-sm reveal">
            <div className="w-full h-64 sm:h-72 relative bg-gray-100">
              <img src="/laptop.jpg" alt="Тимур, основатель Zeus" className="w-full h-full object-cover object-[50%_35%]" />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-gray-900 text-[10px] font-bold uppercase tracking-widest">Основатель агентства</span>
              </div>
            </div>
            
            <div className="p-6 relative">
              <h2 className="text-[24px] font-black mb-4 text-gray-900 leading-tight">Опыт, который измеряется <span className="marker-highlight text-white px-1" style={{background: '#f97316'}}>деньгами</span> клиентов.</h2>
              <p className="text-[14px] text-gray-700 leading-relaxed font-medium">
                Меня зовут Тимур, я основатель агентства Zeus. Мы не продаем «настройки в рекламном кабинете», мы управляем маркетинговым капиталом (до <strong className="text-orange-500 border-b border-orange-500/30">$21,000 в месяц</strong>) и отвечаем за <span className="text-orange-600 font-bold">окупаемость</span>. Вот мой опыт в сухих цифрах:
              </p>
            </div>
          </div>

          <div className="mb-10 reveal">
            <div className="grid grid-cols-2 gap-3 mb-10">
              <div className="col-span-2 bg-white border border-gray-200 shadow-sm rounded-[1.5rem] p-6 relative overflow-hidden group">
                 <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-500/10 rounded-full blur-[30px] transition-all"></div>
                 <div className="flex items-baseline mb-2 relative z-10">
                  <AnimatedCounter target={1800000000} className="text-[44px] font-numbers font-black text-orange-500 tracking-tight leading-none" />
                  <span className="text-3xl font-numbers font-bold text-orange-400 tracking-tight ml-2">₸</span>
                 </div>
                 <p className="text-[14px] text-gray-600 font-medium relative z-10">Суммарная выручка, которую заработали наши клиенты благодаря <span className="marker-highlight text-white px-1" style={{background: '#f97316'}}>выстроенной системе</span>.</p>
              </div>

              <div className="bg-white border border-gray-200 shadow-sm rounded-[1.5rem] p-5">
                 <div className="flex items-baseline gap-0.5">
                   <span className="text-[26px] font-numbers font-bold text-orange-400">$</span>
                   <div className="text-[28px] font-numbers font-black text-orange-500"><AnimatedCounter target={870000} />+</div>
                 </div>
                 <p className="text-[13px] text-gray-600 mt-2 font-medium"><strong className="text-orange-600">Бюджета</strong>, строго вверенного нам в управление.</p>
              </div>

              <div className="bg-white border border-gray-200 shadow-sm rounded-[1.5rem] p-5">
                 <div className="flex items-baseline gap-0.5">
                   <div className="text-[28px] font-numbers font-black text-orange-500"><AnimatedCounter target={540000} />+</div>
                 </div>
                 <p className="text-[13px] text-gray-600 mt-2 font-medium">Целевых <strong className="text-orange-600">заявок</strong>, сгенерированных для отделов продаж.</p>
              </div>

              <div className="bg-white border border-gray-200 shadow-sm rounded-[1.5rem] p-5">
                 <div className="text-[28px] font-numbers font-black text-orange-500"><AnimatedCounter target={9000} />+</div>
                 <p className="text-[13px] text-gray-600 mt-2 font-medium">Работающих <strong className="text-orange-600">кампаний</strong> и протестированных связок.</p>
              </div>

              <div className="bg-white border border-gray-200 shadow-sm rounded-[1.5rem] p-5">
                 <div className="text-[28px] font-numbers font-black text-orange-500"><AnimatedCounter target={80} />+</div>
                 <p className="text-[13px] text-gray-600 mt-2 font-medium"><strong className="text-orange-600">Компаний</strong>, системно доверивших нам свой маркетинг.</p>
              </div>
            </div>

            <div className="border-l-4 border-orange-500 rounded-r-[1rem] bg-orange-50/50 p-5">
              <p className="text-gray-900 text-[16px] font-semibold opacity-90 leading-relaxed italic">
                «Управление такими бюджетами научило меня главному: таргет работает только как система. И весь этот опыт я упаковал в <span className="text-orange-600 font-bold">4 ключевых пазла</span>, без которых сегодня невозможно получать дешевые заявки и делать миллионную выручку».
              </p>
            </div>
          </div>
        </header>



        {/* RULES SECTION (STACKED CARDS) - LIGHT THEME */}
        <main className="px-5 mt-6 relative z-10 pb-16">
          <div className="mb-10 reveal">
            <div className="bg-gray-900 rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-[50px] pointer-events-none"></div>
              <h2 className="text-[13px] text-orange-500 font-black uppercase tracking-widest mb-3">Система: 4 пазла кратного роста</h2>
              <h3 className="text-[28px] font-bold leading-[1.1] text-white mb-4 tracking-tight">
                Почему ваш текущий маркетинг не выполняет планы?
              </h3>
              <p className="text-gray-300 font-medium text-[14px] bg-white/5 border border-white/10 p-4 rounded-xl">
                (И 4 правила, как нужно строить систему на 300 000 000+ ₸ в год)
              </p>
            </div>
          </div>

          <div className="relative w-full z-20 pb-4">
            
            {/* Rule 1 - ORANGE */}
            <TiltCard className="reveal relative bg-white rounded-[2.5rem] px-5 py-8 mb-6 border border-gray-200 shadow-[0_5px_20px_rgba(0,0,0,0.05)] transition-all duration-300 transform-gpu overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-40 bg-orange-500/5 blur-[40px] rounded-t-[2.5rem] pointer-events-none"></div>
              
              <div className="relative z-20 mb-6 flex items-start gap-4 border-b border-gray-100 pb-6">
                <div className="w-14 h-14 shrink-0 rounded-[1.2rem] bg-orange-100 flex items-center justify-center font-numbers font-black text-[24px] text-orange-500 border border-orange-200">1</div>
                <h2 className="text-[20px] font-bold text-gray-900 leading-tight flex-1">
                  Правило 1: Отказ от метрики «дешевый лид»
                  <span className="text-[13px] font-medium text-orange-600 mt-2 flex items-center gap-2 bg-orange-50 w-max px-3 py-1.5 rounded-full border border-orange-200">Конечный продукт — это деньги</span>
                </h2>
              </div>

              <div className="space-y-4 text-gray-700 text-[15px] relative z-20">
                
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <p>
                    <strong className="text-gray-900 block mb-2 text-[16px]">Главный инсайт:</strong> 
                    У повара конечный продукт — вкусное блюдо. У хирурга — вылеченный пациент. У адвоката — выигранное дело. А какой конечный продукт у таргетолога? 
                    <br/><br/>
                    Задайте этот вопрос своему подрядчику. Если он ответит: <em>«Дешевые клики, охваты или заявки»</em> — смело указывайте ему на дверь. 
                    <strong className="block mt-2 text-orange-600">Конечный продукт сильного маркетолога — это новые клиенты в кассе по математически выгодной цене.</strong>
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                  <p>
                    <strong className="text-gray-900 block mb-1">Ситуация на рынке:</strong> Ваш текущий специалист радостно отчитывается: «Я привел 100 заявок по 1 доллару!». Вы смотрите в кассу — а там пусто. Отдел продаж кричит, что лиды — мусор, а таргетолог отвечает, что менеджеры не умеют продавать.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <p>
                    <strong className="text-gray-900 block mb-2 text-[16px]">Решение и ваш инструмент:</strong> 
                    Запретите отчитываться промежуточными цифрами. Внедрите метрику — <strong>стоимость покупателя (CAC)</strong>. 
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-2 text-[14px]">
                    <li>Берете расходы на рекламу и делите на кол-во <em>оплаченных</em> заказов.</li>
                    <li><em>Пример: Потратили 500 000 ₸, получили 10 продаж = клиент обошелся в 50 000 ₸.</em></li>
                    <li>Если вы зарабатываете чистыми только 40 000 ₸ — эта "дешевая" реклама прямо сейчас убивает ваш бизнес.</li>
                  </ul>
                </div>

                <div className="bg-orange-50/50 p-6 rounded-[2rem] border border-orange-200 shadow-sm mt-4">
                  <p className="mb-5">
                    <strong className="text-gray-900 block mb-1">На практике (Фитнес-сеть на 10 филиалов):</strong>
                    Мы оценивали рекламу не по кликам, а по тому, <em>как конвертируется трафик в деньги</em>. Мы безжалостно отключали мусорные кампании и переливали бюджет только в связки, которые приносили студии чистую прибыль.
                  </p>

                  {/* STATIC SPREADSHEET PROOF */}
                  <div className="relative mt-2 mb-6 rounded-2xl overflow-hidden border border-orange-200/60 shadow-[0_10px_30px_rgba(249,115,22,0.1)] bg-white group hover:shadow-[0_15px_40px_rgba(249,115,22,0.15)] transition-shadow duration-300">
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-black px-3 py-1.5 rounded-bl-xl uppercase tracking-widest z-10 shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      ФАКТ (Оцифровка)
                    </div>
                    
                    <div className="w-full h-auto bg-gray-50 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent pointer-events-none z-10"></div>
                      <img src="/crm.png" alt="Оцифровка студии" className="w-full h-auto object-contain filter contrast-[1.1] hover:scale-[1.03] transition-transform duration-700" />
                    </div>
                    
                    <div className="bg-gradient-to-br from-white to-orange-50/30 border-t border-orange-100 p-4 relative z-20">
                      <div className="flex justify-between items-start mb-3">
                         <div className="flex flex-col">
                           <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Фрагмент отчета</span>
                           <span className="text-[12px] font-black text-gray-800 leading-tight border-b-2 border-green-500/20 w-max pb-0.5">Оцифровка студии</span>
                         </div>
                         <div className="flex flex-col items-end">
                           <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1 leading-none text-right">Выручка за месяц</span>
                           <span className="text-orange-500 font-numbers font-black text-[18px] drop-shadow-sm leading-none"><AnimatedCounter target={22557800} /> ₸</span>
                         </div>
                      </div>
                      <p className="text-[12px] sm:text-[13px] text-gray-700 font-medium leading-relaxed border-t border-gray-100 pt-3 mt-1">
                        Это реальный срез одного из наших проектов. Нам не так важна сама цифра (будь то 22 миллиона или 100). Нам важна <span className="marker-highlight text-white px-1" style={{background: '#f97316'}}>Архитектура</span>: мы контролируем процессы так, что каждый вложенный тенге прозрачен вплоть до процента продления абонемента (LTV).
                      </p>
                    </div>
                  </div>

                  <style>{`
                    @keyframes buildBranch {
                      0% { opacity: 0; transform: scale(0.5) translateY(20px); }
                      60% { opacity: 1; transform: scale(1.1) translateY(-5px); }
                      100% { opacity: 1; transform: scale(1) translateY(0); }
                    }
                    .animate-build {
                      animation: buildBranch 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                    }
                  `}</style>
                  <div className="rounded-[2rem] p-6 my-5 border border-orange-200 shadow-inner group bg-white relative overflow-hidden">
                     <div className="flex items-center justify-between mb-6 relative z-10">
                       <span className="text-gray-900 font-bold text-[13px] uppercase tracking-widest">Масштабирование</span>
                       <span className="text-[20px]">🏢</span>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-3 relative z-10">
                       {/* Base branches */}
                       {[ 
                         { n: 1, c: 'Астана' },
                         { n: 2, c: 'Алматы' }
                       ].map((b) => (
                         <div key={b.n} className="h-12 rounded-[1rem] bg-gray-100 border border-gray-200 flex items-center shadow-sm relative overflow-hidden pl-2.5 sm:pl-4">
                           <span className="text-[15px] font-black text-gray-300 mr-1.5 opacity-50 flex-shrink-0">#{b.n}</span>
                           <span className="text-[11px] sm:text-[13px] font-bold text-gray-600 uppercase tracking-wide leading-none">{b.c}</span>
                         </div>
                       ))}
                       
                       {/* Animated new branches */}
                       {[ 
                         { n: 3, c: 'Алматы' },
                         { n: 4, c: 'Алматы' },
                         { n: 5, c: 'Алматы' },
                         { n: 6, c: 'Алматы' },
                         { n: 7, c: 'Шымкент' },
                         { n: 8, c: 'Шымкент' },
                         { n: 9, c: 'Астана' }
                       ].map((b, i) => (
                         <div key={b.n} className="h-12 rounded-[1rem] bg-orange-50 border border-orange-200 flex items-center shadow-sm opacity-0 animate-build relative overflow-hidden pl-2.5 sm:pl-4" style={{ animationDelay: `${0.5 + i * 0.4}s` }}>
                           <span className="text-[15px] font-black text-orange-200 mr-1.5 flex-shrink-0">#{b.n}</span>
                           <span className="text-[11px] sm:text-[13px] font-bold text-orange-600 uppercase tracking-wide leading-none">{b.c}</span>
                         </div>
                       ))}

                       {/* 10th Branch - Dubai! */}
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
                       </div>
                     </div>

                     <div className="mt-6 flex items-center justify-between text-[11px] font-black uppercase tracking-widest w-full relative z-10">
                       <span className="text-gray-400">Старт: 2 точки</span>
                       <span className="text-orange-500">Итог: 10 точек</span>
                     </div>
                  </div>

                  <p className="font-bold text-gray-900 mt-2 bg-white p-4 rounded-[1.5rem] border border-orange-200 shadow-sm leading-relaxed">
                    Итог: <span className="font-medium text-gray-700">Трафик стал окупаемым. Мы вышли на стабильные 300 целевых заявок в день, что позволило сети безопасно вырасти до 10 филиалов (включая открытие в Дубае).</span>
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* Rule 2 - PURPLE */}
            <TiltCard className="reveal relative bg-[#FAFAFA] rounded-[2.5rem] px-5 py-8 mb-6 border border-gray-200 shadow-[0_5px_20px_rgba(0,0,0,0.05)] z-[20] transition-all duration-300 transform-gpu overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-40 bg-purple-500/5 blur-[40px] rounded-t-[2.5rem] pointer-events-none"></div>
              
              <div className="relative z-20 mb-6 flex items-start gap-4 border-b border-gray-200 pb-6">
                <div className="w-14 h-14 shrink-0 rounded-[1.2rem] bg-purple-100 flex items-center justify-center font-numbers font-black text-[24px] text-purple-600 border border-purple-200">2</div>
                <h2 className="text-[20px] font-bold text-gray-900 leading-tight flex-1">
                  Правило 2: Отказ от «Бесплатников» и убийственных скидок
                </h2>
              </div>

              <div className="space-y-4 text-gray-700 text-[15px] relative z-20">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <p>
                    <strong className="text-gray-900 block mb-2 text-[16px]">Главный инсайт:</strong> 
                    Представьте, что вы забронировали столик в ресторане бесплатно. Если пойдет дождь, вы легко отмените бронь. Но если вы оставили депозит хотя бы 5 000 ₸ — вы приедете вовремя и при параде. 
                    <strong className="block mt-2 text-purple-600">Человек не ценит то, за что не заплатил.</strong>
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                  <p>
                    <strong className="text-gray-900 block mb-1">Суровая реальность:</strong> Вы интуитивно ненавидите раздавать скидки 70% или работать бесплатно. Но таргетолог со слезами просит: <em>«Дайте акцию!»</em>. В итоге вы получаете базу халявщиков, доходимость падает до 30%, а ваши менеджеры превращаются в бесплатных психологов для людей с фразой «я просто спросить».
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <p>
                    <strong className="text-gray-900 block mb-2 text-[16px]">Решение и ваш инструмент:</strong> 
                    Внедрите механику <strong>«Платного микро-шага»</strong>. 
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-2 text-[14px]">
                    <li>Продавайте первую услугу за символические 2 000 – 5 000 ₸.</li>
                    <li>Вы навсегда отсечете людей без денег на карте. Доходимость взлетит до 90%+.</li>
                    <li><em>Лайфхак:</em> Объявите, что визит стоит 5 000 ₸, но дарите видео-сертификат на эти 5 000 ₸. Физически клиент не платит, но психологически он сжигает свои деньги, если не придет.</li>
                  </ul>
                </div>

                {/* ATMOSPHERIC PROCESS PHOTO */}
                <div className="relative w-full h-[380px] sm:h-[480px] rounded-[2rem] mt-8 mb-4 overflow-hidden border border-purple-200 shadow-sm group bg-gray-900">
                  <img src="/process.jpg" alt="Управление лидами в AmoCRM" className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 opacity-95" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/50 shadow-md flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                    <span className="text-[9px] font-black text-gray-800 uppercase tracking-widest">AmoCRM: Аналитика качества лидов</span>
                  </div>
                </div>

                <div className="bg-purple-50/50 p-6 rounded-[2rem] border border-purple-200 shadow-sm mt-4">
                  <p className="mb-2"><strong className="text-gray-900 block">Как это работает на практике (Спойлер: конверсия взлетает):</strong></p>

                  <div className="rounded-[2rem] p-6 my-5 border border-purple-200 shadow-inner group bg-white relative overflow-hidden">
                     <div className="flex items-center justify-between mb-5 relative z-10">
                       <span className="text-gray-900 font-bold text-[13px] uppercase tracking-widest">Формула воронки</span>
                       <span className="text-[20px]">👑</span>
                     </div>
                     
                     <div className="flex flex-col gap-4 relative z-10">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200 z-10 text-[16px]">🌍</div>
                         <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner"><div className="w-[15%] h-full bg-gray-300"></div></div>
                         <div className="text-[11px] font-bold text-gray-500 w-14 text-right">Холодный</div>
                       </div>
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center border border-purple-200 z-10 text-[18px]">🎟️</div>
                         <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner"><div className="w-[50%] h-full bg-purple-400"></div></div>
                         <div className="text-[11px] font-bold text-purple-600 w-14 text-right">Микро-шаг</div>
                       </div>
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center border border-pink-200 z-10 text-[18px]">💰</div>
                         <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner"><div className="w-full h-full bg-pink-500 animate-pulse"></div></div>
                         <div className="text-[11px] font-bold text-pink-600 w-14 text-right">Покупка</div>
                       </div>
                     </div>
                  </div>

                  <div className="bg-purple-50 p-5 rounded-2xl border border-purple-200 mt-5 shadow-sm">
                    <p className="mb-2">
                      <strong className="text-gray-900 text-[15px]">Международный кейс: Инфобизнес (Чек 900 000 ₸)</strong>
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-[14px] space-y-1">
                       <li>Мы убили «бесплатные вебинары» и сделали стартовый продукт за 1 000 ₸.</li>
                       <li>Мы не продавали его «в лоб». Мы выстроили специальную механику прогрева через таргет.</li>
                       <li><strong>Итог:</strong> До 30% таких людей покупали флагман за 900 000 ₸. Клиент обошелся дешевле, чем при бесплатных доступах!</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Rule 3 - BLUE */}
            <TiltCard className="reveal relative bg-white rounded-[2.5rem] px-5 py-8 mb-6 border border-gray-200 shadow-[0_5px_20px_rgba(0,0,0,0.05)] z-[30] transition-all duration-300 transform-gpu overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-40 bg-blue-500/5 blur-[40px] rounded-t-[2.5rem] pointer-events-none"></div>
              
              <div className="relative z-20 mb-6 flex items-start gap-4 border-b border-gray-200 pb-6">
                <div className="w-14 h-14 shrink-0 rounded-[1.2rem] bg-blue-100 flex items-center justify-center font-numbers font-black text-[24px] text-blue-600 border border-blue-200">3</div>
                <h2 className="text-[20px] font-bold text-gray-900 leading-tight flex-1">
                  Правило 3: Система «Безопасного масштабирования»
                  <span className="text-[13px] font-medium text-blue-600 mt-2 flex items-center gap-2 bg-blue-50 w-max px-3 py-1.5 rounded-full border border-blue-200">Как расти в 5 раз, не сжигая прибыль</span>
                </h2>
              </div>

              <div className="space-y-4 text-gray-700 text-[15px] relative z-20">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <p>
                    <strong className="text-gray-900 block mb-2 text-[16px]">Главный инсайт:</strong> 
                    Представьте, что маркетинг — это ваш личный банк. Вы кладете туда 1 миллион ₸, а забираете 5 миллионов. Если банк работает стабильно, логичный вопрос: <em>«Почему мы не положим туда 10 миллионов, чтобы забрать 50?»</em>.
                    <strong className="block mt-2 text-blue-600">Маркетинг должен быть прозрачным инвестиционным активом, а не «черной дырой».</strong>
                  </p>
                </div>

                {/* FB ADS PROOF CAROUSEL (MAX VISIBILITY) */}
                <div className="w-[calc(100%+40px)] -ml-5 mt-8 mb-10 overflow-hidden reveal">
                  
                  <div className="flex items-center justify-between px-5 mb-3">
                     <span className="text-[12px] font-bold text-gray-400 tracking-widest uppercase">Свайпните для просмотра</span>
                     <span className="text-xl">👉</span>
                  </div>

                  <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 px-5 pb-6 pt-2">
                    
                    {/* Слайд 1: $18,641 */}
                    <div className="min-w-[90%] snap-center bg-white rounded-[1.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden flex flex-col group relative">
                       <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest z-10 shadow-sm">PROOF</div>
                       <div className="w-full bg-gray-50 relative">
                         <img src="/fb-2.png" alt="Бюджет кабинета 18.6k" className="w-full h-auto object-contain" />
                       </div>
                       <div className="p-4 bg-gradient-to-br from-white to-gray-50 flex items-center justify-between border-t border-gray-100">
                         <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Бюджет в управлении:</div>
                         <div className="text-gray-900 font-numbers font-black text-[20px]">$18,641</div>
                       </div>
                    </div>

                    {/* Слайд 2: $10,457 */}
                    <div className="min-w-[90%] snap-center bg-white rounded-[1.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden flex flex-col relative">
                       <div className="w-full bg-gray-50 relative">
                         <img src="/fb-1.png" alt="Бюджет кабинета 10k" className="w-full h-auto object-contain" />
                       </div>
                       <div className="p-4 flex items-center justify-between border-t border-gray-100">
                         <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Кабинет проекта:</div>
                         <div className="text-gray-900 font-numbers font-black text-[18px]">$10,457</div>
                       </div>
                    </div>

                    {/* Слайд 3: $8,878 */}
                    <div className="min-w-[90%] snap-center bg-white rounded-[1.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden flex flex-col relative">
                       <div className="w-full bg-gray-50 relative border-b border-gray-100">
                         <img src="/fb-3.png" alt="Бюджет кабинета 8.8k" className="w-full h-auto object-contain" />
                       </div>
                       <div className="p-4 flex items-center justify-between">
                         <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Кабинет проекта:</div>
                         <div className="text-gray-900 font-numbers font-black text-[18px]">$8,878</div>
                       </div>
                    </div>

                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                  <p>
                    <strong className="text-gray-900 block mb-1">Суровая реальность:</strong> Большинство компаний застревают на одном уровне. Обычный таргетолог думает: «Увеличим бюджет в 3 раза — получим в 3 раза больше лидов». <strong>На деле:</strong> Фейсбук «сходит с ума», цена лида взлетает, аудитория выгорает. Вы просто спонсируете алгоритмы из своего кармана.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <p>
                    <strong className="text-gray-900 block mb-2 text-[16px]">Решение: Система «Ступенчатого разгона»</strong> 
                    На больших масштабах нельзя просто крутить одну и ту же картинку. Мы постоянно «освежаем» лицо бренда.
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-2 text-[14px]">
                    <li>Меняем цветовую палитру и контрасты.</li>
                    <li>Тестируем разные визуальные форматы (дизайнерская статика vs живые видео).</li>
                    <li>Повышаем бюджет плавно, давая алгоритмам «переварить» суммы без скачков в цене клика.</li>
                  </ul>
                </div>

                {/* STRATEGY MEETING PHOTO */}
                <div className="relative w-full h-[380px] sm:h-[450px] rounded-[2rem] mt-6 overflow-hidden border border-blue-200 shadow-sm group bg-[#0A1128]">
                  <img src="/office.jpg" alt="Закрытый разбор стратегии масштабирования" className="w-full h-full object-cover object-center transition-all duration-500 scale-100 group-hover:scale-105 opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/50 shadow-md flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="text-[9px] font-black text-gray-800 uppercase tracking-widest">Разработка архитектуры воронок</span>
                  </div>
                </div>

                <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-200 shadow-sm mt-4">
                  <p className="mb-2"><strong className="text-gray-900 block">Как это работает на практике (Inject Clinic — масштаб на 4+ города Казахстана):</strong></p>

                  <div className="rounded-[2rem] p-6 my-5 border border-blue-200 shadow-inner bg-white relative overflow-hidden flex flex-col items-center">
                     <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-500/10 rounded-full blur-[30px] pointer-events-none"></div>
                     <div className="flex items-center justify-between mb-8 relative z-10 w-full">
                       <span className="text-gray-900 font-bold text-[13px] uppercase tracking-widest">Юнит-экономика: Рост прибыли</span>
                       <span className="text-[20px]">📊</span>
                     </div>
                     
                     <div className="flex justify-between items-end h-[100px] px-4 sm:px-8 relative z-10 w-full overflow-hidden">
                       <div className="w-6 sm:w-8 bg-gray-100 rounded-t-lg border-t border-gray-200 h-[30%]"></div>
                       <div className="w-6 sm:w-8 bg-gray-200 rounded-t-lg border-t border-gray-300 h-[45%]"></div>
                       <div className="w-6 sm:w-8 bg-blue-100 rounded-t-lg border-t border-blue-300 h-[60%]"></div>
                       <div className="w-6 sm:w-8 bg-blue-300 rounded-t-lg border-t border-blue-400 shadow-sm h-[80%]"></div>
                       <div className="w-6 sm:w-8 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] relative h-[100%]">
                         <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-white font-black text-[12px] bg-blue-600 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(59,130,246,0.3)] animate-pulse">MAX</div>
                       </div>
                     </div>
                  </div>

                  <div className="bg-blue-900 text-white p-5 rounded-2xl shadow-sm mt-4">
                     <p className="mb-2">
                       <strong className="text-blue-200 text-[15px]">Цифры, которые говорят сами за себя:</strong>
                     </p>
                     <p className="text-[14px] leading-relaxed">
                       Мы управляли рекламным бюджетом до <strong>$800 в день</strong> ($24 000 в месяц). Генерировали <strong>9 000+ целевых заявок ежемесячно</strong>. Постоянная визуальная ротация, контент и платный фильтр в 5 000 ₸ позволили нам:
                     </p>
                     <p className="font-bold text-white mt-3 p-3 bg-blue-800 rounded-xl">
                       «Доказать парадокс: при огромных бюджетах и платном входе итоговая стоимость реального пациента стала НИЖЕ. Мы начали платить за контракты, а не клики».
                     </p>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Rule 4 - EMERALD */}
            <TiltCard className="reveal relative bg-[#FAFAFA] rounded-[2.5rem] px-5 py-8 mb-6 border border-gray-200 shadow-[0_5px_20px_rgba(0,0,0,0.05)] z-[40] transition-all duration-300 transform-gpu overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-40 bg-emerald-500/5 blur-[40px] rounded-t-[2.5rem] pointer-events-none"></div>
              
              <div className="relative z-20 mb-6 flex items-start gap-4 border-b border-gray-200 pb-6">
                <div className="w-14 h-14 shrink-0 rounded-[1.2rem] bg-emerald-100 flex items-center justify-center font-numbers font-black text-[24px] text-emerald-600 border border-emerald-200">4</div>
                <h2 className="text-[20px] font-bold text-gray-900 leading-tight flex-1">
                  Правило 4: «Эффект присутствия»
                  <span className="text-[13px] font-medium text-emerald-600 mt-2 flex items-center gap-2 bg-emerald-50 w-max px-3 py-1.5 rounded-full border border-emerald-200">Дожим тех, кто сомневается</span>
                </h2>
              </div>

              <div className="space-y-4 text-gray-700 text-[15px] relative z-20">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <p>
                    <strong className="text-gray-900 block mb-2 text-[16px]">Главный инсайт:</strong> 
                    Представьте, что вы зашли в магазин, посмотрели на вещь и вышли. Обычный продавец про вас забыл. А системный маркетинг вежливо напомнит о себе, покажет вещь на других и расскажет о ценности.
                    <strong className="block mt-2 text-emerald-600">Система делает это именно тогда, когда вы снова о ней подумаете.</strong>
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                  <p>
                    <strong className="text-gray-900 block mb-1">Ситуация на рынке:</strong> 95% людей не покупают сразу. Они кликают и уходят «подумать». Таргетологи на этом этапе прекращают работу и ищут новых «прохожих». <strong>В итоге:</strong> Вы уже заплатили за внимание, но не забрали деньги — клиент уходит к более настойчивым конкурентам.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <p>
                    <strong className="text-gray-900 block mb-2 text-[16px]">Умное сопровождение (Ретаргетинг):</strong> 
                    Мы не навязываемся, а выстраиваем цепочку касаний, которая формирует доверие.
                  </p>
                  <ol className="list-decimal pl-5 mt-2 space-y-2 text-[14px] font-medium">
                    <li><strong>Сначала польза:</strong> Человек посмотрел ваше видео до конца? Показываем ему следующий полезный ролик.</li>
                    <li><strong>Затем пруфы:</strong> Транслируем реальные результаты клиентов без пафоса.</li>
                    <li><strong>И только потом:</strong> Когда человек прогрет, предлагаем первый микро-шаг (офер).</li>
                  </ol>
                </div>

                <div className="bg-emerald-50/50 p-6 rounded-[2rem] border border-emerald-200 shadow-sm mt-5">
                  <p className="mb-2"><strong className="text-gray-900 block">Как это работает на практике:</strong></p>

                  <div className="rounded-[2rem] p-6 my-5 border border-emerald-200 shadow-inner relative overflow-hidden flex flex-col items-center justify-center bg-white">
                    <div className="flex items-center justify-between mb-6 w-full relative z-20">
                       <span className="text-gray-900 font-bold text-[13px] uppercase tracking-widest">Цифровая тень</span>
                       <span className="text-[20px]">🌌</span>
                    </div>

                    <div className="absolute inset-0 bg-emerald-500/5 blur-xl rounded-full"></div>
                    
                    <div className="relative w-36 h-36 my-6 transform-gpu" style={{ perspective: '1000px', transformStyle: 'preserve-3d', transform: 'rotateX(25deg) rotateY(-15deg)' }}>
                      {/* Base orbits */}
                      <div className="absolute inset-0 rounded-full border border-emerald-100 border-dashed shadow-[inset_0_10px_30px_rgba(16,185,129,0.1)]"></div>
                      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-500 border-r-emerald-300 animate-spin-slow shadow-[0_0_20px_rgba(16,185,129,0.4)]"></div>
                      <div className="absolute inset-[-15px] rounded-full border border-emerald-50 border-r-emerald-200 animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                      
                      {/* Center Node */}
                      <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-gradient-to-br from-white to-emerald-50 border-[3px] border-emerald-500 flex items-center justify-center shadow-[0_20px_30px_rgba(16,185,129,0.5)] z-10" style={{ transform: 'translateZ(30px)' }}>
                        <span className="text-[24px] drop-shadow-md">👤</span>
                      </div>
                      
                      {/* Orbiting nodes */}
                      <div className="absolute top-0 bottom-0 left-0 right-0 animate-spin-slow" style={{ animationDuration: '6s', transformStyle: 'preserve-3d' }}>
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center shadow-[0_10px_15px_rgba(16,185,129,0.3)]" style={{ transform: 'rotateX(-25deg) rotateY(15deg) translateZ(10px)' }}>
                          <span className="text-[16px]">📱</span>
                        </div>
                      </div>
                      <div className="absolute top-0 bottom-0 left-0 right-0 animate-spin-slow" style={{ animationDuration: '9s', animationDirection: 'reverse', transformStyle: 'preserve-3d' }}>
                        <div className="absolute bottom-0 right-0 w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center shadow-[0_15px_20px_rgba(16,185,129,0.4)]" style={{ transform: 'rotateX(-25deg) rotateY(15deg) translateZ(20px)' }}>
                          <span className="text-[20px]">🛒</span>
                        </div>
                        <div className="absolute top-1/3 -left-6 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-emerald-300 flex items-center justify-center shadow-[0_5px_10px_rgba(16,185,129,0.2)]" style={{ transform: 'rotateX(-25deg) rotateY(15deg) translateZ(5px)' }}>
                          <span className="text-[12px]">💬</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* WHATSAPP REVIEW PROOF */}
                  <div className="relative w-full max-w-[320px] mx-auto mt-8 mb-6 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <div className="absolute -top-3 -right-2 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg z-20">Отзыв клиента</div>
                    <div className="bg-white p-2 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-gray-100 relative z-10 overflow-hidden">
                      <div className="absolute top-2 right-2 w-8 h-8 bg-emerald-500/10 rounded-full blur-xl z-0"></div>
                      <img src="/review.jpg" alt="Отзыв клиента Prostretching" className="w-full h-auto rounded-xl object-contain relative z-10" />
                    </div>
                  </div>

                  {/* INTERACTIVE ROMI CALCULATOR */}
                  <ROMICalculator />

                  {/* STUDIO LIVING COLLAGE */}
                  <div className="mt-8 mb-10 w-full max-w-[400px] mx-auto">
                    <div className="flex items-center gap-3 mb-5 justify-center">
                      <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-emerald-500/50"></div>
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm shadow-emerald-500/10">Студия клиента</span>
                      <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-emerald-500/50"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 relative p-1">
                      {/* Decoration */}
                      <div className="absolute -top-4 -left-4 w-16 h-16 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none"></div>
                      
                      {/* Image 1: Full width at top */}
                      <div className="col-span-2 rounded-[1.25rem] overflow-hidden shadow-sm border border-emerald-500/10 aspect-[16/9] relative group cursor-pointer">
                        <img src="/prostretching-1.jpg" alt="Prostretching Studio 1" className="w-full h-full object-cover transform transition duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="text-white text-[12px] font-bold tracking-wide">Групповые занятия</span>
                        </div>
                      </div>
                      
                      {/* Image 2: Left 50% */}
                      <div className="rounded-[1.25rem] overflow-hidden shadow-sm border border-emerald-500/10 aspect-[4/5] relative group cursor-pointer">
                        <img src="/prostretching-2.jpg" alt="Prostretching Studio TRX" className="w-full h-full object-cover transform transition duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          <span className="text-white text-[11px] font-bold tracking-wide">TRX Зона</span>
                        </div>
                      </div>
                      
                      {/* Image 3: Right 50% */}
                      <div className="rounded-[1.25rem] overflow-hidden shadow-sm border border-emerald-500/10 aspect-[4/5] relative group cursor-pointer">
                        <img src="/prostretching-3.jpg" alt="Prostretching Studio 3" className="w-full h-full object-cover transform transition duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          <span className="text-white text-[11px] font-bold tracking-wide">Аэройога</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-sm mb-4">
                     <p className="mb-2">
                       <strong className="text-gray-900 text-[15px]">Международный кейс: Образовательный проект (Турция)</strong>
                     </p>
                     <p className="text-[14px] leading-relaxed mb-3">Работая на турецком рынке, где стоимость рекламы в разы выше, мы выстроили систему «мягкого дожима» через полезный контент.</p>
                     <p className="text-[14px] font-medium text-emerald-800 bg-emerald-100/50 p-3 rounded-xl border border-emerald-200">
                        <strong>Результат:</strong> Те, кто просто «присматривался», через 2 недели прогрева превращались в лояльных покупателей. Мы захватили долю рынка и получали оплаты дешевле, чем при прямой продаже «в лоб».
                     </p>
                  </div>

                  <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-sm">
                     <p className="mb-2">
                       <strong className="text-gray-900 text-[15px]">Система «Цифровой тени»</strong>
                     </p>
                     <p className="text-[14px] leading-relaxed">
                       Мы фиксируем каждое касание: переход, лайк, сообщение. Мы не бросаем человека на полпути, а снимаем страхи через реперный ретаргетинг до тех пор, пока покупка не станет для него логичным решением.
                     </p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </main>

        {/* HISTORICAL TRACK RECORD (Moved Up near Reviews) */}
        <section className="reveal relative mb-12 pt-6">
          <h3 className="text-[26px] font-black text-center text-gray-900 dark:text-white mb-3 tracking-tight leading-tight max-w-sm mx-auto">Бизнес доверяет мне чеки от 500k до 2 млн ₸ уже с 2018 года</h3>
          <p className="text-gray-500 dark:text-gray-400 text-[14px] text-center mb-6 max-w-sm mx-auto font-medium px-4">Я не «выстрелил» вчера. Моя система генерирует системную прибыль в любой кризис.</p>

          <div className="flex overflow-x-auto gap-4 px-5 items-center w-full py-6 snap-x hide-scrollbar">
            
            {/* INVOICE 1: 1.95M */}
            <div className="w-[300px] shrink-0 snap-center bg-[#0A0D14] rounded-[2rem] border border-white/10 overflow-hidden flex flex-col relative shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-[1.02]">
                <div className="absolute top-3 right-3 bg-green-500/20 text-green-400 text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest border border-green-500/30 backdrop-blur-md">Оплачено</div>
                <div className="w-full h-32 bg-[#F5F5F7] flex items-center justify-center overflow-hidden p-3 mix-blend-screen relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] to-transparent opacity-20"></div>
                  <img src="/kaspi-2.jpg" alt="Счет на 1.95M" className="w-full h-full object-contain filter grayscale contrast-125 object-center mix-blend-multiply" />
                </div>
                <div className="p-5 flex items-center justify-between border-t border-white/5 bg-gradient-to-b from-[#0A0D14] to-black">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Доверил:<br/><span className="text-gray-500 text-[9px] mt-0.5 block">Медицинский центр</span></div>
                  <div className="text-white font-numbers font-black text-[20px]">1 950 000 ₸</div>
                </div>
            </div>

            {/* INVOICE 2: 830k */}
            <div className="w-[300px] shrink-0 snap-center bg-[#0A0D14] rounded-[2rem] border border-white/10 overflow-hidden flex flex-col relative shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-[1.02]">
              <div className="absolute top-3 right-3 bg-green-500/20 text-green-400 text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest border border-green-500/30 backdrop-blur-md">Оплачено</div>
              <div className="w-full h-32 bg-[#F5F5F7] flex items-center justify-center overflow-hidden p-3 mix-blend-screen relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] to-transparent opacity-20"></div>
                <img src="/kaspi-5.jpg" alt="Счет на 830k" className="w-full h-full object-contain filter grayscale contrast-125 object-center mix-blend-multiply" />
              </div>
              <div className="p-5 flex items-center justify-between border-t border-white/5 bg-gradient-to-b from-[#0A0D14] to-black">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Доверил:<br/><span className="text-gray-500 text-[9px] mt-0.5 block">Центр косметологии</span></div>
                <div className="text-white font-numbers font-black text-[20px]">830 000 ₸</div>
              </div>
            </div>
            
            {/* INVOICE 3: 592k */}
            <div className="w-[300px] shrink-0 snap-center bg-[#0A0D14] rounded-[2rem] border border-white/10 overflow-hidden flex flex-col relative shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-[1.02]">
              <div className="absolute top-3 right-3 bg-green-500/20 text-green-400 text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest border border-green-500/30 backdrop-blur-md">Оплачено</div>
              <div className="w-full h-32 bg-[#F5F5F7] flex items-center justify-center overflow-hidden p-3 mix-blend-screen relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] to-transparent opacity-20"></div>
                <img src="/kaspi-4.jpg" alt="Счет на 592k" className="w-full h-full object-contain filter grayscale contrast-125 object-center mix-blend-multiply" />
              </div>
              <div className="p-5 flex items-center justify-between border-t border-white/5 bg-gradient-to-b from-[#0A0D14] to-black">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Доверил:<br/><span className="text-gray-500 text-[9px] mt-0.5 block">Стоматология</span></div>
                <div className="text-white font-numbers font-black text-[20px]">592 665 ₸</div>
              </div>
            </div>

            {/* INVOICE 4: 500k */}
            <div className="w-[300px] shrink-0 snap-center bg-[#0A0D14] rounded-[2rem] border border-white/10 overflow-hidden flex flex-col relative shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-[1.02]">
              <div className="absolute top-3 right-3 bg-green-500/20 text-green-400 text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest border border-green-500/30 backdrop-blur-md">Оплачено</div>
              <div className="w-full h-32 bg-[#F5F5F7] flex items-center justify-center overflow-hidden p-3 mix-blend-screen relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] to-transparent opacity-20"></div>
                <img src="/kaspi-1.jpg" alt="Счет на 500k" className="w-full h-full object-contain filter grayscale contrast-125 object-center mix-blend-multiply" />
              </div>
              <div className="p-5 flex items-center justify-between border-t border-white/5 bg-gradient-to-b from-[#0A0D14] to-black">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Доверил:<br/><span className="text-gray-500 text-[9px] mt-0.5 block">Expert Naira</span></div>
                <div className="text-white font-numbers font-black text-[20px]">500 000 ₸</div>
              </div>
            </div>

            {/* INVOICE 5: 430k */}
            <div className="w-[300px] shrink-0 snap-center bg-[#0A0D14] rounded-[2rem] border border-white/10 overflow-hidden flex flex-col relative shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-[1.02]">
              <div className="absolute top-3 right-3 bg-green-500/20 text-green-400 text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest border border-green-500/30 backdrop-blur-md">Оплачено</div>
              <div className="w-full h-32 bg-[#F5F5F7] flex items-center justify-center overflow-hidden p-3 mix-blend-screen relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] to-transparent opacity-20"></div>
                <img src="/kaspi-3.jpg" alt="Счет на 430k" className="w-full h-full object-contain filter grayscale contrast-125 object-center mix-blend-multiply" />
              </div>
              <div className="p-5 flex items-center justify-between border-t border-white/5 bg-gradient-to-b from-[#0A0D14] to-black">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Доверил:<br/><span className="text-gray-500 text-[9px] mt-0.5 block">Многопрофильная клиника</span></div>
                <div className="text-white font-numbers font-black text-[20px]">430 000 ₸</div>
              </div>
            </div>

            {/* INVOICE 6 */}
            <div className="w-[300px] shrink-0 snap-center bg-[#0A0D14] rounded-[2rem] border border-white/10 overflow-hidden flex flex-col relative shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-[1.02]">
              <div className="absolute top-3 right-3 bg-green-500/20 text-green-400 text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest border border-green-500/30 backdrop-blur-md">Оплачено</div>
              <div className="w-full h-32 bg-[#F5F5F7] flex items-center justify-center overflow-hidden p-3 mix-blend-screen relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] to-transparent opacity-20"></div>
                <img src="/kaspi-6.jpg" alt="Счет №6" className="w-full h-full object-contain filter grayscale contrast-125 object-center mix-blend-multiply" />
              </div>
              <div className="p-5 flex items-center justify-between border-t border-white/5 bg-gradient-to-b from-[#0A0D14] to-black">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Доверил:<br/><span className="text-gray-500 text-[9px] mt-0.5 block">Комплексный маркетинг</span></div>
                <div className="text-white font-numbers font-black text-[20px]">1 250 000 ₸</div>
              </div>
            </div>

          </div>
        </section>

        {/* TRANSITION TO DARK THEME (Block 5) */}
        <section className="reveal px-5 pt-12 pb-16 relative z-10 overflow-hidden border-t-2 border-gray-100 rounded-t-[3rem] mt-4">
          
          {/* TEAM WORKING VIDEO BACKGROUND (Transitioning to dark) */}
          <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none bg-gray-900 border-t border-gray-100">
             <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover filter grayscale opacity-30 mix-blend-screen">
               <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
             </video>
             <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-[#05050A]/70 to-[#05050A]"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-[14px] text-orange-500 font-black uppercase tracking-widest mb-3 text-center">Почему мы?</h2>
            <h3 className="text-[26px] font-bold mb-6 tracking-tight text-white leading-tight text-center">
              Эти 4 правила — граница между сливом бюджета и системной прибылью
            </h3>
          
          <div className="bg-[#0F0F1A] p-8 rounded-[2rem] border border-white/10 shadow-md relative mt-6 transition-transform hover:-translate-y-1 duration-300">
             <div className="absolute -left-3 top-[-15px] text-[40px] text-orange-500 opacity-20 leading-none font-serif">"</div>
             <p className="text-[16px] text-gray-300 font-medium leading-relaxed relative z-10 pl-2 text-center italic">
               «Итог простой: высокие результаты в бизнесе — это не магия. Это жесткая физика маркетинга. Если у вас посчитана экономика, выстроена фильтрация лидов и система "дожима" — ваш бизнес неизбежно растет. Именно эта архитектура делает продажи управляемыми».
             </p>
             <div className="absolute -right-3 bottom-[-25px] text-[40px] text-orange-500 opacity-20 leading-none rotate-180 font-serif">"</div>
          </div>
          
          <p className="text-gray-400 mt-8 leading-relaxed text-[16px] text-center px-2">
            Я строил эти системы для брендов с мировым именем и локальных лидеров рынка с бюджетами до <strong className="text-white">$21 000 в месяц</strong>. Мой опыт — это десятки миллионов тенге, превращенных в чистую прибыль моих клиентов.
          </p>

          <div className="mt-12 w-full relative">
            <h4 className="text-[18px] font-black mb-6 text-center text-white px-5 drop-shadow-md">Компании, доверившие мне свою архитектуру роста:</h4>
            
            {/* 3-Row Grid Logo Scroll */}
            <div className="overflow-x-auto pb-10 pt-2 snap-x hide-scrollbar px-5">
               <div className="grid grid-rows-3 grid-flow-col gap-4 w-max">
                 {logos.map((logo, index) => (
                   <div 
                     key={`${logo}-${index}`} 
                     className="relative bg-white shrink-0 snap-center rounded-[1.25rem] w-[140px] h-[80px] sm:w-[160px] sm:h-[90px] flex flex-col items-center justify-center p-3 border border-gray-100 shadow-[0_5px_15px_rgba(0,0,0,0.04)] transition-all duration-300 hover:scale-[1.03] group cursor-pointer"
                   >
                     <img src={logo} alt={`Client Logo ${index}`} className="relative z-10 max-w-full max-h-full object-contain filter group-hover:drop-shadow-md transition-all duration-300" />
                   </div>
                 ))}
               </div>
            </div>
          </div>
          </div>
        </section>



        {/* OFFER - DARK THEME - THE FLIP */}
        <div className="bg-[#05050A] text-white rounded-t-[3rem] pb-16 pt-12 relative shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/10 z-20 overflow-hidden" id="offer-section">
          <Meteors number={25} />
          <div className="absolute top-0 right-0 w-full h-80 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none"></div>

          <div className="px-5 relative z-10">
            <div className="reveal text-center">
               <div className="inline-flex items-center space-x-2 bg-[#0F0F1A] shadow-md border border-white/10 rounded-full px-5 py-2.5 mb-8">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse-glow"></div>
                <span className="text-[11px] font-black text-white tracking-widest uppercase">От стратегии к результату</span>
              </div>
              
              <h2 className="text-[26px] font-black mb-8 leading-tight tracking-tight text-white text-left">
                Чтобы ваш бизнес делал <span className="text-orange-500">300 000 000 ₸ в год</span>, вам не нужны «новые фишки». Вам нужно внедрить эти 4 правила.
              </h2>
              <div className="space-y-5 text-gray-300 text-[15px] mb-12 leading-relaxed text-left">
                <p>
                  «Все, что вы прочитали выше — это не просто теория. Это жесткая архитектура, на которой строятся системные и прибыльные проекты. Чтобы ваш бизнес перестал зависеть от "везения" и начал приносить прогнозируемую прибыль, эти 4 правила должны работать в нем одновременно.
                </p>
                <p className="text-white font-bold text-[16px] bg-[#0F0F1A] p-5 rounded-[1.5rem] shadow-sm border border-orange-500/20">
                  Все это можно и нужно внедрить в вашем бизнесе. Если вы хотите понять, как именно адаптировать эту систему под вашу нишу и текущие цифры — я готов провести для вас персональный аудит».
                </p>
              </div>
            </div>

            <div className="bg-[#0F0F1A] rounded-[2.5rem] p-8 mb-10 reveal relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[60px]"></div>
              
              <h3 className="text-[22px] font-black text-white mb-5 leading-tight relative z-10">Стратегический разбор вашего маркетинга <span className="text-orange-500 block mt-1">(RoadMap на X2-X5)</span></h3>
              
              <p className="text-gray-300 text-[15px] mb-8 relative z-10 leading-relaxed italic">
                «Я готов лично разобрать ваш бизнес "по косточкам" и показать ключевые действия, которые нужно сделать именно вам, чтобы пробить текущий финансовый потолок.
              </p>

              <div className="bg-[#05050A] border border-orange-500/20 rounded-[2rem] p-6 mb-8 relative z-10 text-center shadow-inner">
                <p className="text-gray-500 text-[14px] mb-2 font-medium line-through">Рыночная стоимость такого глубокого аудита — 150 000 ₸.</p>
                <p className="text-[15px] font-bold text-white">Но я открываю доступ к нему за символический депозит —</p>
                <div className="text-[52px] font-numbers font-black text-orange-500 leading-none my-4 tracking-tight drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">990 тенге.»</div>
              </div>

              <div className="space-y-4 text-[15px] text-gray-300 relative z-10 leading-relaxed bg-[#140C06] p-6 rounded-[1.5rem] border border-orange-500/10">
                <p>
                  <strong className="text-white block mb-1">Почему я делаю это за 990 тенге?</strong> Здесь нет никакого подвоха. Моя задача на этом созвоне — сделать аудит и выдать вам готовую пошаговую стратегию масштабирования.
                </p>
                <p>
                  Дальше выбор за вами: либо вы забираете этот план и внедряете его сами со своей командой, либо мы можем рассмотреть совместное партнерство.
                </p>
                <p className="font-bold text-white">
                  В любом случае, после созвона вы уйдете с реально готовой стратегией на руках.
                </p>
              </div>
            </div>

            <div className="mb-14 reveal">
              <p className="text-[17px] font-black text-white mb-6 pl-2 text-center">На выходе у вас остается готовый «завод» по генерации прибыли:</p>
              <div className="grid gap-4">
                <div className="bg-[#0F0F1A] shadow-md border border-white/5 rounded-[2rem] p-6 flex items-start gap-4 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/30">
                    <span className="font-numbers font-black text-orange-500 text-[18px]">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-[16px] mb-1">Инструментарий «Сквозной аналитики»:</h4>
                    <p className="text-gray-400 text-[14px] leading-relaxed">Вы увидите связки, которые позволяют контролировать окупаемость каждого тенге.</p>
                  </div>
                </div>
                
                <div className="bg-[#0F0F1A] shadow-md border border-white/5 rounded-[2rem] p-6 flex items-start gap-4 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/30">
                    <span className="font-numbers font-black text-orange-500 text-[18px]">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-[16px] mb-1">Карта захвата рынка (RoadMap):</h4>
                    <p className="text-gray-400 text-[14px] leading-relaxed">Пошаговый сценарий масштабирования: креативы, смыслы и бюджеты.</p>
                  </div>
                </div>
                
                <div className="bg-[#0F0F1A] shadow-md border border-white/5 rounded-[2rem] p-6 flex items-start gap-4 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/30">
                    <span className="font-numbers font-black text-orange-500 text-[18px]">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-[16px] mb-1">Анализ Юнит-экономики:</h4>
                    <p className="text-gray-400 text-[14px] leading-relaxed">Мы оцифруем ваш маркетинг и найдем точки, где вы теряете деньги прямо сейчас.</p>
                  </div>
                </div>
              </div>
            </div>


            <ClientRoadmap />

            {/* ANTI-SELLING SECTION - MOVED TO DARK THEME (So it follows 'Razbor' mention) */}
            <div className="reveal mt-8 mb-12 relative z-10 w-full max-w-[500px] mx-auto perspective-1000">
              <div className="bg-gradient-to-b from-[#110505] to-[#0a0202] p-6 sm:p-8 rounded-[2.5rem] shadow-[0_15px_40px_rgba(220,38,38,0.15)] relative overflow-hidden group hover:border-red-600/50 transition-colors duration-500">
                <BorderBeam size={250} duration={12} delay={9} />
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/20 blur-[50px] pointer-events-none rounded-full transition-all duration-700 group-hover:scale-150 group-hover:bg-red-500/30"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-900/20 blur-[40px] pointer-events-none rounded-full"></div>
                
                <h3 className="text-[26px] font-black leading-[1.1] text-white mb-8 tracking-tight flex items-center gap-3 relative z-10">
                  <span className="text-[32px] drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] animate-pulse">🛑</span> 
                  Кому этот разбор НЕ нужен?
                </h3>
                
                <ul className="space-y-4 relative z-10">
                  <li className="flex items-start gap-4 p-5 bg-[#1A0A0A]/80 backdrop-blur-sm rounded-2xl border border-red-900/30 hover:bg-[#220c0c] transition-all duration-300 hover:translate-x-2">
                    <div className="text-red-500 font-bold text-[20px] leading-none shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">✕</div>
                    <p className="text-[14px] text-gray-300 leading-relaxed font-medium"><strong className="text-white">Тем, кто ищет "волшебников".</strong> Мой маркетинг — это сухие цифры, аналитика и математика, а не пляски со случайным таргетом.</p>
                  </li>
                  <li className="flex items-start gap-4 p-5 bg-[#1A0A0A]/80 backdrop-blur-sm rounded-2xl border border-red-900/30 hover:bg-[#220c0c] transition-all duration-300 hover:translate-x-2 delay-75">
                    <div className="text-red-500 font-bold text-[20px] leading-none shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">✕</div>
                    <p className="text-[14px] text-gray-300 leading-relaxed font-medium"><strong className="text-white">Бизнесам без отдела продаж.</strong> Если ваши менеджеры обрабатывают лиды по 5 часов — никакой гениальный трафик вас не спасет.</p>
                  </li>
                  <li className="flex items-start gap-4 p-5 bg-[#1A0A0A]/80 backdrop-blur-sm rounded-2xl border border-red-900/30 hover:bg-[#220c0c] transition-all duration-300 hover:translate-x-2 delay-150">
                    <div className="text-red-500 font-bold text-[20px] leading-none shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">✕</div>
                    <p className="text-[14px] text-gray-300 leading-relaxed font-medium"><strong className="text-white">Хочу "просто попробовать".</strong> Построение конвейера продаж требует партнерства, погружения в экономику и жесткой дисциплины.</p>
                  </li>
                </ul>
                
                <p className="mt-8 text-[13px] text-red-200/90 border-l-[3px] border-red-500/60 pl-4 py-1.5 leading-relaxed relative z-10 bg-red-900/10 rounded-r-lg">
                  Если в этих пунктах вы узнали себя — прошу вас не оставлять депозит. Мы не сработаемся, и вы просто потратите мое и свое время.
                </p>
              </div>
            </div>

            {/* WIZARD INFO & FORM */}
            <div className="reveal">
              <h3 className="text-[26px] font-black mb-8 tracking-tight text-white leading-tight text-center">Анкета для записи на Стратегический разбор</h3>
              
              <div className="bg-[#140C06] border-l-4 border-orange-500 rounded-r-[1.5rem] p-6 mb-10 shadow-sm">
                <p className="text-[14px] text-gray-300 leading-relaxed font-medium">
                  <strong className="text-white">Внимание:</strong> Я готовлюсь к каждому созвону лично, изучаю ваших конкурентов и цифры до начала встречи. Поэтому я провожу <strong>не более 3-4 таких разборов в неделю</strong>. На эту неделю осталось <strong>ровно 2 свободных окна</strong>.
                </p>
              </div>
              
              {/* NOTE: FORM HAS BEEN WRAPPED AND DESIGNED LOCALLY IN THE MultiStepForm Component, USING THE SAME THEME STYLE */}
              <div className="app-panel bg-[#05050A] rounded-[2.5rem] p-6 sm:p-8 relative shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/5 overflow-hidden">
                <AnimatedGridPattern numSquares={30} maxOpacity={0.1} duration={3} className={cn("[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]", "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12")} />
                <div className="relative z-10">
                  <MultiStepForm />
                </div>
              </div>
            </div>



            {/* GUARANTEE - DARK GREEN FINAL */}
            <div className="mt-8 reveal relative mb-8">
              
              <div className="bg-gradient-to-b from-[#050B06] to-[#020502] rounded-[3rem] p-8 mt-8 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(22,163,74,0.15)] border border-green-500/40 group">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                
                <div className="flex flex-col items-center mb-8 relative z-10">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] overflow-hidden border-2 border-green-500/50 shadow-[0_15px_50px_rgba(34,197,94,0.25)] mb-5 relative group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent mix-blend-multiply z-10"></div>
                    <img src="/chair.jpg" alt="Тимур, Гарант" className="w-full h-full object-cover object-[50%_20%] relative z-0" />
                  </div>
                  <div className="bg-green-500/20 text-green-300 text-[12px] font-black uppercase tracking-widest px-5 py-2 rounded-full border border-green-400/50 backdrop-blur-md shadow-[0_0_15px_rgba(34,197,94,0.3)] animate-pulse-glow">
                    Железобетонная Гарантия
                  </div>
                </div>

                <div className="text-[28px] font-black text-white mb-8 leading-snug relative z-10 text-center tracking-tight">
                  <TextRevealByWord text="Я заплачу вам" className="font-black text-white inline-block mb-1" />
                  <br/>
                  <span className="text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.6)] border-b-2 border-green-400/50 pb-1 relative inline-block">
                    <SparklesCore minSize={0.4} maxSize={1} particleDensity={20} className="absolute inset-0 w-full h-full -z-10 opacity-70" particleColor="#4ade80" />
                    <AnimatedCounter target={50000} /> ₸
                  </span>
                  , если потрачу ваше время впустую.
                </div>

                <div className="text-[15px] text-gray-300 leading-relaxed text-left relative z-10 mb-8 space-y-4 bg-green-900/10 p-6 rounded-[2rem] border border-green-500/20 backdrop-blur-sm">
                  <p>
                    «Я настолько уверен в качестве своего продукта, что даю зеркальную гарантию: Вы платите за разбор <strong className="text-white">990 тенге</strong>. Но если в конце нашей консультации вы скажете: <em>"Тимур, это была сплошная вода, я не получил никакой пользы"</em>, — я прямо на созвоне переведу вам <strong className="text-green-400 bg-green-900/30 px-2 py-0.5 rounded">50 000 ₸</strong> в качестве компенсации за ваше время.
                  </p>
                  
                  <div className="bg-green-900/20 rounded-2xl p-5 border border-green-500/20 mt-6">
                    <h5 className="font-bold text-white mb-3 text-[14px] uppercase tracking-wider text-green-400">Откуда такая уверенность?</h5>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 shadow-[0_0_5px_#22c55e]"></div>
                        <span>Я не продаю «волшебные таблетки». Моя архитектура строилась годами на миллионных бюджетах, и это подтверждает <span className="text-white font-bold">трек-рекорд выше</span>.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 shadow-[0_0_5px_#22c55e]"></div>
                        <span>Я готовлюсь к каждому разбору <strong>лично</strong>. Изучаю ваших прямых конкурентов ДО созвона.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-[16px] font-bold text-white text-center relative z-10 bg-green-500/10 p-5 rounded-2xl border border-green-500/30">
                  Выигрыш в любом случае за вами.
                </p>

                <div className="mt-10 bg-black/60 border border-green-500/20 rounded-[2rem] p-6 text-center relative z-10 shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden">
                   <CountdownTimer initialMinutes={5} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM DOCK (Dark theme) */}
        <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[92%] max-w-[400px] z-[100] transition-transform duration-500 ${isBottomHidden ? 'translate-y-[200%]' : 'translate-y-0'}`}>
          <div className="bg-[#0F0F1A] rounded-[2rem] p-2 pl-6 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-orange-500/30">
            <div>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Депозит</p>
              <p className="text-[22px] font-numbers font-black text-white leading-none tracking-tight">990 ₸</p>
            </div>
            <MagneticButton onClick={scrollToOffer}>
              <ShimmerButton background="var(--color-accent)" shimmerColor="#ffffff" className="text-white font-black text-[15px] py-4 px-8 rounded-[1.5rem]">
                Разбор
              </ShimmerButton>
            </MagneticButton>
          </div>
        </div>
      </div>
      
      {/* GLOBAL MAC UI DOCK */}
      <FloatingDock />
    </>
  );
}
