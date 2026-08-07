import React from 'react';
import { Database, AlertTriangle, ShieldCheck } from 'lucide-react';

const intelData = [
  { indicator: 'Known Scam Pattern', result: 'Matched', type: 'danger' },
  { indicator: 'Fake Domain', result: 'Detected', type: 'danger' },
  { indicator: 'Global Blacklist', result: 'Positive', type: 'danger' },
  { indicator: 'Recent Campaign Correlation', result: 'Matched', type: 'danger' },
  { indicator: 'Sender Reputation', result: 'Poor', type: 'warning' },
  { indicator: 'SSL Certificate Valid', result: 'False', type: 'warning' },
];

export const ThreatIntelTable: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl border border-white/10 bg-[#0a0d1c]/90 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-white/5 flex items-center gap-3">
        <Database className="text-[#00daf3]" size={20} />
        <h3 className="text-xl font-bold text-white">Threat Intelligence</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-xs font-mono font-bold text-[#94a3b8] uppercase tracking-wider">Indicator</th>
              <th className="px-6 py-4 text-xs font-mono font-bold text-[#94a3b8] uppercase tracking-wider">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {intelData.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-white/90 font-medium">
                  {row.indicator}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${
                    row.type === 'danger' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                  }`}>
                    {row.type === 'danger' ? <AlertTriangle size={12} /> : <ShieldCheck size={12} />}
                    {row.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
