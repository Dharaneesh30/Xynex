import React from 'react';

export default function Card({ children, className = "", hoverable = false, ...props }) {
  return (
    <div 
      className={`bg-surface border border-ink/5 rounded-lg overflow-hidden ${hoverable ? 'transition-all duration-300 hover:border-brand-violet/30 hover:shadow-[0_0_15px_rgba(74,17,192,0.15)] hover:-translate-y-1' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
