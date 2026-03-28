'use client';
import { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  afterLabel?: string;
  beforeLabel?: string;
}

export default function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  beforeLabel = "До внедрения системы (Без Цифровой Тени)", 
  afterLabel = "АРХИТЕКТУРА РАБОТАЕТ" 
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const onMouseMove = (e: MouseEvent) => { if (isDragging) handleMove(e.clientX); };
  const onTouchMove = (e: TouchEvent) => { if (isDragging) handleMove(e.touches[0].clientX); };
  const stopDragging = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchend', stopDragging);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', stopDragging);
    };
  }, [isDragging]);

  return (
    <div className="w-full relative mt-8 mb-6 group">
      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-gray-100 overflow-hidden rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] cursor-ew-resize select-none border border-gray-200"
        onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
        onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
      >
        {/* After Image (Background) */}
        <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover object-left-top" draggable={false} />
        <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg z-10 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            {afterLabel}
        </div>

        {/* Before Image (Foreground, clipped) */}
        <div 
          className="absolute inset-0 w-full h-full filter sepia-[0.3] grayscale-[0.8] contrast-75 brightness-90 relative"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          {/* We use the same image but with CSS filters to simulate the "Before" empty state if no distinct image is provided, or the distinct image if it exists */}
          <img src={beforeImage} alt="Before" className="absolute inset-0 w-full h-full object-cover object-left-top" draggable={false} />
          <div className="absolute top-4 left-4 bg-gray-800 text-white text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-widest shadow-lg z-10">
            {beforeLabel}
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center z-20 transition-transform duration-75"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-0 bottom-0 w-8 -ml-4 bg-transparent"></div> {/* Wider hit area */}
          <div className="w-10 h-10 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.3)] flex items-center justify-center gap-1.5 border border-gray-200">
            <div className="w-0.5 h-4 bg-gray-400 rounded-full"></div>
            <div className="w-0.5 h-4 bg-gray-400 rounded-full"></div>
            <div className="w-0.5 h-4 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
      <p className="text-center text-[12px] text-gray-500 font-medium mt-3 flex items-center justify-center gap-2">
         <span className="text-[14px]">👈</span> Тяните влево и вправо <span className="text-[14px]">👉</span>
      </p>
    </div>
  );
}
