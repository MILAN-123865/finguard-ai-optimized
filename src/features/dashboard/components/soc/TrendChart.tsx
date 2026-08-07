import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart as LineChartIcon, Radio, Pause, Play, RefreshCw, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomCyberTooltip } from '../../../../components/charts/CustomChartTooltip';

const initialData = [
  { time: '00:00', detections: 120, baseline: 100 },
  { time: '04:00', detections: 210, baseline: 180 },
  { time: '08:00', detections: 450, baseline: 300 },
  { time: '12:00', detections: 680, baseline: 500 },
  { time: '16:00', detections: 590, baseline: 450 },
  { time: '20:00', detections: 340, baseline: 280 },
  { time: '24:00', detections: 190, baseline: 150 },
];

export const TrendChart: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [isLive, setIsLive] = useState(true);
  const [timeframe, setTimeframe] = useState<'24H' | '7D' | '30D'>('24H');
  const [lastUpdate, setLastUpdate] = useState<string>('Just now');

  // Live real-time data animation tick
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item, index) => {
          // Add subtle dynamic variance to simulate real-time live threat traffic
          const randomDelta = Math.floor((Math.random() - 0.45) * 35);
          const newDetections = Math.max(80, Math.min(850, item.detections + randomDelta));
          return {
            ...item,
            detections: newDetections,
          };
        })
      );
      setLastUpdate(new Date().toLocaleTimeString());
    }, 2500);

    return () => clearInterval(interval);
  }, [isLive]);

  const handleReset = () => {
    setData(initialData);
  };

  const currentPeak = Math.max(...data.map((d) => d.detections));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl border border-white/10 light:border-slate-200 p-5 flex flex-col h-full bg-[#050711]/80 light:bg-white/90 backdrop-blur-md relative overflow-hidden"
    >
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10 light:border-slate-200">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#00e5ff]/10 light:bg-sky-100 text-[#00e5ff] light:text-sky-600">
            <LineChartIcon size={18} className="animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-white light:text-slate-900 text-sm flex items-center gap-2">
              24H Detection Trend
              {isLive && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE
                </span>
              )}
            </h3>
            <p className="text-[11px] font-mono text-[#94a3b8] light:text-slate-500">
              Peak event count: <span className="text-[#00daf3] light:text-sky-600 font-bold">{currentPeak}</span> • Updated {lastUpdate}
            </p>
          </div>
        </div>

        {/* Timeframe & Live Stream Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl bg-white/5 light:bg-slate-100 p-1 border border-white/10 light:border-slate-200">
            {(['24H', '7D', '30D'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all relative ${
                  timeframe === tf
                    ? 'text-[#00daf3] light:text-sky-700 font-bold'
                    : 'text-[#94a3b8] light:text-slate-600 hover:text-white light:hover:text-slate-900'
                }`}
              >
                {tf}
                {timeframe === tf && (
                  <motion.div
                    layoutId="activeTimeframe"
                    className="absolute inset-0 bg-[#00e5ff]/20 light:bg-sky-200 border border-[#00e5ff]/40 rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsLive(!isLive)}
            title={isLive ? 'Pause live animation stream' : 'Resume live telemetry stream'}
            className={`p-1.5 rounded-xl border transition-all text-xs flex items-center justify-center ${
              isLive
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 border-amber-500/40 text-amber-400 hover:bg-amber-500/20'
            }`}
          >
            {isLive ? <Pause size={14} /> : <Play size={14} />}
          </button>

          <button
            onClick={handleReset}
            title="Reset telemetry baseline"
            className="p-1.5 rounded-xl bg-white/5 light:bg-slate-100 border border-white/10 light:border-slate-200 text-[#94a3b8] light:text-slate-600 hover:text-white light:hover:text-slate-900 transition-colors"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 w-full min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00daf3" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00daf3" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6001d1" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#6001d1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              fontFamily="monospace"
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              fontFamily="monospace"
              tickFormatter={(value) => (value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value)}
            />
            <Tooltip
              content={<CustomCyberTooltip titlePrefix="Time" unit="events" showRatios={false} />}
            />
            <Area
              type="monotone"
              dataKey="baseline"
              name="Normal Baseline"
              stroke="#6001d1"
              strokeWidth={1}
              strokeDasharray="4 4"
              fillOpacity={0.5}
              fill="url(#colorBaseline)"
              isAnimationActive={true}
              animationDuration={800}
            />
            <Area
              type="monotone"
              dataKey="detections"
              name="SOC Detections"
              stroke="#00daf3"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorDetections)"
              isAnimationActive={true}
              animationDuration={600}
              animationEasing="ease-in-out"
              dot={{ stroke: '#00daf3', strokeWidth: 2, r: 3, fill: '#050711' }}
              activeDot={{ stroke: '#00e5ff', strokeWidth: 3, r: 6, fill: '#00daf3' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

