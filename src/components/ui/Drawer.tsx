import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Drawer: React.FC<DrawerProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  position = 'right',
  size = 'md' 
}) => {
  const sizes = {
    left: { sm: 'w-64', md: 'w-80', lg: 'w-96', xl: 'w-[32rem]', full: 'w-full' },
    right: { sm: 'w-64', md: 'w-80', lg: 'w-96', xl: 'w-[32rem]', full: 'w-full' },
    bottom: { sm: 'h-64', md: 'h-80', lg: 'h-96', xl: 'h-[32rem]', full: 'h-full' }
  };

  const variants = {
    left: { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } },
    right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
    bottom: { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }
  };

  const positionClasses = {
    left: 'top-0 left-0 h-full border-r',
    right: 'top-0 right-0 h-full border-l',
    bottom: 'bottom-0 left-0 w-full border-t rounded-t-3xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            variants={variants[position]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`absolute bg-[#0f1321] border-white/10 shadow-2xl flex flex-col ${positionClasses[position]} ${sizes[position][size]}`}
          >
            {title && (
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
                <h2 className="text-lg font-bold text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 rounded-full text-[#bac9cc] hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                >
                  <X size={20} />
                </button>
              </div>
            )}
            {!title && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full text-[#bac9cc] hover:text-white hover:bg-white/10 transition-colors focus:outline-none z-10"
              >
                <X size={20} />
              </button>
            )}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
