'use client';

import { useEffect, useState } from 'react';

export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D Liquid "Eye" or Sphere moving opposite to mouse for parallax */}
      <div 
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full blur-[100px] opacity-30 mix-blend-multiply transition-transform duration-[2000ms] ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.8) 0%, rgba(227,74,38,0.5) 40%, transparent 70%)',
          transform: `translate(calc(-50% + ${mousePosition.x * -100}px), calc(-50% + ${mousePosition.y * -100}px)) rotate(${mousePosition.x * 20}deg) scale(1.2)`,
        }}
      />
      
      {/* Floating 3D Shapes (Simulated via CSS) */}
      <div 
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-3xl blur-[40px] opacity-20 transition-transform duration-[3000ms] ease-out"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(168,85,247,0.8), transparent)',
          transform: `translate(${mousePosition.x * 150}px, ${mousePosition.y * 150}px) rotate(${mousePosition.x * 45}deg)`,
        }}
      />

      <div 
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-[60px] opacity-20 transition-transform duration-[2500ms] ease-out"
        style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(59,130,246,0.8), transparent)',
          transform: `translate(${mousePosition.x * -120}px, ${mousePosition.y * -120}px) scale(${1 + mousePosition.y * 0.1})`,
        }}
      />
      
      {/* Mesh/Grid Overlay for 3D feel */}
      <div className="absolute inset-0 bg-[url('/mesh-bg.png')] opacity-[0.03] mix-blend-overlay"></div>
    </div>
  );
}
