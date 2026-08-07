import React from 'react';
import { ShieldCheck, ShieldAlert, Cpu, Activity, ArrowUpRight } from 'lucide-react';
import { DashboardSummary } from '../services/dashboardService';

interface SecurityOverviewProps {
  summary: DashboardSummary | null;
}

export const SecurityOverview: React.FC<SecurityOverviewProps> = ({ summary }) => {
  const score = summary?.securityScore || 92;
  const rating = summary?.securityRating || 'EXCELLENT PROTECTION';
  const totalScans = summary?.totalScansToday || 1482;
  const threats = summary?.threatsNeutralizedToday || 124;
  const safe = summary?.safeMessagesToday || 1358;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#00e5ff]/30 relative overflow-hidden bg-gradient-to-br from-[#0a0d1a] via-[#12172b] to-[#1a0f2e] shadow-2xl group">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00e5ff]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00e5ff]/20 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6001d1]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Score Badge & Rating */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00daf3] text-xs font-mono uppercase tracking-wider">
            <ShieldCheck size={15} />
            <span>AI Cyber Defense Matrix</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-5xl sm:text-6xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-white via-[#c3f5ff] to-[#00daf3]">
              {score}%
            </span>
            <div className="flex flex-col text-left">
              <span className="text-xs font-mono text-[#00daf3] uppercase font-bold tracking-widest">
                Overall Health
              </span>
              <span className="text-sm font-bold text-emerald-400">
                {rating}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#bac9cc] max-w-md">
            FinGuard AI is actively inspecting incoming SMS, WhatsApp lures, and URL vectors in real time. Zero critical breaches reported in the past 24 hours.
          </p>

          <div className="w-full max-w-md space-y-1.5 pt-2">
            <div className="flex justify-between text-[11px] font-mono text-[#bac9cc]">
              <span>System Integrity Score</span>
              <span className="text-[#00daf3] font-bold">{score}/100</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-[#00e5ff] via-[#00daf3] to-[#6001d1] rounded-full shadow-[0_0_10px_#00e5ff]"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Today's Threat Summary Bento Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Today's Scans */}
          <div className="p-5 rounded-2xl bg-[#0a0d1a]/80 border border-white/10 hover:border-[#00e5ff]/40 transition-all">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-mono text-[#bac9cc] uppercase">
                Scans Today
              </span>
              <div className="p-2 rounded-xl bg-[#00e5ff]/10 text-[#00daf3]">
                <Cpu size={18} />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
              {totalScans.toLocaleString()}
            </p>
            <span className="text-[10px] text-[#00daf3] font-mono flex items-center gap-1 mt-2">
              <ArrowUpRight size={12} />
              <span>+18.4% vs Yesterday</span>
            </span>
          </div>

          {/* Neutralized Threats */}
          <div className="p-5 rounded-2xl bg-[#0a0d1a]/80 border border-red-500/30 hover:border-red-500/60 transition-all">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-mono text-red-400 uppercase">
                Threats Neutralized
              </span>
              <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
                <ShieldAlert size={18} />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
              {threats.toLocaleString()}
            </p>
            <span className="text-[10px] text-red-400 font-mono flex items-center gap-1 mt-2">
              <span>100% Intercepted</span>
            </span>
          </div>

          {/* Verified Safe */}
          <div className="p-5 rounded-2xl bg-[#0a0d1a]/80 border border-emerald-500/30 hover:border-emerald-500/60 transition-all">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-mono text-emerald-400 uppercase">
                Verified Safe
              </span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck size={18} />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
              {safe.toLocaleString()}
            </p>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-2">
              <span>Clean Messages</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
