import React from 'react';
import { Activity, ShieldCheck, Cpu, Zap, Wifi } from 'lucide-react';

export const DashboardNavbar: React.FC = () => {
  return (
    <div className="glass-card rounded-xl p-3 border border-white/10 mb-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#bac9cc]">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <Wifi size={14} className="animate-pulse" />
          <span>SOC GATEWAY: ONLINE</span>
        </span>
        <span className="hidden sm:flex items-center gap-1.5 text-[#00daf3]">
          <Cpu size={14} />
          <span>Gemini Neural Cluster: Active</span>
        </span>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <span className="flex items-center gap-1.5 text-[#d2bbff]">
          <Zap size={14} />
          <span>Latency: 4.2ms</span>
        </span>
        <span className="flex items-center gap-1.5 text-white font-bold">
          <ShieldCheck size={14} className="text-[#00daf3]" />
          <span>Zero-Trust Enforced</span>
        </span>
      </div>
    </div>
  );
};
