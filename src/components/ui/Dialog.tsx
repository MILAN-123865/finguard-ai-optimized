import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Dialog: React.FC<DialogProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children, 
  footer,
  maxWidth = 'md' 
}) => {
  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  }[maxWidth];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className={`relative w-full ${maxWidthClass} bg-[#0f1321] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-lg font-bold text-white">{title}</h2>
                {description && <p className="text-sm text-[#bac9cc] mt-1">{description}</p>}
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-full text-[#bac9cc] hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            {children && (
              <div className="p-6 overflow-y-auto">
                {children}
              </div>
            )}

            {/* Footer */}
            {footer && (
              <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex items-center justify-end gap-3 shrink-0">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Specialized Dialogs
export const ConfirmationDialog: React.FC<Omit<DialogProps, 'footer' | 'children'> & { onConfirm: () => void, confirmText?: string, cancelText?: string, isDestructive?: boolean }> = ({
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
  ...props
}) => (
  <Dialog
    {...props}
    footer={
      <>
        <Button variant="ghost" onClick={props.onClose}>{cancelText}</Button>
        <Button variant={isDestructive ? 'destructive' : 'primary'} onClick={onConfirm}>{confirmText}</Button>
      </>
    }
  />
);
