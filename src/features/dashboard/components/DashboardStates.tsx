import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, FileX, RefreshCw } from 'lucide-react';

export const DashboardSkeleton: React.FC<{ className?: string }> = ({ className = "h-32" }) => {
  return (
    <div className={`glass-card rounded-3xl p-6 border border-white/5 relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#00daf3]/5 to-transparent skew-x-[-20deg]"
      />
      <div className="space-y-3">
        <div className="w-1/3 h-4 bg-white/5 rounded-full animate-pulse" />
        <div className="w-1/2 h-8 bg-white/5 rounded-full animate-pulse" />
        <div className="w-full h-12 bg-white/5 rounded-xl animate-pulse mt-4" />
      </div>
    </div>
  );
};

export const DashboardEmptyState: React.FC<{ title: string; message: string; icon?: React.ReactNode }> = ({ 
  title, 
  message, 
  icon = <FileX size={24} className="text-[#bac9cc]" /> 
}) => {
  return (
    <div className="glass-card rounded-3xl p-8 border border-white/10 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
      <p className="text-[#bac9cc] font-mono text-xs max-w-[200px]">{message}</p>
    </div>
  );
};

export const DashboardErrorState: React.FC<{ message?: string; onRetry?: () => void }> = ({ 
  message = "Failed to load widget data", 
  onRetry 
}) => {
  return (
    <div className="glass-card rounded-3xl p-6 border border-red-500/20 bg-red-500/5 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
      <AlertCircle size={28} className="text-red-400 mb-3" />
      <p className="text-red-300 font-mono text-xs mb-4">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono transition-colors border border-red-500/20"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      )}
    </div>
  );
};
