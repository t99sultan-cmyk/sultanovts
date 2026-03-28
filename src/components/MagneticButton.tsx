'use client';
import { useRef, useState, ReactNode } from 'react';
import { playHoverSound, playClickSound } from '@/utils/audio';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  pullFactor?: number;
}

export default function MagneticButton({ 
  children, 
  className = "", 
  onClick,
  pullFactor = 0.3
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * pullFactor, y: y * pullFactor });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    playHoverSound();
  }

  const handleClick = (e: React.MouseEvent) => {
    playClickSound();
    if (onClick) onClick();
  }

  return (
    <button
      onClick={handleClick}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onMouseEnter={handleMouseEnter}
      className={`relative inline-block transition-transform duration-200 ease-out cursor-pointer ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {/* Visual pulse ring on hover */}
      <div className="absolute inset-0 rounded-inherit ring-2 ring-white/20 opacity-0 hover:opacity-100 hover:scale-110 transition-all duration-300 pointer-events-none" style={{ borderRadius: 'inherit' }}></div>
      {children}
    </button>
  );
}
