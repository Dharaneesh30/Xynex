import React, { forwardRef } from 'react';

const Input = forwardRef(({ className = "", label, error, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-ink-muted mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full bg-surface-elevated border ${error ? 'border-red-500' : 'border-ink/10 focus:border-brand-blue'} rounded px-4 py-2 text-ink placeholder-ink-muted/50 focus:outline-none focus:ring-1 focus:ring-brand-blue transition-colors ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
