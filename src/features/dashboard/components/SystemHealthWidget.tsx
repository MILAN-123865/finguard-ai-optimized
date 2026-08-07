import React from 'react';
import { Activity, Server, Database, Wifi } from 'lucide-react';
import { motion } from 'motion/react';

export const SystemHealthWidget: React.FC = () => {
  const metrics = [
    { label: 'Neural Gateway', status: 'Online', value: '99.9%', icon: Server, color: 'text-[#00daf3]' },
    { label: 'Threat DB Sync', status: 'Active', value: 'Syncing', icon: Database, color: 'text-[#d2bbff]' },
    { label: 'API Latency', status: 'Optimal', value: '24ms', icon: Wifi, color: 'text-emerald-400' },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/10 h-full shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Activity size={18} className="text-[#00daf3]" />
          System Health
        </h3>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase">All Systems Nominal</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg bg-white/5 ${metric.color}`}>
                  <Icon size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{metric.label}</h4>
                  <p className="text-[10px] text-[#bac9cc] font-mono">{metric.status}</p>
                </div>
              </div>
              <span className={`text-xs font-bold font-mono ${metric.color}`}>
                {metric.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
