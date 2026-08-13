import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  to, 
  href,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-body font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none rounded-md border border-transparent";
  
  const variants = {
    primary: "bg-[#7C3AED] text-[#FFFFFF] hover:bg-[#8B5CF6] active:bg-[#6D28D9] focus:ring-2 focus:ring-[#A78BFA] shadow-[0_0_15px_rgba(124,58,237,0.30)]",
    secondary: "bg-[#0891B2] text-[#FFFFFF] hover:bg-[#06B6D4] active:bg-[#0E7490] focus:ring-2 focus:ring-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,0.25)]",
    cyan: "bg-[#0891B2] text-[#FFFFFF] hover:bg-[#06B6D4] active:bg-[#0E7490] focus:ring-2 focus:ring-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,0.25)]",
    gradient: "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-[#FFFFFF] hover:opacity-90 shadow-[0_0_15px_rgba(124,58,237,0.25)]",
    outline: "!border-[#7C3AED] bg-transparent text-[#A78BFA] hover:bg-[rgba(124,58,237,0.12)] hover:!border-[#8B5CF6] hover:text-[#FFFFFF]",
    ghost: "bg-transparent text-[#CBD5E1] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#FFFFFF]"
  };

  const sizes = {
    sm: "text-sm px-5 py-2 h-11",
    md: "text-base px-6 py-2.5 h-12",
    lg: "text-lg px-7 py-3 h-[52px]"
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
