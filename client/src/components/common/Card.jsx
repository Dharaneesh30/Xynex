import React, { forwardRef } from 'react';

const Card = forwardRef(({ children, className = "", hoverable = false, ...props }, ref) => {
  return (
    <div 
      ref={ref}
      className={`bg-[#0D0D14] border border-[#272333] rounded-2xl overflow-hidden ${hoverable ? 'transition-all duration-300 hover:bg-[#12101A] hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.12)] hover:-translate-y-1' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
export default Card;
