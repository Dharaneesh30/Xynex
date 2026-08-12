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
  const baseStyles = "inline-flex items-center justify-center font-body font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:opacity-50 disabled:pointer-events-none rounded";
  
  const variants = {
    primary: "bg-brand-blue text-ink hover:bg-brand-blue/90 shadow-sm",
    secondary: "bg-surface-elevated text-ink hover:bg-surface-elevated/80 border border-ink/10",
    gradient: "bg-gradient-to-r from-brand-blue to-brand-violet text-ink hover:opacity-90 shadow-sm",
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
