'use client';

import { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  target: number;
  start?: number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ target, start = 0, duration = 2000, className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(start);
  const domRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
    let actx: AudioContext | null = null;
    let t = 0; // throttle

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let startTimestamp: number | null = null;

        // Try to init audio context (might fail if no interaction yet, but user scrolled so likely fine)
        try {
           if (AudioContextClass && !actx) actx = new AudioContextClass();
           if (actx && actx.state === 'suspended') actx.resume();
        } catch(e){}

        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = Math.floor(start + ease * (target - start));
          setCount(current);

          // Play sound every 50ms approx
          if (actx && current > count && timestamp - t > 60) {
             t = timestamp;
             try {
                const osc = actx.createOscillator();
                const gain = actx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(600, actx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(800, actx.currentTime + 0.05);
                gain.gain.setValueAtTime(0.05, actx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.05);
                osc.connect(gain);
                gain.connect(actx.destination);
                osc.start();
                osc.stop(actx.currentTime + 0.05);
             } catch(e){}
          }

          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
             // Final ping sound
             try {
                if (actx) {
                    const osc = actx.createOscillator();
                    const gain = actx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(1000, actx.currentTime);
                    gain.gain.setValueAtTime(0.1, actx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.3);
                    osc.connect(gain);
                    gain.connect(actx.destination);
                    osc.start();
                    osc.stop(actx.currentTime + 0.3);
                }
             } catch(e){}
          }
        };
        window.requestAnimationFrame(step);
        observer.unobserve(entries[0].target);
      }
    }, { threshold: 0.1 });

    if (domRef.current) observer.observe(domRef.current);

    return () => observer.disconnect();
  }, [target, duration, start]);

  return (
    <span ref={domRef} className={className}>
      {count.toLocaleString('ru-RU')}
    </span>
  );
}
