import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Info, XCircle } from 'lucide-react';

export interface ToastProps {
  id: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  id, 
  type = 'info', 
  title, 
  message, 
  duration = 5000, 
  onClose 
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => onClose(id), duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const styles = {
    info: 'bg-[#0f1321] border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]',
    success: 'bg-[#0f1321] border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.15)]',
    warning: 'bg-[#0f1321] border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    error: 'bg-[#0f1321] border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
  };

  const icons = {
    info: <Info size={20} className="text-blue-400" />,
    success: <CheckCircle2 size={20} className="text-green-400" />,
    warning: <AlertCircle size={20} className="text-amber-400" />,
    error: <XCircle size={20} className="text-red-400" />
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl border ${styles[type]} p-4 mb-3`}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">{icons[type]}</div>
        <div className="flex-1 pt-0.5">
          {title && <h3 className="text-sm font-bold text-white mb-1">{title}</h3>}
          <p className="text-sm text-[#bac9cc]">{message}</p>
        </div>
        <button
          onClick={() => onClose(id)}
          className="shrink-0 rounded-lg p-1 text-[#bac9cc] hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
};

// Toast Container Wrapper Concept
export const ToastContainer: React.FC<{ toasts: ToastProps[] }> = ({ toasts }) => {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 w-full md:w-auto md:max-w-sm pointer-events-none flex flex-col items-end">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            id={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            duration={toast.duration}
            onClose={toast.onClose}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
