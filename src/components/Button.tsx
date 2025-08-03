import React from 'react';
import { motion } from 'framer-motion';

/**
 * 재사용 가능한 애니메이션 버튼 컴포넌트
 * @param {{ 
 *   children: React.ReactNode, 
 *   onClick: () => void, 
 *   variant?: 'primary' | 'secondary' | 'accent', 
 *   size?: 'sm' | 'md' | 'lg', 
 *   className?: string 
 * }} props
 */
const Button = ({ children, onClick, variant = 'primary', size = 'md', className = '' }) => {
  const baseStyles = 'font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-primary text-white focus:ring-primary',
    secondary: 'bg-secondary text-text-main focus:ring-secondary',
    accent: 'bg-accent text-white focus:ring-accent',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-body',
    lg: 'px-8 py-4 text-h3',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <motion.button
      onClick={onClick}
      className={combinedClassName}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
