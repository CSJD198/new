import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  gradient = false,
  glow = false
}) => {
  const baseClasses = 'rounded-xl overflow-hidden';
  const hoverClasses = hover ? 'cursor-pointer' : '';
  const backgroundClasses = gradient 
    ? 'bg-gradient-to-br from-white/10 to-white/5' 
    : 'card-bg';
  const glowClasses = glow ? 'glow-blue' : 'shadow-xl shadow-black/20';

  return (
    <motion.div
      whileHover={hover ? { 
        scale: 1.02, 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
      } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`${baseClasses} ${hoverClasses} ${backgroundClasses} ${glowClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};