import React from 'react';

export default function Badge({ children, variant = 'default', className = "" }) {
  const variants = {
    default: "bg-surface-elevated text-ink-muted border border-ink/10",
    primary: "bg-brand-blue/10 text-brand-blue border border-brand-blue/20",
    violet: "bg-brand-violet/10 text-brand-violet-light border border-brand-violet/20",
    success: "bg-status-good/10 text-status-good border border-status-good/20",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
