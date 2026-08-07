import React from 'react';
import { Shield, ShieldAlert, Zap, Radio } from 'lucide-react';

interface ThreatGaugeProps {
  threatLevel?: 'LOW' | 'ELEVATED' | 'CRITICAL';
  score?: number;
}

export const ThreatGauge: React.FC<ThreatGaugeProps> = ({
  threatLevel = 'LOW',
  score = 14,
}) => {
  const getColors = () => {
    switch (threatLevel) {
      case 'CRITICAL':
        return { text: 'text-red-400', border: 'border-red-500/40', bg: 'bg-red-500/10' };
      case 'ELEVATED':
        return { text: 'text-amber-400', border: 'border-amber-500/40', bg: 'bg-amber-500/10' };
      default:
        return { text: 'text-[#00daf3]', border: 'border-[#00e5ff]/40', bg: 'bg-[#00e5ff]/10' };
    }
  };

  const colors = getColors();

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#bac9cc]">
        <Radio size={14} className="text-[#00daf3] animate-pulse" />
        <span>Global Threat Index</span>
      </div>

      {/* Cyber Gauge Circular Graphic */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        
        {/* Animated Active Arc */}
        <div
          className={`absolute inset-0 rounded-full border-4 border-t-transparent ${colors.border} animate-spin`}
          style={{ animationDuration: '10s' }}
        />

        <div className="flex flex-col items-center justify-center space-y-0.5">
          <span className={`text-4xl font-extrabold font-mono ${colors.text}`}>
            {score}
          </span>
          <span className="text-[10px] font-mono text-[#bac9cc] uppercase">
            Risk Index
          </span>
        </div>
      </div>

      {/* Threat Status Badge */}
      <div className={`px-4 py-1.5 rounded-full border ${colors.border} ${colors.bg} ${colors.text} font-mono font-bold text-xs uppercase tracking-widest`}>
        {threatLevel} RISK ENVIRONMENT
      </div>

      <p className="text-xs text-[#bac9cc] max-w-xs">
        Automated SOC neural monitors are performing continuous deep packet inspection.
      </p>
    </div>
  );
};
