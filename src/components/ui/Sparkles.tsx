"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export const SparklesCore = ({
  background,
  minSize = 1,
  maxSize = 3,
  particleDensity = 50,
  className,
  particleColor = "#FFF",
}: {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const p = Array.from({ length: particleDensity }).map((_, i) => ({
      id: i,
      x: random(0, 100),
      y: random(0, 100),
      size: random(minSize, maxSize),
      duration: random(2, 5),
    }));
    setParticles(p);
  }, []); // removed dependencies to run only once and prevent infinite loop

  return (
    <div
      className={className}
      style={{ background: background || "transparent" }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: particleColor,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
