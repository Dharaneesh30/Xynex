import React from 'react';
import { motion } from 'framer-motion';

export default function ShinyText({ text, className = "", speed = 3 }) {
  return (
    <motion.span
      className={`inline-block text-transparent bg-clip-text bg-[linear-gradient(110deg,#F8FAFC,45%,#A78BFA,55%,#F8FAFC)] bg-[length:250%_100%] ${className}`}
      animate={{ backgroundPosition: ["250% 0", "-250% 0"] }}
      transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
    >
      {text}
    </motion.span>
  );
}
