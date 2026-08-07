import React from 'react';
import { Lightbulb, Info } from 'lucide-react';

export const EducationCard: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl border border-white/10 bg-[#0a0d1c]/90 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="text-yellow-400" size={20} />
        <h3 className="text-xl font-bold text-white">Educational Insight</h3>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
            <Info size={14} className="text-[#00daf3]" /> How scammers use urgency
          </h4>
          <p className="text-xs text-white/80 leading-relaxed">
            By claiming an account is "suspended" or requires "immediate verification," attackers bypass your logical thinking and force an emotional response. Always pause and verify independently.
          </p>
        </div>
        
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
            <Info size={14} className="text-[#00daf3]" /> How to stay protected
          </h4>
          <p className="text-xs text-white/80 leading-relaxed">
            Never click links in unsolicited messages. Navigate directly to the official website (e.g., chase.com) by typing it into your browser to check for account alerts.
          </p>
        </div>
      </div>
    </div>
  );
};
