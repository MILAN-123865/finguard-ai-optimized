import React, { useState } from 'react';
import { Lightbulb, ChevronRight, ChevronLeft, ShieldCheck, Sparkles } from 'lucide-react';

export const SecurityTips: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      title: 'Inspect Sender Phone Numbers & Country Codes',
      content:
        'Scammers frequently utilize foreign VoIP numbers (e.g. +44, +91) to impersonate local banks. Always verify official customer service channels.',
    },
    {
      title: 'Never Share OTPs over SMS or Chat',
      content:
        'FinGuard AI reminds you that legitimate financial institutions will NEVER ask for a One-Time Password via text or WhatsApp.',
    },
    {
      title: 'Verify Domain Extension Authenticity',
      content:
        'Phishing kits use hyphenated domains like chase-bank-verify-auth.com instead of chase.com. Use FinGuard URL Scanner before clicking.',
    },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 border border-[#00e5ff]/25 space-y-4 shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Lightbulb size={16} className="text-[#ffd166]" />
          <span>AI Cyber Guard Intelligence Tip</span>
        </h3>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentTip((prev) => (prev === 0 ? tips.length - 1 : prev - 1))}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#bac9cc] hover:text-white transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[10px] font-mono text-[#bac9cc]">
            {currentTip + 1} / {tips.length}
          </span>
          <button
            onClick={() => setCurrentTip((prev) => (prev === tips.length - 1 ? 0 : prev + 1))}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#bac9cc] hover:text-white transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-[#0a0d1a] border border-white/10 space-y-2">
        <h4 className="text-xs font-bold text-[#00daf3] flex items-center gap-1.5">
          <Sparkles size={13} />
          <span>{tips[currentTip].title}</span>
        </h4>
        <p className="text-xs text-[#bac9cc] leading-relaxed">
          {tips[currentTip].content}
        </p>
      </div>
    </div>
  );
};
