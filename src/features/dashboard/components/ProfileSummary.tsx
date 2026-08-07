import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { User, ShieldCheck, Lock, Terminal } from 'lucide-react';

export const ProfileSummary: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="glass-card rounded-3xl p-6 border border-[#00e5ff]/25 space-y-4 shadow-2xl">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00e5ff]/30 to-[#6001d1]/40 border border-[#00e5ff]/50 flex items-center justify-center text-[#00daf3] font-bold text-lg shrink-0">
          <User size={24} />
        </div>

        <div className="flex flex-col min-w-0">
          <span className="font-bold text-white text-base truncate">
            {user?.name || 'Security Operator'}
          </span>
          <span className="text-xs font-mono text-[#bac9cc] truncate">
            {user?.email || 'admin@finguard.ai'}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#00daf3] mt-0.5">
            <ShieldCheck size={12} />
            <span>Clearance Level 5 • Zero-Trust Auth</span>
          </span>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-[#0a0d1a] border border-white/10 grid grid-cols-2 gap-2 text-center text-[11px] font-mono">
        <div className="p-2 rounded-xl bg-white/5 border border-white/5">
          <span className="text-[#bac9cc] block">Active Session</span>
          <span className="text-emerald-400 font-bold">ENCRYPTED</span>
        </div>
        <div className="p-2 rounded-xl bg-white/5 border border-white/5">
          <span className="text-[#bac9cc] block">Gateway Mode</span>
          <span className="text-[#00daf3] font-bold">FastAPI Direct</span>
        </div>
      </div>
    </div>
  );
};
