import React from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'motion/react';

const recentScans = [
  { id: '1', type: 'SMS', date: 'Just now', level: 'CRITICAL', conf: '99%' },
  { id: '2', type: 'URL', date: '10 mins ago', level: 'HIGH', conf: '94%' },
  { id: '3', type: 'Email', date: '1 hour ago', level: 'MEDIUM', conf: '72%' },
  { id: '4', type: 'Image', date: '2 hours ago', level: 'SAFE', conf: '98%' },
];

export const RecentAnalysis: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl border border-white/10 p-6 md:p-8 bg-[#0a0d1c]/90">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
        <div className="p-2 bg-white/5 border border-white/10 rounded-lg">
          <Clock className="text-[#94a3b8]" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Recent Analysis History</h3>
          <p className="text-xs text-[#94a3b8]">Your workspace activity log.</p>
        </div>
      </div>

      <div className="space-y-3">
        {recentScans.map((scan, idx) => {
          const colorClass = 
            scan.level === 'CRITICAL' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
            scan.level === 'HIGH' ? 'text-orange-400 bg-orange-500/10 border-orange-500/20' :
            scan.level === 'MEDIUM' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' :
            'text-green-400 bg-green-500/10 border-green-500/20';

          return (
            <motion.div 
              key={scan.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-white text-sm font-bold">{scan.type} Analysis</span>
                <span className="text-[#94a3b8] text-[10px] font-mono mt-0.5">{scan.date}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-white/50">{scan.conf}</span>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${colorClass}`}>
                  {scan.level}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
