"use client";
import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    
    if (!canvasRef.current) return;
    
    const onResize = () => {
      width = canvasRef.current!.offsetWidth;
    };
    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1, 
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 0.45, 0.1], // Orange
      markerColor: [1, 1, 1], // White
      glowColor: [1, 0.5, 0], // Subtle orange glow
      markers: [
        { location: [51.169392, 71.449074], size: 0.1 }, // Astana
        { location: [43.222015, 76.851248], size: 0.1 }, // Almaty
        { location: [25.2048, 55.2708], size: 0.1 },     // Dubai
      ],
      // @ts-ignore
      onRender: (state: Record<string, any>) => {
        state.phi = phi;
        phi += 0.005;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => {
        if(canvasRef.current) {
            canvasRef.current.style.opacity = '1';
        }
    });

    return () => {
        globe.destroy();
        window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={`w-full max-w-[600px] aspect-square m-auto relative flex items-center justify-center pointer-events-none ${className || ""}`}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
};
