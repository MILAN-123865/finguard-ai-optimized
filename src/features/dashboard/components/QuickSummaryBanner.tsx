import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShieldCheck, ShieldAlert, Cpu, RefreshCw, ChevronDown, ChevronUp, Bot, CheckCircle2, AlertTriangle, ArrowRight, FileText } from 'lucide-react';

interface QuickSummaryBannerProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const QuickSummaryBanner: React.FC<QuickSummaryBannerProps> = ({
  isOpen: propIsOpen,
  onToggle: propOnToggle,
}) => {
  const [localIsOpen, setLocalIsOpen] = useState(true);
  const isOpen = propIsOpen !== undefined ? propIsOpen : localIsOpen;

  const handleToggle = () => {
    if (propOnToggle) {
      propOnToggle();
    } else {
      setLocalIsOpen(!localIsOpen);
    }
  };

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Just now');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated('Just now');
    }, 1200);
  };

  return (
    <div className="glass-card rounded-2xl border border-[#00e5ff]/30 bg-gradient-to-r from-[#05091b]/95 via-[#08102a]/95 to-[#0a1535]/95 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(0,229,255,0.1)] overflow-hidden font-mono">
      {/* Banner Header Bar with Toggle */}
      <div 
        onClick={handleToggle}
        className="p-4 sm:px-6 flex items-center justify-between cursor-pointer select-none border-b border-white/10 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00e5ff]/20 to-[#6001d1]/30 border border-[#00e5ff]/50 flex items-center justify-center text-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.3)]">
            <Sparkles size={18} className="animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white">
                AI Threat Intelligence Briefing
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                Live Posture: Moderate-High
              </span>
            </div>
            <p className="text-xs text-[#bac9cc] mt-0.5 hidden sm:block">
              Natural language AI summary of system threats, vector shifts, and neutralization metrics
            </p>
          </div>
        </div>

        {/* Toggle Switch & Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isOpen
                ? 'bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff]/50 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                : 'bg-white/5 text-[#bac9cc] border-white/10 hover:text-white'
            }`}
          >
            <Bot size={14} />
            <span>{isOpen ? 'Quick Summary ON' : 'Quick Summary OFF'}</span>
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Expandable Natural Language Summary Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="p-4 sm:p-6 space-y-4 text-xs">
              {/* Posture Executive Statement */}
              <div className="bg-black/40 border border-[#00e5ff]/20 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e5ff]/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-[#00e5ff] font-bold">
                    <Cpu size={15} />
                    <span>Executive AI Executive Security Posture Assessment</span>
                  </div>
                  <span className="text-[11px] text-[#bac9cc]">Updated {lastUpdated}</span>
                </div>

                <p className="text-[#dfe1f6] text-xs sm:text-sm leading-relaxed font-sans">
                  The organizational security posture is currently <strong className="text-amber-400">ELEVATED (Risk Score: 42/100)</strong> over the past 24 hours. The AI Threat Engine has processed <strong className="text-[#00e5ff]">1,840 payload telemetry points</strong>, intercepting <strong className="text-rose-400">142 credential harvesting attempts</strong> and <strong className="text-amber-400">89 smishing vectors</strong>. Automatic quarantine models successfully neutralized <strong>98.4%</strong> of high-risk threats before end-user exposure.
                </p>
              </div>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Highlight 1 */}
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                    <ShieldAlert size={14} />
                    <span>Top Threat Vector</span>
                  </div>
                  <p className="text-white text-xs font-semibold">Banking Login Phishing (42%)</p>
                  <p className="text-[#bac9cc] text-[11px] font-sans leading-snug">
                    Surge in fake Chase & Wells Fargo mobile login links targeting OTP SMS codes.
                  </p>
                </div>

                {/* Highlight 2 */}
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                    <AlertTriangle size={14} />
                    <span>Smishing Wave</span>
                  </div>
                  <p className="text-white text-xs font-semibold">USPS & Carrier Impersonation</p>
                  <p className="text-[#bac9cc] text-[11px] font-sans leading-snug">
                    31% of incoming SMS payloads utilize shortened Bit.ly links demanding address verification.
                  </p>
                </div>

                {/* Highlight 3 */}
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <ShieldCheck size={14} />
                    <span>Defense Efficacy</span>
                  </div>
                  <p className="text-white text-xs font-semibold">98.4% Auto-Neutralization</p>
                  <p className="text-[#bac9cc] text-[11px] font-sans leading-snug">
                    Zero high-severity credential exposures reported across verified endpoints today.
                  </p>
                </div>
              </div>

              {/* AI Recommendations Action List */}
              <div className="bg-[#00e5ff]/5 border border-[#00e5ff]/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[#00e5ff] font-bold text-xs uppercase tracking-wider block">
                    AI Recommended Security Actions
                  </span>
                  <ul className="text-white/90 text-xs font-sans space-y-1 list-disc list-inside">
                    <li>Maintain DNS sinkhole rules for newly registered financial TLDs.</li>
                    <li>Push smishing warning banner to mobile endpoints receiving shortened URLs.</li>
                  </ul>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all text-xs font-bold flex items-center gap-1.5"
                  >
                    <RefreshCw size={13} className={isRefreshing ? 'animate-spin' : ''} />
                    <span>{isRefreshing ? 'Re-analyzing...' : 'Refresh AI Summary'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
