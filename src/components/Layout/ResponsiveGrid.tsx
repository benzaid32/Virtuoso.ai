import React from 'react';
import { motion } from 'framer-motion';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        grid grid-cols-1 xl:grid-cols-2 gap-8 h-full
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};