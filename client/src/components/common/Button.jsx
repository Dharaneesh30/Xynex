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
  const baseStyles = "inline-flex items-center justify-center font-body font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 disabled:opacity-50 disabled:pointer-events-none rounded-full";
  
  const variants = {
    primary: "bg-ink text-white hover:bg-ink/80 shadow-md hover:shadow-lg",
    secondary: "bg-surface-elevated backdrop-blur-md text-ink hover:bg-white/90 border border-white/50 shadow-sm",
    gradient: "bg-gradient-to-r from-brand-blue to-brand-violet text-white hover:opacity-90 shadow-md hover:shadow-lg hover:shadow-brand-blue/20",
    outline: "border border-brand-blue text-brand-blue hover:bg-brand-blue/10",
    ghost: "text-ink-muted hover:text-ink hover:bg-surface-elevated"
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
