import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Radar as RadarIcon } from 'lucide-react';
import { motion } from 'motion/react';

const data = [
  { subject: 'Language Risk', A: 95, fullMark: 100 },
  { subject: 'Intent', A: 98, fullMark: 100 },
  { subject: 'Domain', A: 85, fullMark: 100 },
  { subject: 'Emotion', A: 92, fullMark: 100 },
  { subject: 'Context', A: 88, fullMark: 100 },
  { subject: 'Behavior', A: 96, fullMark: 100 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    const subject = payload[0].payload.subject;
    const riskColor = val > 90 ? '#ef4444' : val > 75 ? '#f59e0b' : '#10b981';
    const statusLabel = val > 90 ? 'CRITICAL RISK' : val > 75 ? 'ELEVATED RISK' : 'MODERATE';

    return (
      <div className="bg-[#050816]/95 border border-[#ff5252]/40 rounded-xl p-3.5 shadow-2xl backdrop-blur-md min-w-[200px] text-xs font-mono font-mono pointer-events-none">
        <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
          <span className="text-white font-bold">{subject}</span>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ backgroundColor: `${riskColor}20`, color: riskColor, border: `1px solid ${riskColor}40` }}>
            {statusLabel}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#bac9cc]">Risk Score:</span>
          <span className="text-sm font-bold" style={{ color: riskColor }}>
            {val}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export const ConfidenceRadar: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="glass-card rounded-3xl border border-white/10 bg-[#0a0d1c]/90 p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <RadarIcon className="text-[#00daf3]" size={20} />
        <h3 className="text-xl font-bold text-white">Multi-Dimensional Risk</h3>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Radar 
              name="Threat Level" 
              dataKey="A" 
              stroke="#ef4444" 
              fill="#ef4444" 
              fillOpacity={0.3} 
              isAnimationActive={true}
              animationDuration={2000}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
