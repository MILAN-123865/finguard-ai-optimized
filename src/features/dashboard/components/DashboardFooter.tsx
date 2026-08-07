import React from 'react';
import { ShieldCheck, Cpu, Lock } from 'lucide-react';

export const DashboardFooter: React.FC = () => {
  return (
    <footer className="mt-12 py-6 border-t border-white/10 text-xs font-mono text-[#bac9cc] flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <ShieldCheck size={16} className="text-[#00daf3]" />
        <span>FinGuard AI Autonomous SOC Command Center v2.5.0</span>
      </div>

      <div className="flex items-center gap-4 text-[11px]">
        <span className="flex items-center gap-1 text-emerald-400">
          <Lock size={12} />
          <span>AES-256 Encrypted Stream</span>
        </span>
        <span>•</span>
        <span>Ready for FastAPI backend integration</span>
      </div>
    </footer>
  );
};
