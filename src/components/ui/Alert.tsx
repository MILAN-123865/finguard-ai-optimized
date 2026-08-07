import React from 'react';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ type = 'info', title, children, className = '' }) => {
  const styles = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    success: 'bg-green-500/10 border-green-500/30 text-green-400',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400'
  };

  const icons = {
    info: <Info size={20} />,
    success: <CheckCircle2 size={20} />,
    warning: <AlertCircle size={20} />,
    error: <XCircle size={20} />
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 p-4 rounded-xl border ${styles[type]} ${className}`}
    >
      <div className="shrink-0 mt-0.5">{icons[type]}</div>
      <div>
        {title && <h5 className="font-bold mb-1">{title}</h5>}
        <div className="text-sm opacity-90 leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
