import React from 'react';
import { Fingerprint, Search } from 'lucide-react';

interface EvidencePanelProps {
  findings: string[];
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({ findings }) => {
  return (
    <div className="glass-card rounded-3xl border border-white/10 p-6 md:p-8 bg-[#0a0d1c]/90">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
        <div className="p-2 bg-[#00daf3]/10 border border-[#00daf3]/30 rounded-lg">
          <Fingerprint className="text-[#00daf3]" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">AI Evidence & Findings</h3>
          <p className="text-xs text-[#94a3b8]">Specific threat markers detected in the provided content.</p>
        </div>
      </div>

      <div className="space-y-4">
        {findings.map((finding, idx) => (
          <div key={idx} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
            <Search className="text-[#00daf3] shrink-0 mt-0.5" size={16} />
            <p className="text-sm text-white/90 leading-relaxed">
              {finding}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
