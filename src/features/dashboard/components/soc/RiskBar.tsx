import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

const data = [
  { label: 'Critical', value: 12, color: 'bg-red-500', text: 'text-red-400' },
  { label: 'High', value: 24, color: 'bg-orange-500', text: 'text-orange-400' },
  { label: 'Medium', value: 38, color: 'bg-yellow-500', text: 'text-yellow-400' },
  { label: 'Low', value: 26, color: 'bg-green-500', text: 'text-green-400' },
];

export const RiskBar: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl border border-white/10 p-5 flex flex-col justify-center h-full bg-[#0a0d1c]/80 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle size={16} className="text-[#00daf3]" />
        <h3 className="font-bold text-white text-sm">Threat Level Distribution</h3>
      </div>
      
      <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden flex mb-4">
        {data.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ width: 0 }}
            animate={{ width: `${item.value}%` }}
            transition={{ duration: 1.5, delay: idx * 0.2, ease: "easeOut" }}
            className={`h-full ${item.color} relative group cursor-pointer`}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors" />
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center px-1">
        {data.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1">
            <span className={`text-[10px] font-mono uppercase tracking-wider ${item.text}`}>{item.label}</span>
            <span className="text-white font-bold text-xs">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
