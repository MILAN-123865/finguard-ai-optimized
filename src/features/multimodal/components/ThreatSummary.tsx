import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Activity, CheckCircle2 } from 'lucide-react';

interface ThreatSummaryProps {
  score: number;
  level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'SAFE';
  confidence: number;
}

export const ThreatSummary: React.FC<ThreatSummaryProps> = ({ score, level, confidence }) => {
  const isDanger = ['CRITICAL', 'HIGH'].includes(level);
  const color = isDanger ? 'red' : level === 'MEDIUM' ? 'yellow' : 'green';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass-card rounded-3xl border border-${color}-500/30 p-8 bg-${color}-500/5 relative overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 w-64 h-64 bg-${color}-500/10 blur-[100px] rounded-full`} />
      
      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        
        {/* Risk Meter */}
        <div className="relative w-48 h-48 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
            <motion.circle 
              cx="50" cy="50" r="45" 
              stroke={isDanger ? '#ef4444' : level === 'MEDIUM' ? '#eab308' : '#22c55e'} 
              strokeWidth="8" fill="none" strokeLinecap="round"
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 283 - (283 * (score / 100)) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ strokeDasharray: 283 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-black  text-${color}-400`}>{score}%</span>
            <span className="text-xs font-mono text-white/50 uppercase">Risk Score</span>
          </div>
        </div>

        {/* Threat Details */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            {isDanger ? <ShieldAlert size={28} className="text-red-400" /> : <CheckCircle2 size={28} className="text-green-400" />}
            <h2 className="text-3xl font-extrabold text-white">
              {level} Threat Detected
            </h2>
          </div>
          
          <p className="text-[#bac9cc] leading-relaxed">
            Our multi-modal neural engine has analyzed the provided content across 4 vector databases and found highly correlating patterns with known scams.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
              <Activity className="text-[#00daf3]" size={18} />
              <div>
                <div className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-wider">AI Confidence</div>
                <div className="text-white font-bold">{confidence}%</div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
              <Database className="text-[#00daf3]" size={18} />
              <div>
                <div className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-wider">Intel Sources</div>
                <div className="text-white font-bold">14 Databases</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

// Internal icon import fix
import { Database } from 'lucide-react';
