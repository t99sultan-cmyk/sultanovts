"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextRevealByWord = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const words = text.split(" ");
  
  return (
    <h1 className={cn("font-bold", className)}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: idx * 0.1,
            ease: [0.32, 0.72, 0, 1], // Custom spring-like easing
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
};
