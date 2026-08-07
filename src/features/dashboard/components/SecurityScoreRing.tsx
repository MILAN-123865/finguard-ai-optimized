import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

export const SecurityScoreRing: React.FC = () => {
  const score = 94;
  const circumference = 2 * Math.PI * 40; // r=40
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-card rounded-3xl p-6 border border-emerald-500/30 bg-emerald-500/5 h-full flex items-center justify-between shadow-[0_10px_30px_rgba(16,185,129,0.1)]">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck size={18} className="text-emerald-400" />
          <h3 className="font-bold text-white">Security Score</h3>
        </div>
        <p className="text-[11px] text-[#bac9cc] font-mono max-w-[120px]">
          Your system is currently operating in a highly secure state.
        </p>
      </div>
      
      <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-white/10"
          />
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
            className="text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-xl font-bold font-mono text-white">{score}</span>
        </div>
      </div>
    </div>
  );
};
