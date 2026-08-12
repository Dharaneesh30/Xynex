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
  const baseStyles = "inline-flex items-center justify-center font-body font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 disabled:opacity-50 disabled:pointer-events-none rounded-md";
  
  const variants = {
    primary: "bg-ink dark:bg-white text-white dark:text-ink hover:opacity-90 shadow-md",
    secondary: "bg-surface dark:bg-[#111111] text-ink dark:text-white border border-ink/5 dark:border-white/5 hover:bg-surface-elevated dark:hover:bg-[#1A1A1A] shadow-sm",
    gradient: "bg-gradient-to-r from-brand-blue to-brand-violet text-white hover:opacity-90 shadow-md",
    outline: "border border-ink/10 dark:border-white/10 text-ink dark:text-white hover:bg-ink/5 dark:hover:bg-white/5",
    ghost: "text-ink-muted dark:text-zinc-400 hover:text-ink dark:hover:text-white hover:bg-ink/5 dark:hover:bg-white/5"
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3"
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
