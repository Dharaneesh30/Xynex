import React from 'react';

export default function CornerFrame({ children, className = "" }) {
  const Corner = ({ className }) => (
    <svg 
      className={`absolute w-4 h-4 text-ink-muted group-hover:text-brand-blue group-active:text-brand-violet transition-colors duration-300 ${className}`} 
      viewBox="0 0 16 16" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H16V1H1V16H0V0Z" fill="currentColor" />
    </svg>
  );

  return (
    <div className={`relative ${className}`}>
      {/* Top Left */}
      <Corner className="top-0 left-0" />
      {/* Top Right */}
      <Corner className="top-0 right-0 rotate-90" />
      {/* Bottom Right */}
      <Corner className="bottom-0 right-0 rotate-180" />
      {/* Bottom Left */}
      <Corner className="bottom-0 left-0 -rotate-90" />
      
      {/* Content wrapper with some padding so it doesn't overlap corners, though this can be overridden */}
      <div className="p-2 h-full w-full">
        {children}
      </div>
    </div>
  );
}
