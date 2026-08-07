import React from 'react';
import { CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';

// Generate mock heatmap data (e.g. 7 days x 12 hours)
const generateData = () => {
  const data = [];
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 12; hour++) {
      const riskLevel = Math.random();
      let colorClass = 'bg-[#0a0d1c] border-white/5';
      if (riskLevel > 0.95) colorClass = 'bg-red-500/80 border-red-400';
      else if (riskLevel > 0.8) colorClass = 'bg-orange-500/80 border-orange-400';
      else if (riskLevel > 0.5) colorClass = 'bg-yellow-500/80 border-yellow-400';
      else if (riskLevel > 0.2) colorClass = 'bg-green-500/80 border-green-400';

      data.push({
        id: `${day}-${hour}`,
        colorClass,
        count: Math.floor(riskLevel * 50)
      });
    }
  }
  return data;
};

const heatmapData = generateData();

export const Heatmap: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl border border-white/10 p-5 flex flex-col h-full bg-[#050711]/80 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
        <CalendarDays size={16} className="text-[#00e5ff]" />
        <h3 className="font-bold text-white text-sm">Threat Intensity Map</h3>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="grid grid-rows-7 grid-flow-col gap-1.5 w-full justify-center">
          {heatmapData.map((cell, idx) => (
            <motion.div
              key={cell.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.01 }}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-[3px] border ${cell.colorClass} cursor-pointer hover:scale-125 hover:z-10 transition-transform`}
              title={`Threats: ${cell.count}`}
            />
          ))}
        </div>
        
        <div className="flex items-center gap-2 mt-4 text-[10px] font-mono text-[#94a3b8]">
          <span>Low</span>
          <div className="w-2 h-2 rounded-[2px] bg-[#0a0d1c] border border-white/5" />
          <div className="w-2 h-2 rounded-[2px] bg-green-500/80" />
          <div className="w-2 h-2 rounded-[2px] bg-yellow-500/80" />
          <div className="w-2 h-2 rounded-[2px] bg-orange-500/80" />
          <div className="w-2 h-2 rounded-[2px] bg-red-500/80" />
          <span>High</span>
        </div>
      </div>
    </div>
  );
};
