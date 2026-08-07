import React, { useEffect, useState } from 'react';
import { ShieldCheck, Cpu, Lock, Terminal, Activity, Radar, Sparkles } from 'lucide-react';

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
      className={`fixed inset-0 z-[9999] bg-[#070913] flex flex-col items-center justify-center p-6 text-white transition-all duration-700 select-none ${
        isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic Background Cyber Grid & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-[#00e5ff]/20 via-[#6001d1]/25 to-transparent rounded-full blur-[130px] pointer-events-none animate-pulse duration-1000" />
      <div className="absolute w-[350px] h-[350px] bg-[#00daf3]/10 rounded-full blur-[90px] pointer-events-none top-1/4 left-1/4" />

      <div className="relative z-10 flex flex-col items-center max-w-lg w-full space-y-9 text-center">
        {/* Holographic Shield Portal with Orbital Rings */}
        <div className="relative flex items-center justify-center">
          {/* Rotating Outer Radar HUD Ring */}
          <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-[#00e5ff]/30 border-dashed animate-spin duration-[12s] pointer-events-none" />
          <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-t-[#00e5ff] border-r-transparent border-b-[#6001d1] border-l-transparent animate-spin duration-[6s] pointer-events-none opacity-60" />

          {/* Central Pulsing Shield Emblem */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#00e5ff]/25 via-[#0f1321] to-[#6001d1]/30 border border-[#00e5ff]/60 flex items-center justify-center shadow-[0_0_60px_rgba(0,229,255,0.4)] backdrop-blur-xl group">
            <span className="material-symbols-outlined text-[#00daf3] text-5xl sm:text-6xl drop-shadow-[0_0_15px_#00e5ff] animate-pulse">
              shield_person
            </span>
          </div>

          {/* Ambient Glow Pulse */}
          <div className="absolute inset-0 rounded-3xl border border-[#00e5ff] animate-ping opacity-20 pointer-events-none" />
        </div>

        {/* Brand & Tagline */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00daf3] text-[11px] font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <Radar size={13} className="animate-spin text-[#00daf3]" style={{ animationDuration: '4s' }} />
            <span>Autonomous Threat Protection</span>
          </div>

          <h1 
            className="font-extrabold tracking-tight text-white flex items-center justify-center gap-2.5 pt-1 whitespace-nowrap flex-nowrap leading-none select-none"
            style={{ fontSize: 'clamp(1.75rem, 6vw, 2.5rem)' }}
          >
            <span className="shrink-0">FinGuard</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00daf3] to-[#d2bbff] shrink-0">
              AI
            </span>
          </h1>
        </div>

        {/* Cyber HUD Loading Console */}
        <div className="w-full space-y-4 glass-card p-6 sm:p-7 rounded-3xl border border-[#00e5ff]/25 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          {/* Top Scan Status Line */}
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[#00daf3] font-semibold truncate pr-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00daf3] animate-ping" />
              <span>{statusText}</span>
            </span>
            <span className="text-white font-extrabold text-sm tracking-wider">{progress}%</span>
          </div>

          {/* Glowing Progress Bar */}
          <div className="relative w-full h-3 bg-[#0a0d1c] rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#00e5ff] via-[#00daf3] to-[#6001d1] rounded-full transition-all duration-200 shadow-[0_0_20px_#00e5ff] relative"
              style={{ width: `${progress}%` }}
            >
              {/* Light Flare Effect inside Bar */}
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/50 blur-sm rounded-full animate-pulse" />
            </div>
          </div>

          {/* Telemetry Status Indicators */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-mono text-[#bac9cc] border-t border-white/10">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
              <Cpu size={14} className="text-[#00daf3]" />
              <span className="truncate">Neural Core Active</span>
            </div>

            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
              <Lock size={14} className="text-emerald-400" />
              <span className="truncate">AES-256 Shield</span>
            </div>
          </div>
        </div>

        {/* Footer Security Badge */}
        <p className="text-[10px] font-mono text-[#bac9cc]/70 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Activity size={12} className="text-[#00daf3]" />
          <span>Real-time Phishing & Fraud Prevention Matrix</span>
        </p>
      </div>
    </div>
  );
};

