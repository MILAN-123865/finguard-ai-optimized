import React from 'react';
import { RiskLevel } from '../../types';

interface RiskGaugeProps {
  score: number; // 0-100
  level: RiskLevel;
  confidence?: number;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, level, confidence = 99.4 }) => {
  const getLevelColor = (lvl: RiskLevel) => {
    switch (lvl) {
      case 'SAFE':
        return { text: 'text-[#00daf3]', bg: 'bg-[#00daf3]', border: 'border-[#00daf3]/40', stroke: '#00daf3', glow: 'shadow-[#00daf3]/20' };
      case 'SUSPICIOUS':
        return { text: 'text-[#ffd166]', bg: 'bg-[#ffd166]', border: 'border-[#ffd166]/40', stroke: '#ffd166', glow: 'shadow-[#ffd166]/20' };
      case 'DANGEROUS':
        return { text: 'text-[#ff9f1c]', bg: 'bg-[#ff9f1c]', border: 'border-[#ff9f1c]/40', stroke: '#ff9f1c', glow: 'shadow-[#ff9f1c]/20' };
      case 'CRITICAL':
        return { text: 'text-[#ff5252]', bg: 'bg-[#ff5252]', border: 'border-[#ff5252]/40', stroke: '#ff5252', glow: 'shadow-[#ff5252]/20' };
      default:
        return { text: 'text-[#00daf3]', bg: 'bg-[#00daf3]', border: 'border-[#00daf3]/40', stroke: '#00daf3', glow: 'shadow-[#00daf3]/20' };
    }
  };

  const style = getLevelColor(level);
  const validScore = Math.max(0, Math.min(100, Math.round(score)));
  const strokeDashoffset = 283 - (283 * validScore) / 100;

  return (
    <div className="flex flex-col items-center justify-center p-6 glass-card rounded-2xl relative overflow-hidden w-full">
      <div className="relative w-44 h-44 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-white/10"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            style={{ stroke: style.stroke }}
            className="transition-all duration-1000 ease-out"
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="font-mono text-4xl font-bold text-white tracking-tighter">
            {validScore}%
          </span>
          <span className="text-[10px] font-mono text-[#bac9cc] uppercase tracking-widest mt-0.5">
            Threat Probability
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-1.5">
        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${style.border} ${style.bg}/10 ${style.text} ${style.glow}`}>
          {level} RISK
        </div>
        <span className="text-xs text-[#bac9cc] font-mono">
          Confidence: {confidence ? Number(confidence).toFixed(1) : '99.4'}%
        </span>
      </div>
    </div>
  );
};
