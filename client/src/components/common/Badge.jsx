import React from 'react';

export default function Badge({ children, variant = 'default', className = "" }) {
  const variants = {
    default: "bg-[#08080C] text-[#94A3B8] border border-[#272333]",
    primary: "bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20",
    violet: "bg-[#7C3AED]/10 text-[#A78BFA] border border-[#7C3AED]/20",
    success: "bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/20",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
