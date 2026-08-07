import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

interface AuthErrorState {
  title?: string;
  message?: string;
  buttonText?: string;
  redirectTo?: string;
}

export const AuthErrorView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as AuthErrorState | null;

  const title = state?.title || 'Authentication Error';
  const message = state?.message || 'An error occurred during authentication. Please try again.';
  const buttonText = state?.buttonText || 'Go Back';
  const redirectTo = state?.redirectTo || '/login';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-3xl p-7 sm:p-9 border border-red-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-2xl w-full group text-center"
    >
      <div className="absolute top-0 right-0 w-56 h-56 bg-red-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-red-500/20 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-orange-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-500/20 transition-all duration-700" />
      
      <motion.div 
        animate={{ scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.3)] border border-red-500/40"
      >
        <ShieldAlert size={40} className="text-red-400" />
      </motion.div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
        {title}
      </h1>
      
      <p className="text-sm text-[#bac9cc] font-mono mb-8">
        {message}
      </p>

      <button
        onClick={() => navigate(redirectTo)}
        className="w-full relative group/btn overflow-hidden rounded-xl bg-gradient-to-r from-red-500 to-orange-500 p-[1px] transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
      >
        <div className="relative h-12 w-full rounded-xl bg-[#0a0d1c] flex items-center justify-center gap-2 transition-all group-hover/btn:bg-transparent">
          <ArrowLeft size={16} className="text-white z-10" />
          <span className="font-mono font-bold text-white tracking-wide text-sm z-10">
            {buttonText}
          </span>
        </div>
      </button>
    </motion.div>
  );
};
