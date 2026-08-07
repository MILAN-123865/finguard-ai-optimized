import React from 'react';
import { FileDown, FileJson, Share2, Copy } from 'lucide-react';

export const ExportActions: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl border border-white/10 bg-[#0a0d1c]/90 p-6 md:p-8 mt-6">
      <h3 className="text-xl font-bold text-white mb-6">Download Investigation</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#00daf3] text-[#00363d] font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)]">
          <FileDown size={16} /> PDF Report
        </button>
        <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-colors">
          <FileJson size={16} /> Export JSON
        </button>
        <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-colors">
          <Copy size={16} /> Copy Summary
        </button>
        <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-colors">
          <Share2 size={16} /> Share Securely
        </button>
      </div>
    </div>
  );
};
