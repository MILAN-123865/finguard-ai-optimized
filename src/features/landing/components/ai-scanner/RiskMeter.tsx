import React, { useEffect, useState } from 'react';
import { motion, animate, useMotionValue } from 'motion/react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

interface RiskMeterProps {
  score: number;
  threatLevel: 'Safe' | 'Low' | 'Medium' | 'High' | 'Critical';
  confidence?: number;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ score, threatLevel, confidence = 99.2 }) => {
  const count = useMotionValue(0);
  const [displayScore, setDisplayScore] = useState(0);
  
  const getColor = (s: number) => {
    if (s < 30) return '#10B981'; // Green
    if (s < 60) return '#F59E0B'; // Orange
    return '#EF4444'; // Red
  };

  const currentColor = getColor(displayScore);

  useEffect(() => {
    count.set(0);
    const animation = animate(count, score, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayScore(Math.round(latest))
    });
    return animation.stop;
  }, [score, count]);

  const circleLength = 251.2;

  return (
    <div className="bg-white rounded-[20px] p-6 border border-[#E5E7EB] flex flex-col items-center justify-center relative shadow-xs">
      <div className="flex flex-col items-center gap-3 relative z-10 w-full">
        <div className="relative w-36 h-36">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              stroke="#F1F5F9" 
              strokeWidth="8" 
              fill="none" 
            />
            <motion.circle 
              cx="50" 
              cy="50" 
              r="40" 
              strokeWidth="8" 
              fill="none" 
              strokeLinecap="round"
              initial={{ strokeDashoffset: circleLength }}
              animate={{ 
                strokeDashoffset: circleLength - (circleLength * (score / 100)),
                stroke: currentColor
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ strokeDasharray: circleLength }}
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div 
              className="text-2xl font-bold transition-colors duration-300 font-mono"
              style={{ color: currentColor }}
            >
              {displayScore}<span className="text-xs text-[#64748B] font-sans font-medium">/100</span>
            </div>
            <span className="text-[10px] text-[#64748B] font-bold uppercase mt-0.5">Threat Score</span>
          </div>
        </div>

        <div className="text-center space-y-1">
          <div 
            className="flex items-center justify-center gap-1.5 font-bold text-base"
            style={{ color: currentColor }}
          >
            {score >= 60 ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
            <span>{threatLevel} Risk</span>
          </div>
          <p className="text-xs text-[#64748B] font-medium">
            AI Confidence: <span className="font-bold text-[#11875D]">{confidence}%</span>
          </p>
        </div>
      </div>
    </div>
  );
};
