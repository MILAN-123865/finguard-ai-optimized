import React, { useEffect, useState } from 'react';
import { Cpu, Lock, Activity, Radar } from 'lucide-react';

interface InitialSplashScreenProps {
  onFinish: () => void;
}

export const InitialSplashScreen: React.FC<InitialSplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing FinGuard Threat Matrix...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 14) + 6;
        return next > 100 ? 100 : next;
      });
    }, 110);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 20) {
      setStatusText('Booting Neural Shield Subsystems...');
    } else if (progress < 45) {
      setStatusText('Connecting Global Cyber Intelligence Nodes...');
    } else if (progress < 70) {
      setStatusText('Loading Zero-Day Anti-Phishing Heuristics...');
    } else if (progress < 90) {
      setStatusText('Synchronizing Cryptographic Vault & Telemetry...');
    } else if (progress < 100) {
      setStatusText('Verifying System Integrity...');
    } else {
      setStatusText('FinGuard AI Armed & Operational');
      const fadeTimeout = setTimeout(() => {
        setIsFading(true);
      }, 450);

      const finishTimeout = setTimeout(() => {
        onFinish();
      }, 950);

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(finishTimeout);
      };
    }
  }, [progress, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#FCFCFD] flex flex-col items-center justify-center p-6 text-[#111827] transition-all duration-700 select-none ${
        isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic Background Cyber Grid & Soft Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#22D3EE_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.12] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-[#22D3EE]/15 via-[#A78BFA]/15 to-transparent rounded-full blur-[130px] pointer-events-none animate-pulse duration-1000" />
      <div className="absolute w-[350px] h-[350px] bg-[#60A5FA]/10 rounded-full blur-[90px] pointer-events-none top-1/4 left-1/4" />

      <div className="relative z-10 flex flex-col items-center max-w-lg w-full space-y-9 text-center">
        {/* Holographic Shield Portal with Orbital Rings */}
        <div className="relative flex items-center justify-center">
          {/* Rotating Outer Radar HUD Ring */}
          <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-[#22D3EE]/25 border-dashed animate-spin duration-[12s] pointer-events-none" />
          <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-t-[#22D3EE]/40 border-r-transparent border-b-[#A78BFA]/40 border-l-transparent animate-spin duration-[6s] pointer-events-none opacity-60" />

          {/* Central Pulsing Shield Emblem */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#22D3EE]/15 via-white to-[#A78BFA]/15 border border-[#22D3EE]/30 flex items-center justify-center shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl group">
            <span className="material-symbols-outlined text-[#11875D] text-5xl sm:text-6xl drop-shadow-[0_0_10px_rgba(34,211,238,0.3)] animate-pulse">
              shield_person
            </span>
          </div>

          {/* Ambient Glow Pulse */}
          <div className="absolute inset-0 rounded-3xl border border-[#22D3EE]/30 animate-ping opacity-20 pointer-events-none" />
        </div>

        {/* Brand & Tagline */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/25 text-[#11875D] text-[11px] font-mono uppercase tracking-widest shadow-2xs">
            <Radar size={13} className="animate-spin text-[#11875D]" style={{ animationDuration: '4s' }} />
            <span>Autonomous Threat Protection</span>
          </div>

          <h1 
            className="font-extrabold tracking-tight text-[#111827] flex items-center justify-center gap-2.5 pt-1 whitespace-nowrap flex-nowrap leading-none select-none"
            style={{ fontSize: 'clamp(1.75rem, 6vw, 2.5rem)' }}
          >
            <span className="shrink-0">FinGuard</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#11875D] via-[#22D3EE] to-[#A78BFA] shrink-0">
              AI
            </span>
          </h1>
        </div>

        {/* Cyber HUD Loading Console */}
        <div className="w-full space-y-4 bg-white/90 p-6 sm:p-7 rounded-3xl border border-[#E4E7E5] shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-2xl relative overflow-hidden">
          {/* Top Scan Status Line */}
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[#11875D] font-semibold truncate pr-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#11875D] animate-ping" />
              <span>{statusText}</span>
            </span>
            <span className="text-[#111827] font-extrabold text-sm tracking-wider">{progress}%</span>
          </div>

          {/* Glowing Progress Bar */}
          <div className="relative w-full h-3 bg-[#F8FAFC] rounded-full overflow-hidden p-0.5 border border-[#E4E7E5] shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#22D3EE] via-[#60A5FA] to-[#A78BFA] rounded-full transition-all duration-200 shadow-[0_0_12px_rgba(34,211,238,0.25)] relative"
              style={{ width: `${progress}%` }}
            >
              {/* Light Flare Effect inside Bar */}
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/60 blur-sm rounded-full animate-pulse" />
            </div>
          </div>

          {/* Telemetry Status Indicators */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-mono text-[#64748B] border-t border-[#E4E7E5]">
            <div className="flex items-center gap-2 bg-[#F8FAFC] px-3 py-1.5 rounded-xl border border-[#E4E7E5]">
              <Cpu size={14} className="text-[#11875D]" />
              <span className="truncate">Neural Core Active</span>
            </div>

            <div className="flex items-center gap-2 bg-[#F8FAFC] px-3 py-1.5 rounded-xl border border-[#E4E7E5]">
              <Lock size={14} className="text-[#10B981]" />
              <span className="truncate">AES-256 Shield</span>
            </div>
          </div>
        </div>

        {/* Footer Security Badge */}
        <p className="text-[10px] font-mono text-[#64748B]/70 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Activity size={12} className="text-[#11875D]" />
          <span>Real-time Phishing & Fraud Prevention Matrix</span>
        </p>
      </div>
    </div>
  );
};
