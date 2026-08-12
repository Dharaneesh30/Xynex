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
        className={`w-full bg-[#0B0C11] border ${error ? 'border-[#F87171]' : 'border-[#272A35] hover:border-[#3F3F52] focus:border-[#7C3AED]'} rounded px-4 py-2 text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:ring-1 focus:ring-[#7C3AED] focus:shadow-[0_0_10px_rgba(124,58,237,0.20)] transition-all ${className}`}
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
