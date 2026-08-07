import React from 'react';
import { Shield, FileDown, Share2, Copy } from 'lucide-react';

interface RecommendationCardProps {
  action: string;
  description: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ action, description }) => {
  const isBlock = action.toUpperCase().includes('BLOCK') || action.toUpperCase().includes('DELETE');

  return (
    <div className="glass-card rounded-3xl border border-white/10 p-6 md:p-8 bg-[#0a0d1c]/90">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
        <div className={`p-2 rounded-lg border ${isBlock ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
          <Shield size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Recommended Action</h3>
          <p className="text-xs text-[#94a3b8]">AI-generated response protocol.</p>
        </div>
      </div>

      <div className={`p-5 rounded-2xl border mb-6 ${isBlock ? 'bg-red-500/5 border-red-500/20' : 'bg-green-500/5 border-green-500/20'}`}>
        <h4 className={`text-xl font-bold  mb-2 ${isBlock ? 'text-red-400' : 'text-green-400'}`}>
          {action}
        </h4>
        <p className="text-sm text-white/80 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
          <FileDown size={16} /> Generate PDF
        </button>
        <button className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
          <Share2 size={16} /> Share Report
        </button>
        <button className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors">
          <Copy size={16} />
        </button>
      </div>
    </div>
  );
};
