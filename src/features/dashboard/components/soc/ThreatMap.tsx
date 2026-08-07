import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import { motion } from 'motion/react';

export const ThreatMap: React.FC = () => {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActive = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));
      setActiveNodes(newActive);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: 0, x: 20, y: 30 },
    { id: 1, x: 25, y: 45 },
    { id: 2, x: 15, y: 60 },
    { id: 3, x: 45, y: 35 },
    { id: 4, x: 50, y: 55 },
    { id: 5, x: 60, y: 20 },
    { id: 6, x: 75, y: 30 },
    { id: 7, x: 80, y: 65 },
    { id: 8, x: 90, y: 45 },
    { id: 9, x: 35, y: 75 },
  ];

  return (
    <div className="glass-card rounded-2xl border border-white/10 p-5 flex flex-col h-full bg-[#050711]/90 backdrop-blur-md relative overflow-hidden">
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <Globe size={16} className="text-[#00e5ff]" />
        <h3 className="font-bold text-white text-sm">Global Attack Sources</h3>
      </div>
      
      <div className="flex-1 relative w-full h-full min-h-[200px]">
        {/* Simplified Map Background via CSS/SVG */}
        <div className="absolute inset-0 opacity-20 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <path d="M10,20 Q30,5 50,20 T90,20" fill="none" stroke="#00daf3" strokeWidth="0.5" strokeDasharray="2 2" />
            <path d="M10,50 Q30,35 50,50 T90,50" fill="none" stroke="#00daf3" strokeWidth="0.5" strokeDasharray="2 2" />
            <path d="M10,80 Q30,65 50,80 T90,80" fill="none" stroke="#00daf3" strokeWidth="0.5" strokeDasharray="2 2" />
          </svg>
        </div>

        {/* Nodes and Pulses */}
        {nodes.map(node => {
          const isActive = activeNodes.includes(node.id);
          return (
            <div 
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-[#00daf3]/40'}`} />
              {isActive && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 bg-red-500 rounded-full"
                  style={{ width: '6px', height: '6px', margin: '-3px' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
