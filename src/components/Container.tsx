import React from 'react';
import { motion } from 'framer-motion';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  const baseStyles = 'bg-white rounded-3xl shadow-lg overflow-hidden';

  const combinedClassName = `${baseStyles} ${className}`;

  return (
    <motion.div
      className={combinedClassName}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      {children}
    </motion.div>
  );
};

export default Container;
