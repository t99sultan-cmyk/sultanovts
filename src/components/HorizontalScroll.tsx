'use client';

import { useRef, useEffect } from 'react';

export default function HorizontalScroll({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !scrollRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const scrollHeight = containerRef.current.offsetHeight - window.innerHeight;
      
      // Calculate how far down the container we've scrolled (0 to 1)
      const scrollY = -containerRect.top;
      let progress = Math.max(0, Math.min(scrollY / scrollHeight, 1));
      
      // Calculate how far to translate the inner track
      const trackWidth = scrollRef.current.scrollWidth - scrollRef.current.offsetWidth;
      scrollRef.current.style.transform = `translateX(-${progress * trackWidth}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-[250vh] ${className}`}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div ref={scrollRef} className="flex will-change-transform ease-out duration-100">
          {children}
        </div>
      </div>
    </div>
  );
}
