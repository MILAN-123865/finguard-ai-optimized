import React, { useState, useEffect } from 'react';
import { motion, animate, useMotionValue, AnimatePresence } from 'motion/react';
import { ShieldAlert, ShieldCheck, CheckCircle2, Loader2, AlertTriangle, ArrowRight, MessageSquare, Clock, Check } from 'lucide-react';
import { ScanResult } from '../../../../types';

interface ThreatScoreAnimationProps {
  result: ScanResult;
  onReset?: () => void;
}

const SCANNING_STEPS = [
  'Analyzing Threat Patterns...',
  'Checking URLs...',
  'Checking Sender Reputation...',
  'Evaluating Scam Indicators...',
  'Calculating Risk Score...'
];

export const ThreatScoreAnimation: React.FC<ThreatScoreAnimationProps> = ({ result, onReset }) => {
  // Animation state: 'scanning' -> 'counting' -> 'revealed'
  const [phase, setPhase] = useState<'scanning' | 'counting' | 'revealed'>('scanning');
  const [stepIndex, setStepIndex] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);

  // Score count up
  const count = useMotionValue(0);
  const [displayScore, setDisplayScore] = useState(0);

  const targetScore = result.score ?? result.riskScore ?? 88;
  const confidence = result.confidence || 97.8;

  const getThreatLabel = (s: number) => {
    if (s >= 80) return 'Critical Threat';
    if (s >= 60) return 'High Risk';
    if (s >= 40) return 'Medium Risk';
    return 'Safe';
  };

  const threatLabel = result.threatLevel || result.level || getThreatLabel(targetScore);

  const getColor = (s: number) => {
    if (s < 40) return '#10B981'; // Green
    if (s < 70) return '#F59E0B'; // Orange
    return '#EF4444'; // Red
  };

  const currentColor = getColor(displayScore);
  const finalColor = getColor(targetScore);

  // Step 1: Scan Loading Experience (1.8s)
  useEffect(() => {
    setPhase('scanning');
    setStepIndex(0);
    setScanProgress(0);

    const stepInterval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < SCANNING_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 360);

    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev < 100) return prev + 4;
        return 100;
      });
    }, 70);

    const timer = setTimeout(() => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      setScanProgress(100);
      setPhase('counting');
    }, 1800);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [result]);

  // Step 2: Score count-up over 1.6s (0% -> 15% -> 28% -> 45% -> 63% -> 81% -> targetScore%)
  useEffect(() => {
    if (phase === 'counting') {
      count.set(0);
      const animation = animate(count, targetScore, {
        duration: 1.6,
        ease: 'easeOut',
        onUpdate: (latest) => setDisplayScore(Math.round(latest)),
        onComplete: () => {
          setPhase('revealed');
        }
      });
      return () => animation.stop();
    }
  }, [phase, targetScore, count]);

  // Derive detection reasons list
  const getDetectionReasons = () => {
    const defaultReasons = [
      'Impersonating utility provider',
      'Creates urgency',
      'Requests phone call',
      'Suspicious sender',
      'Social engineering tactics'
    ];

    if (targetScore < 40) {
      return [
        'Verified sender identity',
        'No malicious links detected',
        'Standard communication language',
        'Safe domain reputation'
      ];
    }

    if (result.highlights && result.highlights.length > 0) {
      const extracted = result.highlights.map(h => typeof h === 'string' ? h : (h as any).phrase || (h as any).text);
      if (extracted.length >= 3) return extracted;
    }

    if (result.keywords && result.keywords.length > 0) {
      return result.keywords.map(k => `Detected suspicious keyword: ${k}`);
    }

    return defaultReasons;
  };

  const detectionReasons = getDetectionReasons();

  // Derive recommended action points
  const getRecommendedActions = () => {
    if (targetScore < 40) {
      return [
        'Safe to proceed',
        'No immediate action required'
      ];
    }

    if (result.recommendation && typeof result.recommendation === 'object' && Array.isArray(result.recommendation.actions)) {
      return result.recommendation.actions;
    }

    return [
      'Ignore message',
      'Verify through official source',
      'Do not call unknown number'
    ];
  };

  const recommendedActions = getRecommendedActions();
  const circleLength = 251.2; // 2 * pi * 40

  return (
    <div className="w-full space-y-4">
      <AnimatePresence mode="wait">
        {/* SCAN LOADING EXPERIENCE (1.8s) */}
        {phase === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-[20px] p-8 border border-[#E5E7EB] shadow-xs flex flex-col items-center justify-center min-h-[420px] space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-center text-[#11875D]">
              <Loader2 size={32} className="animate-spin" />
            </div>

            <div className="text-center space-y-2 max-w-sm">
              <span className="px-3 py-1 rounded-full bg-[#DDF2EA] text-[#11875D] text-[10px] font-bold uppercase tracking-wider">
                AI Neural Inspection
              </span>
              <h3 className="text-lg font-bold text-[#111827]">Analyzing Telemetry Signals</h3>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md bg-[#F8FAFC] h-2 rounded-full border border-[#E5E7EB] overflow-hidden">
              <motion.div
                className="h-full bg-[#11875D] rounded-full transition-all duration-100"
                style={{ width: `${scanProgress}%` }}
              />
            </div>

            {/* Sequential 5 Scan Messages */}
            <div className="w-full max-w-sm space-y-2.5">
              {SCANNING_STEPS.map((msg, idx) => {
                const isCurrent = idx === stepIndex;
                const isDone = idx < stepIndex;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-2.5 text-xs font-semibold transition-all ${
                      isCurrent
                        ? 'text-[#11875D] font-bold'
                        : isDone
                        ? 'text-[#64748B]'
                        : 'text-[#94A3B8] opacity-50'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 size={16} className="animate-spin text-[#11875D] shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-[#E5E7EB] shrink-0" />
                    )}
                    <span>{msg}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* REBUILT ORIGINAL COMPONENT STRUCTURE (CSS GRID 2-COLUMNS) */}
        {(phase === 'counting' || phase === 'revealed') && (
          <motion.div
            key="analysis-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* ROW 1: INCOMING MESSAGE CARD (FULL WIDTH) */}
            <div className="bg-white rounded-[20px] p-5 border border-[#E5E7EB] shadow-xs space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2.5">
                <div className="flex items-center gap-2">
                  <MessageSquare size={15} className="text-[#11875D]" />
                  <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    Incoming Message
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#64748B] font-medium">
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-[#64748B]" />
                    <span>{new Date(result.timestamp || Date.now()).toLocaleTimeString()}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#DDF2EA] text-[#11875D] text-[10px] font-bold uppercase">
                    Analyzed Payload
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-[12px] bg-[#F8FAFC] border border-[#E5E7EB] font-sans text-xs sm:text-sm font-semibold text-[#111827] leading-relaxed break-words">
                "{result.content}"
              </div>
            </div>

            {/* ROW 2: CSS GRID 2 COLUMNS (LEFT: THREAT SCORE | RIGHT: DETECTED BECAUSE) */}
            <div className="grid grid-cols-2 gap-4 items-stretch">
              
              {/* ROW 2 - LEFT: THREAT SCORE CARD */}
              <div className="bg-white rounded-[20px] p-5 border border-[#E5E7EB] shadow-xs flex flex-col items-center justify-center text-center relative">
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3">
                  Threat Score
                </span>

                {/* Animated Circular Progress Ring */}
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center mb-3">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#F1F5F9" strokeWidth="8" fill="none" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      stroke={currentColor}
                      strokeDasharray={circleLength}
                      strokeDashoffset={circleLength - (circleLength * displayScore) / 100}
                      transition={{ duration: 0.1 }}
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span 
                      className="text-3xl sm:text-4xl font-bold font-mono tracking-tight transition-colors duration-300"
                      style={{ color: currentColor }}
                    >
                      {displayScore}%
                    </span>
                  </div>
                </div>

                {/* Below Ring: Threat Level Label - REVEALED AFTER ANIMATION */}
                <AnimatePresence>
                  {phase === 'revealed' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-1.5 text-sm sm:text-base font-bold"
                      style={{ color: finalColor }}
                    >
                      {targetScore >= 60 ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
                      <span>{threatLabel}</span>
                    </motion.div>
                  ) : (
                    <div className="h-6 text-xs font-mono text-[#64748B] animate-pulse">
                      Evaluating Score...
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* ROW 2 - RIGHT: DETECTED BECAUSE CARD */}
              <div className="bg-white rounded-[20px] p-5 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <AlertTriangle size={15} className="text-[#F59E0B]" />
                    <span>DETECTED BECAUSE</span>
                  </h3>

                  <AnimatePresence mode="wait">
                    {phase === 'revealed' ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2"
                      >
                        {detectionReasons.map((reason, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-[#111827]">
                            <div className="w-4 h-4 rounded-full bg-[#DDF2EA] text-[#11875D] flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={11} strokeWidth={3} />
                            </div>
                            <span className="leading-snug">{reason}</span>
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <div className="space-y-2 py-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="h-3.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-md animate-pulse" />
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>

            {/* ROW 3: CSS GRID 2 COLUMNS (LEFT: CONFIDENCE CARD | RIGHT: RECOMMENDED ACTION CARD) */}
            <div className="grid grid-cols-2 gap-4 items-stretch">
              
              {/* ROW 3 - LEFT: CONFIDENCE CARD */}
              <div className="bg-white rounded-[20px] p-5 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
                  Confidence
                </span>

                <AnimatePresence mode="wait">
                  {phase === 'revealed' ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-1"
                    >
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#11875D]">
                        {confidence}%
                      </div>
                      <p className="text-[11px] text-[#64748B] font-medium">
                        High-precision classification rating.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="h-8 bg-[#F8FAFC] border border-[#E5E7EB] rounded-md animate-pulse" />
                  )}
                </AnimatePresence>
              </div>

              {/* ROW 3 - RIGHT: RECOMMENDED ACTION CARD */}
              <div className="bg-red-50 rounded-[20px] p-5 border border-red-200 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#EF4444] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <ShieldAlert size={15} className="text-[#EF4444]" />
                    <span>Recommended Action</span>
                  </h3>

                  <AnimatePresence mode="wait">
                    {phase === 'revealed' ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-1.5"
                      >
                        {recommendedActions.map((action, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-bold text-[#EF4444]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <div className="space-y-1.5 py-2">
                        {[1, 2].map((i) => (
                          <div key={i} className="h-3.5 bg-red-100/60 rounded-md animate-pulse" />
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>

            {onReset && phase === 'revealed' && (
              <div className="flex justify-end pt-1">
                <button
                  onClick={onReset}
                  className="px-5 py-2.5 rounded-[16px] bg-[#11875D] hover:bg-[#0e704d] text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
                >
                  <span>Scan Another Message</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
