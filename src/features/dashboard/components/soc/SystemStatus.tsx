import React from 'react';
import { Server } from 'lucide-react';
import { motion } from 'motion/react';

const systems = [
  { name: 'AI Engine', status: 'Optimal' },
  { name: 'Threat Database', status: 'Syncing' },
  { name: 'OCR Engine', status: 'Online' },
  { name: 'Voice Analysis', status: 'Online' },
  { name: 'Gateway API', status: 'Online' },
  { name: 'Global Intel', status: 'Connected' }
];

export const SystemStatus: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl border border-white/10 p-5 flex flex-col h-full bg-[#0a0d1c]/80 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-4">
        <Server size={16} className="text-[#00daf3]" />
        <h3 className="font-bold text-white text-sm">System Telemetry</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {systems.map((sys, idx) => (
          <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center justify-between hover:bg-white/10 transition-colors">
            <span className="text-xs text-[#94a3b8] font-mono">{sys.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/70">{sys.status}</span>
              <div className="relative flex h-2 w-2">
                <motion.span 
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  className="absolute inline-flex h-full w-full rounded-full bg-green-400"
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
