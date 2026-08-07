import React from 'react';
import { motion } from 'motion/react';
import { Loader2, Shield } from 'lucide-react';

export const FullPageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#0f1321] z-50 flex items-center justify-center flex-col overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00daf3]/10 via-[#0f1321] to-[#0f1321] opacity-60" />
      
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="relative z-10"
      >
        <div className="absolute inset-0 bg-[#00daf3]/20 blur-xl rounded-full" />
        <Shield size={64} className="text-[#00daf3] drop-shadow-[0_0_15px_rgba(0,218,243,0.5)]" />
      </motion.div>
      
      <div className="mt-8 flex flex-col items-center z-10">
        <h3 className="text-white font-bold text-xl mb-2 tracking-wider uppercase">Loading Secure Environment</h3>
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin text-[#00daf3]" size={16} />
          <span className="text-[#bac9cc] font-mono text-sm">Please wait...</span>
        </div>
      </div>
    </div>
  );
};

export const AuthLoader: React.FC<{ message?: string }> = ({ message = "Authenticating..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 w-full h-full min-h-[300px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="relative w-16 h-16 border-2 border-[#00daf3]/20 border-t-[#00daf3] rounded-full mb-6"
      >
        <div className="absolute inset-2 border-2 border-[#6001d1]/30 border-b-[#6001d1] rounded-full animate-[spin_3s_linear_reverse_infinite]" />
      </motion.div>
      <p className="text-white font-mono animate-pulse">{message}</p>
    </div>
  );
};

export const ButtonLoader: React.FC<{ text?: string }> = ({ text = "Processing" }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Loader2 size={18} className="animate-spin text-current" />
      <span>{text}</span>
    </div>
  );
};

export const SkeletonLoader: React.FC<{ className?: string }> = ({ className = "h-12 w-full" }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-[#0a0d1c]/60 border border-white/5 ${className}`}>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#00daf3]/10 to-transparent skew-x-[-20deg]"
      />
    </div>
  );
};
