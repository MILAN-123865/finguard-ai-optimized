import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, CheckCircle2, Loader2 } from 'lucide-react';
import { AnalysisStage } from './types';

interface AnalysisTimelineProps {
  stages: AnalysisStage[];
  currentStageId: number;
  isComplete: boolean;
}

export const AnalysisTimeline: React.FC<AnalysisTimelineProps> = ({
  stages,
  currentStageId,
  isComplete
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentStageId]);

  return (
    <div className="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col h-full bg-[#050714]/80 backdrop-blur-2xl shadow-2xl">
      {/* Terminal Header */}
      <div className="h-12 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-2 text-[#94a3b8] text-xs font-mono">
          <Terminal size={14} />
          <span>live_threat_analysis_v4.2</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-6 overflow-y-auto hide-scrollbar relative font-mono text-xs sm:text-sm" ref={scrollRef}>
        <div className="space-y-4">
          <AnimatePresence>
            {stages.map((stage, idx) => {
              if (idx > currentStageId) return null;
              
              const isCurrent = idx === currentStageId && !isComplete;
              const isDone = idx < currentStageId || isComplete;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-start gap-3 ${isDone ? 'text-[#00daf3]' : 'text-white'}`}
                >
                  <div className="shrink-0 mt-0.5">
                    {isCurrent ? (
                      <Loader2 size={16} className="animate-spin text-[#d2bbff]" />
                    ) : isDone ? (
                      <CheckCircle2 size={16} className="text-[#00daf3]" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-[#94a3b8]/50" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <span className={isCurrent ? 'text-white' : ''}>{stage.label}</span>
                    {isCurrent && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        ...
                      </motion.span>
                    )}
                    
                    {/* Optional progress bar for current stage */}
                    {isCurrent && (
                      <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5, ease: "linear" }}
                          className="h-full bg-[#d2bbff] shadow-[0_0_10px_#d2bbff]"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 flex items-center gap-2"
            >
              <CheckCircle2 size={16} />
              <span>Analysis Completed Successfully</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
