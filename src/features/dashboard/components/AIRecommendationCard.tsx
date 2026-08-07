import React from 'react';
import { motion } from 'motion/react';
import { Brain, ArrowRight, ShieldAlert } from 'lucide-react';

export const AIRecommendationCard: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl p-6 border border-[#d2bbff]/30 relative overflow-hidden h-full shadow-[0_10px_30px_rgba(96,1,209,0.15)] group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#6001d1]/20 rounded-full blur-2xl pointer-events-none group-hover:bg-[#6001d1]/30 transition-all duration-700" />
      
      <div className="flex items-center gap-3 mb-5 relative z-10">
        <div className="p-2 rounded-xl bg-[#6001d1]/20 border border-[#d2bbff]/30 text-[#d2bbff]">
          <Brain size={20} />
        </div>
        <h3 className="font-bold text-white">AI Neural Insight</h3>
      </div>
      
      <div className="space-y-4 relative z-10">
        <p className="text-sm text-[#bac9cc] font-mono leading-relaxed">
          The neural engine detected a <span className="text-[#00daf3] font-bold">14% increase</span> in phishing attempts targeting similar profiles this week.
        </p>
        
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-3">
          <ShieldAlert size={18} className="text-orange-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-white mb-1">Recommendation</h4>
            <p className="text-[11px] text-[#bac9cc] font-mono">Enable advanced SMS filtering in your security settings to block anomalous senders automatically.</p>
          </div>
        </div>
        
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#6001d1]/80 to-[#9c27b0]/80 hover:from-[#6001d1] hover:to-[#9c27b0] text-white text-xs font-bold font-mono transition-all shadow-[0_0_15px_rgba(96,1,209,0.4)] hover:shadow-[0_0_25px_rgba(96,1,209,0.6)]">
          <span>Apply Security Patch</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
