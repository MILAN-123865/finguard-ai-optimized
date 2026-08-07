import React from 'react';
import { ShieldAlert, Trash2, Ban, Flag, Eye, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';

export const VerdictCard: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      className="glass-card rounded-3xl border border-red-500/30 bg-red-500/5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="p-8 border-b border-red-500/20 text-center relative z-10">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500/30 text-red-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-2">Critical Threat</h2>
        <p className="text-red-400 font-bold tracking-wide uppercase text-sm">Do NOT trust this message.</p>
      </div>
      
      <div className="p-8 relative z-10">
        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Recommended Actions</h4>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <span className="flex items-center gap-3 text-white font-medium">
              <Trash2 size={18} className="text-[#94a3b8] group-hover:text-red-400 transition-colors" /> Delete message
            </span>
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <span className="flex items-center gap-3 text-white font-medium">
              <Ban size={18} className="text-[#94a3b8] group-hover:text-red-400 transition-colors" /> Block sender
            </span>
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <span className="flex items-center gap-3 text-white font-medium">
              <Flag size={18} className="text-[#94a3b8] group-hover:text-orange-400 transition-colors" /> Report phishing
            </span>
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <span className="flex items-center gap-3 text-white font-medium">
              <Eye size={18} className="text-[#94a3b8] group-hover:text-[#00daf3] transition-colors" /> Monitor bank account
            </span>
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <span className="flex items-center gap-3 text-white font-medium">
              <PhoneCall size={18} className="text-[#94a3b8] group-hover:text-[#00daf3] transition-colors" /> Contact official support
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
