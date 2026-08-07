import React, { useState } from 'react';
import {
  AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { Activity, ShieldCheck, PieChart as PieIcon, AlertTriangle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomCyberTooltip, PieCyberTooltip } from '../../../components/charts/CustomChartTooltip';

export const ThreatTrendChart: React.FC = React.memo(() => {
  const data = [
    { name: 'Mon', threats: 12 }, { name: 'Tue', threats: 19 }, { name: 'Wed', threats: 8 },
    { name: 'Thu', threats: 24 }, { name: 'Fri', threats: 15 }, { name: 'Sat', threats: 7 }, { name: 'Sun', threats: 10 }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-3xl p-6 border border-white/10 h-[300px] shadow-lg flex flex-col relative overflow-hidden group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#ff5252]/10 border border-[#ff5252]/30">
            <Activity size={18} className="text-[#ff5252] animate-pulse" />
          </div>
          <h3 className="font-bold text-white">Threat Trend Analysis</h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#ff5252]/10 border border-[#ff5252]/30 text-[#ff5252] font-semibold">
          7D Telemetry
        </span>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff5252" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ff5252" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="name" stroke="#bac9cc" fontSize={10} tickLine={false} axisLine={false} fontFamily="JetBrains Mono" />
            <YAxis stroke="#bac9cc" fontSize={10} tickLine={false} axisLine={false} fontFamily="JetBrains Mono" />
            <Tooltip content={<CustomCyberTooltip titlePrefix="Day" unit="Threats" showRatios={false} />} />
            <Area 
              type="monotone" 
              dataKey="threats" 
              name="Threats" 
              stroke="#ff5252" 
              strokeWidth={2.5} 
              fillOpacity={1} 
              fill="url(#threatGradient)" 
              isAnimationActive={true}
              animationDuration={1500}
              dot={{ r: 3, fill: '#ff5252', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#ffffff', stroke: '#ff5252', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
});

export const SecurityScoreTimeline: React.FC = React.memo(() => {
  const data = [
    { name: 'W1', score: 85 }, { name: 'W2', score: 88 }, { name: 'W3', score: 92 }, { name: 'W4', score: 94 }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card rounded-3xl p-6 border border-emerald-500/20 bg-emerald-500/5 h-[300px] shadow-lg flex flex-col relative overflow-hidden group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <ShieldCheck size={18} className="text-emerald-400" />
          </div>
          <h3 className="font-bold text-white">Security Score Timeline</h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
          94/100 Avg
        </span>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="name" stroke="#bac9cc" fontSize={10} tickLine={false} axisLine={false} fontFamily="JetBrains Mono" />
            <YAxis domain={[0, 100]} stroke="#bac9cc" fontSize={10} tickLine={false} axisLine={false} fontFamily="JetBrains Mono" />
            <Tooltip content={<CustomCyberTooltip titlePrefix="Week" unit="/ 100" showRatios={false} />} />
            <Line 
              type="monotone" 
              dataKey="score" 
              name="Security Score" 
              stroke="#10b981" 
              strokeWidth={3} 
              isAnimationActive={true}
              animationDuration={1500}
              dot={{ r: 4, fill: '#0a0d1a', stroke: '#10b981', strokeWidth: 2 }} 
              activeDot={{ r: 7, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
});

export const ThreatDistributionChart: React.FC = React.memo(() => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const data = [
    { name: 'Safe', value: 75, color: '#10b981' },
    { name: 'Suspicious', value: 15, color: '#f59e0b' },
    { name: 'Dangerous', value: 7, color: '#ef4444' },
    { name: 'Critical', value: 3, color: '#8b5cf6' },
  ];

  const activeItem = activeIndex !== null ? data[activeIndex] : null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="glass-card rounded-3xl p-6 border border-white/10 h-full shadow-lg flex flex-col items-center relative overflow-hidden group"
    >
      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#00daf3]/10 border border-[#00daf3]/30">
            <PieIcon size={18} className="text-[#00daf3] animate-spin-slow" />
          </div>
          <h3 className="font-bold text-white">Threat Distribution</h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00daf3]/10 border border-[#00daf3]/30 text-[#00daf3]">
          Real-time
        </span>
      </div>

      <div className="w-full h-44 relative flex items-center justify-center">
        {/* Animated Center Badge */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center z-10">
          <AnimatePresence mode="wait">
            {activeItem ? (
              <motion.div
                key={activeItem.name}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <span className="text-xl font-black font-mono" style={{ color: activeItem.color }}>
                  {activeItem.value}%
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#bac9cc] font-semibold">
                  {activeItem.name}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <span className="text-xl font-black font-mono text-white">
                  100%
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#94a3b8]">
                  Verified
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={data} 
              cx="50%" 
              cy="50%" 
              innerRadius={45} 
              outerRadius={68} 
              paddingAngle={4} 
              dataKey="value" 
              stroke="none"
              isAnimationActive={true}
              animationDuration={1200}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  style={{
                    filter: activeIndex === index ? `drop-shadow(0px 0px 10px ${entry.color})` : 'none',
                    transform: activeIndex === index ? 'scale(1.08)' : 'scale(1)',
                    transformOrigin: 'center center',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  className="cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip content={<PieCyberTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full grid grid-cols-2 gap-2 mt-2">
        {data.map((d, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.03 }}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[11px] font-mono cursor-pointer transition-all border ${
              activeIndex === i
                ? 'bg-white/10 border-white/30 text-white shadow-md'
                : 'bg-white/5 border-white/5 text-[#bac9cc] hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
              <span className="text-white font-medium">{d.name}</span>
            </div>
            <span className="font-bold" style={{ color: d.color }}>{d.value}%</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

export const HighRiskMessagesChart: React.FC = React.memo(() => {
  const data = [
    { vector: 'SMS', count: 45 }, { vector: 'Email', count: 120 },
    { vector: 'WhatsApp', count: 85 }, { vector: 'URL', count: 34 }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card rounded-3xl p-6 border border-white/10 h-full shadow-lg flex flex-col relative overflow-hidden group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <AlertTriangle size={18} className="text-amber-400" />
          </div>
          <h3 className="font-bold text-white">High Risk per Vector</h3>
        </div>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="vector" stroke="#bac9cc" fontSize={10} tickLine={false} axisLine={false} fontFamily="JetBrains Mono" />
            <YAxis stroke="#bac9cc" fontSize={10} tickLine={false} axisLine={false} fontFamily="JetBrains Mono" />
            <Tooltip cursor={{ fill: '#ffffff05' }} content={<CustomCyberTooltip titlePrefix="Vector" unit="flagged" showRatios={false} />} />
            <Bar 
              dataKey="count" 
              name="High Risk Items" 
              fill="#f59e0b" 
              radius={[6, 6, 0, 0]} 
              isAnimationActive={true}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
});
