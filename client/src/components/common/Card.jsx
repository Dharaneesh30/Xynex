import React from 'react';

export default function Card({ children, className = "", hoverable = false, ...props }) {
  return (
    <div 
      className={`bg-surface backdrop-blur-xl border border-white/40 shadow-resting rounded-2xl overflow-hidden ${hoverable ? 'transition-all duration-300 hover:border-brand-violet/30 hover:shadow-elevated hover:-translate-y-1' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
