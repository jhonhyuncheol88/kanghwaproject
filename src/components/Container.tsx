import React from 'react';
import { motion } from 'framer-motion';

/**
 * 재사용 가능한 애니메이션 컨테이너 컴포넌트
 * @param {{ 
 *   children: React.ReactNode, 
 *   className?: string 
 * }} props
 */
const Container = ({ children, className = '' }) => {
  const baseStyles = 'bg-white rounded-3xl shadow-lg overflow-hidden';

  const combinedClassName = `${baseStyles} ${className}`;

  return (
    <motion.div
      className={combinedClassName}
      whileHover={{ scale: 1.02, shadow: 'xl', transition: { duration: 0.3 } }}
    >
      {children}
    </motion.div>
  );
};

export default Container;
