import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, X, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleConfirmLogout = async () => {
    await logout();
    onClose();
    navigate('/login', { replace: true });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="w-full max-w-sm bg-[#0a0d1a] border border-red-500/30 rounded-3xl p-6 text-white shadow-[0_0_40px_rgba(239,68,68,0.2)] text-center space-y-4 relative overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>

          <div className="w-14 h-14 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <LogOut size={28} />
          </div>

          <div>
            <h3 className="text-xl font-extrabold">Confirm Revoke Session</h3>
            <p className="text-xs text-[#bac9cc] font-mono mt-1.5">
              Are you sure you want to log out? Your active JWT token will be invalidated.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmLogout}
              className="py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all cursor-pointer"
            >
              Confirm Logout
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
