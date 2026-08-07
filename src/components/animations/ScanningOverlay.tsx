import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Cpu, Sparkles, Binary, CheckCircle2, Radar, Terminal, Activity, Lock, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface ScanStageItem {
  text: string;
  sub?: string;
  prog?: number;
}

interface ScanningOverlayProps {
  statusText?: string;
  scanType?: string;
  className?: string;
  compact?: boolean;
  currentStepIndex?: number;
  stages?: ScanStageItem[];
  payloadPreview?: string;
}

export const ScanningOverlay: React.FC<ScanningOverlayProps> = ({
  statusText,
  scanType = 'Input',
  className = '',
  compact = false,
  currentStepIndex = 0,
  stages,
  payloadPreview,
}) => {
  const { t } = useTranslation();
  const [elapsedMs, setElapsedMs] = useState(0);

  const defaultStages: ScanStageItem[] = [
    { text: t('scanner.stage1', 'Receiving Message Payload'), sub: t('scanner.stage1sub', 'Establishing secure ingestion buffer...') },
    { text: t('scanner.stage2', 'Keyword & Heuristic Detection'), sub: t('scanner.stage2sub', 'Running semantic vulnerability mapping...') },
    { text: t('scanner.stage3', 'Gemini Neural Threat Analysis'), sub: t('scanner.stage3sub', 'Cross-referencing global threat databases...') },
    { text: t('scanner.stage4', 'Multi-Vector Risk Scoring'), sub: t('scanner.stage4sub', 'Finalizing probabilistic risk metrics...') },
  ];

  const activeStages = stages && stages.length > 0 ? stages : defaultStages;
  const currentStage = activeStages[currentStepIndex] || activeStages[0];
  const activeStatusText = statusText || currentStage.text;

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedMs((prev) => prev + 45);
    }, 45);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className={`absolute inset-0 z-30 rounded-2xl overflow-hidden bg-[#050711]/90 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 border border-[#00e5ff]/50 shadow-[inset_0_0_40px_rgba(0,229,255,0.2)] ${className}`}
    >
      {/* Sci-Fi Grid Background Pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Rotating Cyber Radar Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="w-80 h-80 rounded-full border border-[#00e5ff] border-dashed"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="w-56 h-56 rounded-full border border-[#d2bbff] border-dotted"
        />
      </div>

      {/* Sweeping Laser Scan Line */}
      <motion.div
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent shadow-[0_0_20px_#00e5ff,0_0_35px_#00e5ff] pointer-events-none z-20"
        initial={{ top: '0%' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          ease: 'easeInOut',
        }}
      >
        <div className="w-full h-10 bg-gradient-to-b from-[#00e5ff]/25 to-transparent pointer-events-none" />
      </motion.div>

      {/* Cyber Corner Reticles */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#00e5ff] pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#00e5ff] pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#00e5ff] pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#00e5ff] pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-20 w-full flex items-center justify-between text-[11px] font-mono text-[#00e5ff] border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <Radar size={14} className="animate-spin text-[#00e5ff]" />
          <span className="font-bold tracking-wider uppercase">AI NEURAL SCAN // {scanType}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#bac9cc] hidden sm:inline">LATENCY: <strong className="text-white">{elapsedMs}ms</strong></span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] font-bold">
            <Activity size={12} className="animate-pulse" /> ACTIVE
          </span>
        </div>
      </div>

      {/* Center AI Scanning Display */}
      <div className="relative z-20 flex flex-col items-center gap-3 my-auto w-full max-w-md text-center">
        {/* Pulsing Core */}
        <div className="relative flex items-center justify-center my-1">
          <motion.div
            className="absolute w-20 h-20 rounded-full border border-[#00e5ff]/50"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute w-28 h-28 rounded-full border border-[#6001d1]/40"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut', delay: 0.2 }}
          />

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00e5ff]/25 via-[#00daf3]/20 to-[#6001d1]/40 border border-[#00e5ff] flex items-center justify-center text-[#00e5ff] shadow-[0_0_30px_rgba(0,229,255,0.4)]">
            <Cpu size={26} className="animate-pulse text-[#00e5ff]" />
          </div>
        </div>

        {/* Status Text & Current Subtitle */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2 text-[#00e5ff] font-mono font-bold text-xs sm:text-sm tracking-wide uppercase">
            <Sparkles size={16} className="animate-spin text-[#00e5ff]" style={{ animationDuration: '3s' }} />
            <span>{activeStatusText}</span>
          </div>
          {currentStage.sub && (
            <p className="text-[11px] font-mono text-[#bac9cc] line-clamp-1">
              {currentStage.sub}
            </p>
          )}
        </div>

        {/* Truncated Target Content HUD (Optional) */}
        {payloadPreview && (
          <div className="w-full bg-[#090d1f]/80 border border-white/10 rounded-xl p-2.5 text-left font-mono text-[11px] text-[#00e5ff]/90 flex items-center gap-2 truncate">
            <Terminal size={14} className="text-[#00e5ff] shrink-0" />
            <span className="text-[#bac9cc] shrink-0">TARGET:</span>
            <span className="truncate text-white font-semibold">{payloadPreview}</span>
          </div>
        )}

        {/* Stage Progress Pills */}
        {!compact && (
          <div className="w-full grid grid-cols-4 gap-1.5 pt-2">
            {activeStages.map((stg, idx) => {
              const isDone = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div
                  key={idx}
                  className={`p-1.5 rounded-lg border text-center transition-all ${
                    isDone
                      ? 'bg-[#00e5ff]/20 border-[#00e5ff]/60 text-[#00e5ff]'
                      : isCurrent
                      ? 'bg-gradient-to-r from-[#00e5ff]/30 to-[#6001d1]/30 border-[#00e5ff] text-white shadow-[0_0_12px_rgba(0,229,255,0.3)] animate-pulse'
                      : 'bg-white/5 border-white/10 text-white/30'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 text-[10px] font-mono font-bold">
                    {isDone ? (
                      <CheckCircle2 size={12} className="text-[#00e5ff]" />
                    ) : (
                      <span>0{idx + 1}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dynamic Progress Bar */}
        <div className="w-full space-y-1 mt-1">
          <div className="flex justify-between items-center text-[10px] font-mono text-[#00e5ff]">
            <span className="font-semibold uppercase tracking-wider">Analysis Progress</span>
            <span className="font-bold">{Math.min(100, Math.round(((currentStepIndex + 1) / activeStages.length) * 100))}%</span>
          </div>
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden border border-[#00e5ff]/40 relative shadow-[0_0_10px_rgba(0,229,255,0.2)]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00e5ff] via-[#41e3fe] to-[#a855f7] shadow-[0_0_15px_#00e5ff]"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(100, Math.max(15, ((currentStepIndex + 1) / activeStages.length) * 100))}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-20 w-full flex items-center justify-between text-[10px] font-mono text-[#bac9cc] border-t border-white/10 pt-2">
        <span className="flex items-center gap-1 text-[#00e5ff]">
          <Lock size={12} /> SECURE NEURAL PIPE
        </span>
        <span className="hidden sm:inline">ENGINE: GEMINI-3.6-FLASH</span>
        <span>HASH: {Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
      </div>
    </motion.div>
  );
};

