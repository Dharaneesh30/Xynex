import React from 'react';
import { motion } from 'framer-motion';

export default function GridMotion({ className = "" }) {
  return (
    <div className={`absolute inset-0 overflow-hidden bg-[#020204] ${className}`} style={{ zIndex: -1 }}>
      <motion.div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, #111827 1px, transparent 1px),
            linear-gradient(to bottom, #111827 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          transform: 'perspective(1000px) rotateX(60deg) scale(2.5) translateY(0)',
          transformOrigin: 'top center',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '0px 4rem']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.05) 30%, transparent 60%)'
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-transparent to-[#020204] pointer-events-none" />
    </div>
  );
}
