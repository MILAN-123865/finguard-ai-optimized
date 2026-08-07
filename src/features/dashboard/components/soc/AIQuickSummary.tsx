import React, { useState } from 'react';
import { 
  Sparkles, RefreshCw, Copy, Check, FileText, ShieldAlert, ShieldCheck, 
  TrendingUp, Zap, ChevronUp, ChevronDown, Bot, Lock, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIQuickSummaryProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const AIQuickSummary: React.FC<AIQuickSummaryProps> = ({ isOpen, onClose }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Just now');

  const summaryContent = {
    postureScore: 88,
    statusLevel: 'ELEVATED DEFENSE (DEFCON 3)',
    overview: `Over the past 24 hours, the AI Security Gateway analyzed 1,248 telemetry feeds across web, email, SMS, and messaging vectors. Overall posture remains Elevated due to a spike in financial smishing and targeted brand impersonations. Automated sandbox quarantine neutralized 96.8% of malicious payloads with zero critical breaches reported.`,
    highlights: [
      {
        title: 'Primary Vector Spike',
        desc: 'Sharp rise in Chase & USPS credential harvesting lures targeting mobile users.',
        tag: 'Phishing / Smishing',
        color: 'text-rose-400 border-rose-500/30 bg-rose-500/10'
      },
      {
        title: 'Neural Sandbox Defense',
        desc: '412 zero-day obfuscated scripts isolated before inbox delivery.',
        tag: 'Auto-Mitigated',
        color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
      },
      {
        title: 'Geographic Proxy Anomaly',
        desc: 'Increased automated brute-force attempts routing via high-reputation commercial VPN nodes.',
        tag: 'Anomaly Detected',
        color: 'text-amber-400 border-amber-500/30 bg-amber-500/10'
      }
    ],
    aiRecommendation: `Enforce mandatory FIDO2 hardware key verification for SOC administrative endpoints and deploy strict domain-squatting monitoring across primary organizational domains.`
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated('Just now');
    }, 1200);
  };

  const handleCopy = () => {
    const textToCopy = `[AI SECURITY POSTURE BRIEF]\nPosture: ${summaryContent.statusLevel} (${summaryContent.postureScore}/100)\n\nExecutive Overview:\n${summaryContent.overview}\n\nAI Recommendation:\n${summaryContent.aiRecommendation}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0, y: -10 }}
        animate={{ opacity: 1, height: 'auto', y: 0 }}
        exit={{ opacity: 0, height: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden mb-6"
      >
        <div className="bg-gradient-to-b from-[#080d26]/95 to-[#040718]/95 border border-[#00e5ff]/40 rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(0,229,255,0.15)] backdrop-blur-xl relative">
          {/* Top Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#00e5ff]/20 to-[#6001d1]/30 border border-[#00e5ff]/40 text-[#00daf3] shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                <Bot size={22} className="animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">
                    AI Posture Summary
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={11} /> Gemini 3.6 Synthesis
                  </span>
                </div>
                <p className="text-xs font-mono text-[#bac9cc] mt-0.5">
                  Natural language security posture report • Updated {lastUpdated}
                </p>
              </div>
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
                <ShieldCheck size={14} /> Score: {summaryContent.postureScore}/100
              </span>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 rounded-xl bg-white/5 hover:bg-[#00e5ff]/20 text-[#00daf3] border border-white/10 hover:border-[#00e5ff]/40 transition-all text-xs font-mono font-bold flex items-center gap-1.5"
                title="Re-analyze security posture"
              >
                <RefreshCw size={14} className={isRefreshing ? 'animate-spin text-[#00e5ff]' : ''} />
                <span className="hidden md:inline">{isRefreshing ? 'Analyzing...' : 'Re-analyze'}</span>
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#bac9cc] hover:text-white border border-white/10 transition-colors"
                  title="Hide summary"
                >
                  <ChevronUp size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Natural Language Executive Overview */}
          <div className="mt-4 space-y-4 font-mono">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-[#00e5ff]/10 text-[#00e5ff] text-[10px] font-bold rounded-bl-xl border-l border-b border-[#00e5ff]/30">
                AI EXECUTIVE NARRATIVE
              </div>

              <p className="text-sm font-sans text-white/90 leading-relaxed font-normal pt-1">
                {summaryContent.overview}
              </p>
            </div>

            {/* Key AI Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {summaryContent.highlights.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1.5 relative group hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${item.color}`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[#bac9cc] font-sans leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* AI Recommendation Box */}
            <div className="p-3.5 rounded-2xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Zap size={18} className="text-[#00e5ff] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-[#00e5ff] uppercase tracking-wider block">
                    Strategic AI Recommendation
                  </span>
                  <p className="text-xs text-white/90 font-sans mt-0.5">
                    {summaryContent.aiRecommendation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all text-xs font-bold flex items-center gap-1.5"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy Brief'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
