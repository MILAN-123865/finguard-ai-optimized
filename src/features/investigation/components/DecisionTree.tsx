import React from 'react';
import { Network, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const flow = [
  { step: 'Input', result: 'SMS Message' },
  { step: 'Keyword Analysis', result: 'Urgency Detected' },
  { step: 'Pattern Matching', result: 'Credential Theft' },
  { step: 'Threat Intelligence', result: 'Blacklisted Domain' },
  { step: 'Threat Assessment', result: 'Phishing Attempt' },
  { step: 'Final Verdict', result: 'CRITICAL THREAT' },
];

export const DecisionTree: React.FC = () => {
  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 bg-[#0a0d1c]/90">
      <div className="flex items-center gap-3 mb-8">
        <Network className="text-[#00daf3]" size={20} />
        <h3 className="text-xl font-bold text-white">AI Decision Matrix</h3>
      </div>
      
      <div className="flex flex-col md:flex-row flex-wrap items-center gap-2 md:gap-4">
        {flow.map((item, idx) => (
          <React.Fragment key={idx}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl border border-white/10 bg-white/5 min-w-[140px] hover:bg-white/10 transition-colors"
            >
              <span className="text-[10px] uppercase tracking-widest text-[#94a3b8] font-mono mb-1">{item.step}</span>
              <span className={`text-sm font-bold text-center ${idx === flow.length - 1 ? 'text-red-400' : 'text-white'}`}>
                {item.result}
              </span>
            </motion.div>
            
            {idx < flow.length - 1 && (
              <ArrowRight className="hidden md:block text-white/20" size={20} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
