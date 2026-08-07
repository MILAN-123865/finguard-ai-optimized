import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthSuccessState {
  title?: string;
  message?: string;
  buttonText?: string;
  redirectTo?: string;
}

export const AuthSuccessView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as AuthSuccessState | null;

  const title = state?.title || 'Success';
  const message = state?.message || 'Action completed successfully.';
  const buttonText = state?.buttonText || 'Continue';
  const redirectTo = state?.redirectTo || '/login';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-3xl p-7 sm:p-9 border border-[#00e5ff]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-2xl w-full group text-center"
    >
      <div className="absolute top-0 right-0 w-56 h-56 bg-[#00e5ff]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00e5ff]/25 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#6001d1]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#6001d1]/30 transition-all duration-700" />
      
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#00e5ff]/20 to-[#6001d1]/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,229,255,0.3)] border border-[#00e5ff]/40"
      >
        <CheckCircle2 size={40} className="text-[#00daf3]" />
      </motion.div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
        {title}
      </h1>
      
      <p className="text-sm text-[#bac9cc] font-mono mb-8">
        {message}
      </p>

      <button
        onClick={() => navigate(redirectTo)}
        className="w-full relative group/btn overflow-hidden rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#6001d1] p-[1px] transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
      >
        <div className="relative h-12 w-full rounded-xl bg-[#0a0d1c] flex items-center justify-center gap-2 transition-all group-hover/btn:bg-transparent">
          <span className="font-mono font-bold text-white tracking-wide text-sm z-10">
            {buttonText}
          </span>
          <ArrowRight size={16} className="text-white z-10" />
        </div>
      </button>
    </motion.div>
  );
};
