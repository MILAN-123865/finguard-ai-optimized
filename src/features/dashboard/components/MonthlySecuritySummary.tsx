import React from 'react';
import { Calendar, TrendingUp, TrendingDown, Shield } from 'lucide-react';

export const MonthlySecuritySummary: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl p-6 border border-[#6001d1]/30 bg-gradient-to-br from-[#6001d1]/5 to-[#00daf3]/5 h-full shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Calendar size={18} className="text-[#d2bbff]" />
          Monthly Summary
        </h3>
        <span className="text-[10px] text-[#bac9cc] font-mono uppercase">July 2026</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-[#bac9cc] text-xs font-mono mb-1">Threats Blocked</div>
          <div className="text-2xl font-bold text-white mb-2">1,248</div>
          <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
            <TrendingUp size={12} />
            <span>+12.5%</span>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-[#bac9cc] text-xs font-mono mb-1">Scans Performed</div>
          <div className="text-2xl font-bold text-white mb-2">8,402</div>
          <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
            <TrendingUp size={12} />
            <span>+8.2%</span>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 col-span-2 flex items-center justify-between">
          <div>
            <div className="text-[#bac9cc] text-xs font-mono mb-1">Overall Security Posture</div>
            <div className="text-lg font-bold text-[#00daf3]">Excellent</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#00daf3]/20 flex items-center justify-center border border-[#00daf3]/40">
            <Shield size={20} className="text-[#00daf3]" />
          </div>
        </div>
      </div>
    </div>
  );
};
