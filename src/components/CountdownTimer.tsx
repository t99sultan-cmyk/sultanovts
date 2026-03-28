'use client';
import { useState, useEffect, useRef } from 'react';

export default function CountdownTimer({ initialMinutes = 5 }: { initialMinutes?: number }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60 * 1000);
  const [showStartedText, setShowStartedText] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isRunning && timeLeft > 0) {
          setIsRunning(true);
          setShowStartedText(true);
          setTimeout(() => setShowStartedText(false), 2000);
          observer.disconnect(); // Start the timer permanently once seen
        }
      },
      { threshold: 0.1 }
    );
    if (timerRef.current) {
      observer.observe(timerRef.current);
    }
    return () => observer.disconnect();
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 10) {
          clearInterval(interval);
          return 0;
        }
        return prev - 10;
      });
    }, 10);
    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const ms = Math.floor((timeLeft % 1000) / 10); // Centiseconds for smoother display

  return (
    <div ref={timerRef} className="relative z-10 text-center min-h-[90px] flex flex-col items-center justify-center">
      
      {/* "ВРЕМЯ ПОШЛО" Phase */}
      <div className={`transition-all duration-500 absolute inset-0 flex items-center justify-center ${showStartedText ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
         <p className="text-red-500 font-black uppercase tracking-widest text-[24px] animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">ВРЕМЯ ПОШЛО!</p>
      </div>
      
      {/* Timer Phase */}
      <div className={`transition-all duration-[800ms] w-full ${!showStartedText && isRunning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none delay-100'}`}>
        <p className="text-green-500 font-bold uppercase tracking-widest text-[11px] mb-3">Осталось времени:</p>
        <div className="font-numbers font-black flex items-end gap-2 justify-center text-red-500 text-[28px]">
          <span className="bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-lg min-w-[50px] text-center shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            {minutes.toString().padStart(2, '0')}
          </span>
          <span className="text-red-500/50 pb-1">:</span>
          <span className="bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-lg min-w-[50px] text-center shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            {seconds.toString().padStart(2, '0')}
          </span>
          <span className="text-red-500/50 pb-1">:</span>
          <span className="bg-red-500/10 border border-red-500/20 px-1 py-1 rounded-lg min-w-[40px] text-center text-[20px] pb-1.5 opacity-80">
            {ms.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      
    </div>
  );
}
