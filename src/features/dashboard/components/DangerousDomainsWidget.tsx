import React from 'react';
import { Globe, AlertTriangle } from 'lucide-react';

export const DangerousDomainsWidget: React.FC = () => {
  const domains = [
    { url: 'secure-login-update.com', threat: 'Phishing', risk: 'Critical' },
    { url: 'free-crypto-giveaway.net', threat: 'Scam', risk: 'High' },
    { url: 'verify-account-info.org', threat: 'Spoofing', risk: 'High' },
    { url: 'whatsapp-prize-claim.co', threat: 'Malware', risk: 'Medium' },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 border border-red-500/20 bg-red-500/5 h-full shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Globe size={18} className="text-red-400" />
          Most Dangerous Domains
        </h3>
      </div>
      
      <div className="space-y-2">
        {domains.map((domain, i) => (
          <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-red-500/10">
            <div className="flex items-center gap-2 truncate">
              <AlertTriangle size={14} className="text-red-400 shrink-0" />
              <span className="text-xs text-white font-mono truncate">{domain.url}</span>
            </div>
            <span className="text-[10px] text-red-300 font-bold px-2 py-0.5 rounded bg-red-500/20 ml-2 shrink-0">
              {domain.threat}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
