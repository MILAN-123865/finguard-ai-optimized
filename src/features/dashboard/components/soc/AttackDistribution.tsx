import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Sector } from 'recharts';
import { PieChart as PieChartIcon, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { PieCyberTooltip } from '../../../../components/charts/CustomChartTooltip';

const data = [
  { name: 'SMS', value: 45 },
  { name: 'Email', value: 30 },
  { name: 'Website', value: 15 },
  { name: 'Voice', value: 5 },
  { name: 'QR', value: 3 },
  { name: 'Image', value: 2 },
];

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#00daf3', '#d2bbff'];

export const AttackDistribution: React.FC = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const activeItem = activeIndex !== null ? data[activeIndex] : null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      className="glass-card rounded-2xl border border-white/10 light:border-slate-200 p-5 flex flex-col h-full bg-[#050711]/80 light:bg-white backdrop-blur-md text-white light:text-slate-900 shadow-xl relative overflow-hidden group"
    >
      {/* Glow highlight */}
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d2bbff]/5 light:bg-purple-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#d2bbff]/10 transition-all duration-700" />

      <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10 light:border-slate-200 z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#d2bbff]/10 light:bg-purple-100 border border-[#d2bbff]/30 light:border-purple-300">
            <PieChartIcon size={16} className="text-[#d2bbff] light:text-purple-600 animate-spin-slow" />
          </div>
          <h3 className="font-bold text-white light:text-slate-900 text-sm">
            {t('dashboard.attackDistribution', 'Attack Vector Distribution')}
          </h3>
        </div>

        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-mono font-bold">
          <ShieldAlert size={12} />
          <span>6 VECTORS</span>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[250px] relative z-10 flex items-center justify-center">
        {/* Animated Center Badge */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center z-20">
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
                <span className="text-xl font-extrabold font-mono text-white light:text-slate-900">
                  {Math.round((activeItem.value / totalValue) * 100)}%
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#00daf3] light:text-sky-600 font-bold">
                  {activeItem.name}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="total"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <span className="text-xl font-extrabold font-mono text-white light:text-slate-900">
                  {totalValue}%
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#94a3b8] light:text-slate-500">
                  Total Ratio
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
              cy="40%"
              innerRadius={58}
              outerRadius={78}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  style={{
                    filter: activeIndex === index ? 'drop-shadow(0px 0px 8px rgba(0,229,255,0.8))' : 'none',
                    transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                    transformOrigin: 'center center',
                    transition: 'all 0.3s ease'
                  }}
                  className="cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip content={<PieCyberTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

