import React from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

const indicators = [
  { name: 'Urgency', score: 98, color: 'bg-red-500' },
  { name: 'Social Engineering', score: 99, color: 'bg-orange-500' },
  { name: 'Credential Theft', score: 96, color: 'bg-purple-500' },
  { name: 'Financial Fraud', score: 95, color: 'bg-pink-500' },
  { name: 'Domain Reputation', score: 8, color: 'bg-green-500' }
];

export const ThreatIndicators: React.FC = () => {
  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 bg-[#0a0d1c]/90">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="text-[#00daf3]" size={20} />
        <h3 className="text-xl font-bold text-white">Threat Indicators</h3>
      </div>
      
      <div className="space-y-6">
        {indicators.map((ind, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-white/90">{ind.name}</span>
              <span className="text-xs font-mono text-[#94a3b8]">{ind.score}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${ind.score}%` }}
                transition={{ delay: 0.5 + idx * 0.2, duration: 1, ease: 'easeOut' }}
                className={`h-full ${ind.color} shadow-[0_0_10px_currentColor] opacity-80`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
