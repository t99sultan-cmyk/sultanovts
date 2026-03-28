"use client";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export const TiltCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Position of mouse inside card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize values between -1 and 1
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;
    
    // Rotate max 10deg
    rotateX.set(-yPct * 10);
    rotateY.set(xPct * 10);

    // Glare tracking
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative group isolate perspective-1000",
        className
      )}
    >
      {/* Glare effect overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.4),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </motion.div>
  );
};
