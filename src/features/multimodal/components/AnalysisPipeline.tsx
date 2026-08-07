import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Search, Cpu, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AnalysisPipelineProps {
  onComplete: () => void;
}

const steps = [
  { id: 1, label: 'Initializing Secure Sandbox', icon: <Database size={20} /> },
  { id: 2, label: 'Extracting Core Metadata & Text', icon: <Search size={20} /> },
  { id: 3, label: 'Running Multi-Modal Neural Engine', icon: <Cpu size={20} /> },
  { id: 4, label: 'Cross-referencing Global Threat Intel', icon: <ShieldAlert size={20} /> },
  { id: 5, label: 'Finalizing Security Verdict', icon: <CheckCircle2 size={20} /> },
];

export const AnalysisPipeline: React.FC<AnalysisPipelineProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= steps.length) {
      setTimeout(onComplete, 500);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 1200); // 1.2s per step for dramatic effect

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl border border-white/20 p-8 md:p-12 relative bg-[#0a0d1c]/95 backdrop-blur-xl shadow-2xl max-w-2xl mx-auto"
    >
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full border-2 border-[#00daf3] border-t-transparent animate-spin shadow-[0_0_20px_#00e5ff] mx-auto mb-6" />
        <h2 className="text-xl font-extrabold text-white">
          Analyzing Threat Vectors
        </h2>
        <p className="text-[#94a3b8] text-sm mt-2 font-mono">
          Model: FINGUARD-OMEGA-v4
        </p>
      </div>

      <div className="space-y-6 relative">
        <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-white/5" />
        
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div key={step.id} className="flex items-center gap-6 relative z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-500 ${
                isCompleted ? 'bg-green-500/20 border-green-400/50 text-green-400' :
                isActive ? 'bg-[#00daf3]/20 border-[#00daf3]/50 text-[#00daf3] shadow-[0_0_15px_rgba(0,218,243,0.3)]' :
                'bg-white/5 border-white/10 text-[#94a3b8]'
              }`}>
                {isCompleted ? <CheckCircle2 size={20} /> : step.icon}
              </div>
              
              <div className="flex-1">
                <h4 className={`font-bold transition-colors duration-500 ${
                  isActive ? 'text-white' : 'text-[#94a3b8]'
                }`}>
                  {step.label}
                </h4>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: '100%' }}
                      exit={{ opacity: 0 }}
                      className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden relative"
                    >
                      <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '0%' }}
                        transition={{ duration: 1.2, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-[#00daf3] to-[#6001d1]"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
