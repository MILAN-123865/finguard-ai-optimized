import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

const mockTimeline = [
  { time: '10:45:12', type: 'Credential Harvest', status: 'Blocked', score: 99, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { time: '10:44:03', type: 'Spoofed Email', status: 'Quarantined', score: 85, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { time: '10:41:22', type: 'Fake Login Page', status: 'Blocked', score: 94, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { time: '10:38:15', type: 'Malicious QR', status: 'Flagged', score: 72, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { time: '10:30:59', type: 'Suspicious IP', status: 'Monitored', score: 45, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
];

export const ThreatTimeline: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl border border-white/10 p-5 flex flex-col h-full bg-[#050711]/80 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-[#f97316]" />
          <h3 className="font-bold text-white text-sm">Chronological Threat Log</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar pr-2 relative">
        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/5" />
        <div className="space-y-4 relative">
          {mockTimeline.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="flex items-start gap-4 group cursor-pointer"
            >
              <div className={`relative z-10 w-6 h-6 rounded-full border ${item.border} ${item.bg} flex items-center justify-center shrink-0 mt-1`}>
                <div className={`w-2 h-2 rounded-full ${item.color.replace('text', 'bg')}`} />
              </div>
              <div className="flex-1 glass-card p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors bg-white/5">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-white text-sm font-bold">{item.type}</span>
                  <span className="text-[#94a3b8] text-[10px] font-mono">{item.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold uppercase ${item.color}`}>{item.status}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-white/50 group-hover:text-white transition-colors">Risk: {item.score}</span>
                    <ExternalLink size={12} className="text-white/20 group-hover:text-white/80 transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
