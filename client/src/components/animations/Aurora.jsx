import React from 'react';
import { motion } from 'framer-motion';

export default function Aurora({ className = "", color1 = "#7C3AED", color2 = "#06B6D4", baseColor = "#050507" }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ backgroundColor: baseColor, zIndex: -1 }}>
      <motion.div 
        className="absolute w-[150vw] h-[150vh] opacity-30 mix-blend-screen rounded-full"
        style={{
          top: '-25vh',
          left: '-25vw',
          background: `radial-gradient(circle at 30% 40%, ${color1} 0%, transparent 50%), radial-gradient(circle at 70% 60%, ${color2} 0%, transparent 50%)`,
          filter: 'blur(100px)',
        }}
        animate={{
          rotate: [0, 15, -10, 0],
          scale: [1, 1.1, 1.05, 1],
          x: [0, '5vw', '-5vw', 0],
          y: [0, '-5vh', '5vh', 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
