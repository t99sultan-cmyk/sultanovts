'use client';
import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if it's a touch device or small screen
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (!isTouch && window.innerWidth > 768) {
      setIsDesktop(true);
      const updatePosition = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };
      // Passive listener for better scroll/paint performance
      window.addEventListener('mousemove', updatePosition, { passive: true });
      return () => window.removeEventListener('mousemove', updatePosition);
    }
  }, []);

  if (!isDesktop) return null;

  return (
    <div 
      className="fixed pointer-events-none z-[9900] opacity-[0.15] mix-blend-plus-lighter transition-all duration-75 ease-out"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="w-[300px] h-[300px] bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full blur-[80px]"></div>
    </div>
  );
}
