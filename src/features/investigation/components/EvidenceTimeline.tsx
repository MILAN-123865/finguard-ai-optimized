import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, MessageSquare, Search, BrainCircuit, Globe, ShieldAlert, Activity, FileText } from 'lucide-react';

const timelineSteps = [
  { id: 1, label: 'Input received', icon: FileText, delay: 0 },
  { id: 2, label: 'Language analyzed', icon: MessageSquare, delay: 0.5 },
  { id: 3, label: 'Keywords extracted', icon: Search, delay: 1.0 },
  { id: 4, label: 'Intent detected', icon: BrainCircuit, delay: 1.5 },
  { id: 5, label: 'Domain verified', icon: Globe, delay: 2.0 },
  { id: 6, label: 'Threat Intelligence lookup', icon: ShieldAlert, delay: 2.5 },
  { id: 7, label: 'Behavior analysis', icon: Activity, delay: 3.0 },
  { id: 8, label: 'Threat score calculation', icon: BrainCircuit, delay: 3.5 },
  { id: 9, label: 'Final decision', icon: CheckCircle2, delay: 4.0 },
];

export const EvidenceTimeline: React.FC = () => {
  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 bg-[#0a0d1c]/90 h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#00daf3]/5 blur-[100px] rounded-full pointer-events-none" />
      
      <h3 className="text-xl font-bold text-white mb-8 relative z-10">
        Investigation Trace
      </h3>
      
      <div className="relative z-10 space-y-6">
        <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-white/5" />
        
        {timelineSteps.map((step, idx) => (
          <motion.div 
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: step.delay, duration: 0.5 }}
            className="flex items-center gap-5 relative group"
          >
            <div className="w-10 h-10 rounded-full bg-[#00daf3]/10 border border-[#00daf3]/30 text-[#00daf3] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#00daf3]/20 transition-all shadow-[0_0_15px_rgba(0,218,243,0.2)]">
              <step.icon size={18} />
            </div>
            
            <div className="flex-1">
              <span className="text-sm font-bold text-white/90 group-hover:text-white transition-colors">
                {step.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
