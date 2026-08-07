import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, Globe, Phone, Target, Brain, Download, Printer, Filter, 
  Activity, Zap, Sparkles, TrendingUp, ShieldAlert, Clock, Cpu, ChevronRight, CheckCircle2, Loader2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface HeatmapCellData {
  id: string;
  dayIndex: number;
  dayName: string;
  hour: number;
  timeSlot: string;
  scans: number;
  threats: number;
  critical: number;
  confidence: number;
  intensity: 'very-low' | 'low' | 'medium' | 'high' | 'critical';
  isRecent?: boolean;
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const DailyScanHeatmap: React.FC = () => {
  const [totalScansToday, setTotalScansToday] = useState(22984);
  const [secondsAgo, setSecondsAgo] = useState(0);
  const [isLive, setIsLive] = useState(true);
  const [hoveredCell, setHoveredCell] = useState<HeatmapCellData | null>(null);

  // Generate initial 7 days x 24 hours = 168 cells dataset
  const initialGrid = useMemo(() => {
    const cells: HeatmapCellData[] = [];
    DAYS_OF_WEEK.forEach((dayName, dIdx) => {
      for (let h = 0; h < 24; h++) {
        // Create realistic distribution (higher in afternoon/evening)
        const isPeak = (h >= 13 && h <= 17) || h === 21;
        const baseScans = isPeak 
          ? Math.floor(Math.random() * 250) + 320 
          : Math.floor(Math.random() * 180) + 20;

        const threats = Math.floor(baseScans * (isPeak ? 0.08 : 0.03));
        const critical = threats > 10 ? Math.floor(threats * 0.25) : Math.floor(threats * 0.1);
        const confidence = 92 + Math.floor(Math.random() * 7);

        let intensity: HeatmapCellData['intensity'] = 'very-low';
        if (baseScans >= 480) intensity = 'critical';
        else if (baseScans >= 350) intensity = 'high';
        else if (baseScans >= 200) intensity = 'medium';
        else if (baseScans >= 80) intensity = 'low';

        const startHour = h < 10 ? `0${h}:00` : `${h}:00`;
        const endHour = (h + 1) < 10 ? `0${h + 1}:00` : `${h + 1}:00`;

        cells.push({
          id: `${dIdx}-${h}`,
          dayIndex: dIdx,
          dayName,
          hour: h,
          timeSlot: `${startHour} - ${endHour}`,
          scans: baseScans,
          threats,
          critical,
          confidence,
          intensity,
        });
      }
    });
    return cells;
  }, []);

  const [gridData, setGridData] = useState<HeatmapCellData[]>(initialGrid);

  // Live timer tick for real-time simulation
  useEffect(() => {
    const secTimer = setInterval(() => {
      setSecondsAgo((prev) => (prev >= 60 ? 0 : prev + 1));
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  // Live data generator
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * gridData.length);
      const addedScans = Math.floor(Math.random() * 20) + 12;

      setGridData((prev) =>
        prev.map((cell, idx) => {
          if (idx === randomIndex) {
            const newScans = cell.scans + addedScans;
            let intensity: HeatmapCellData['intensity'] = cell.intensity;
            if (newScans >= 480) intensity = 'critical';
            else if (newScans >= 350) intensity = 'high';
            else if (newScans >= 200) intensity = 'medium';
            else if (newScans >= 80) intensity = 'low';

            return {
              ...cell,
              scans: newScans,
              threats: cell.threats + Math.floor(addedScans * 0.06),
              intensity,
              isRecent: true,
            };
          }
          return { ...cell, isRecent: false };
        })
      );

      setTotalScansToday((prev) => prev + addedScans);
      setSecondsAgo(0);
    }, 3200);

    return () => clearInterval(interval);
  }, [isLive, gridData.length]);

  // Map intensity level to color scale & styling requested by prompt
  const getCellStyles = (cell: HeatmapCellData) => {
    switch (cell.intensity) {
      case 'very-low':
        return 'bg-[#0B1220] border-white/5 text-slate-500 hover:border-cyan-500/40';
      case 'low':
        return 'bg-[#123C4A] border-[#123C4A]/80 text-[#22D3EE] hover:border-cyan-400/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]';
      case 'medium':
        return 'bg-[#0F8B9D] border-[#0F8B9D]/90 text-white hover:border-cyan-300 shadow-[0_0_8px_rgba(15,139,157,0.3)]';
      case 'high':
        return 'bg-[#22D3EE] border-[#22D3EE] text-slate-950 font-bold hover:border-white shadow-[0_0_12px_rgba(34,211,238,0.5)]';
      case 'critical':
        return 'bg-[#67E8F9] border-[#A5F3FC] text-slate-950 font-extrabold shadow-[0_0_16px_rgba(103,232,249,0.85)] animate-pulse hover:border-white';
      default:
        return 'bg-[#0B1220] border-white/5';
    }
  };

  const getStatusBadge = (cell: HeatmapCellData) => {
    if (cell.intensity === 'critical') return { text: 'CRITICAL SPIKE', cls: 'bg-red-500/20 text-red-400 border-red-500/40' };
    if (cell.intensity === 'high') return { text: 'HIGH ACTIVITY', cls: 'bg-[#00daf3]/20 text-[#00daf3] border-[#00daf3]/40' };
    if (cell.intensity === 'medium') return { text: 'ELEVATED', cls: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
    if (cell.intensity === 'low') return { text: 'STABLE', cls: 'bg-cyan-900/40 text-cyan-300 border-cyan-700/50' };
    return { text: 'NORMAL', cls: 'bg-slate-800/60 text-slate-400 border-slate-700/40' };
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative rounded-3xl p-6 border border-[#00daf3]/30 bg-[#0b0f19]/90 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_30px_rgba(0,218,243,0.08)] overflow-hidden group font-sans"
    >
      {/* Background Subtle Cyber Grid & Light Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#00daf3_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.07] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#00daf3]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
        
        {/* Title & Live Status */}
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-2xl bg-[#00daf3]/10 border border-[#00daf3]/30 text-[#00daf3] shadow-[0_0_15px_rgba(0,218,243,0.2)] shrink-0">
            <Activity size={22} className="animate-pulse text-[#00daf3]" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-extrabold text-white text-lg tracking-tight">
                Daily Scan Volume
              </h3>
              <button
                onClick={() => setIsLive(!isLive)}
                className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all duration-300 ${
                  isLive
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.2)]'
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-400 animate-ping' : 'bg-gray-500'}`} />
                {isLive ? 'LIVE MONITORING' : 'STATIC PAUSED'}
              </button>
            </div>
            <p className="text-xs text-[#bac9cc] font-mono mt-0.5 flex items-center gap-2">
              <span>Real-time AI scan activity</span>
              <span className="inline-block w-1 h-1 rounded-full bg-white/30" />
              <span className="text-gray-400">
                {secondsAgo === 0 ? 'Updated just now' : `Updated ${secondsAgo}s ago`}
              </span>
            </p>
          </div>
        </div>

        {/* Metrics Banner */}
        <div className="flex items-center gap-4 bg-[#070a14]/60 border border-white/10 rounded-2xl px-4 py-2.5 backdrop-blur-md">
          <div className="text-left">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Total Scans Today</span>
            <span className="text-lg font-black font-mono text-[#00daf3] tracking-tight">
              {totalScansToday.toLocaleString()}
            </span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-xl">
            <TrendingUp size={14} />
            <span>+18.6%</span>
            <span className="text-[10px] text-gray-400 font-normal">24h</span>
          </div>
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="relative z-10 mb-6">
        
        {/* Hours Label Header */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-cyan-500/20 pb-2">
          <div className="min-w-[620px]">
            <div className="flex items-center mb-2 pl-12 text-[10px] font-mono text-gray-400 justify-between pr-1">
              <span>00:00</span>
              <span>04:00</span>
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
              <span>23:00</span>
            </div>

            {/* Matrix Rows (7 days x 24 hours) */}
            <div className="space-y-1.5">
              {DAYS_OF_WEEK.map((dayName, dIdx) => {
                const dayCells = gridData.filter((c) => c.dayIndex === dIdx);

                return (
                  <div key={dayName} className="flex items-center gap-2">
                    {/* Day Label */}
                    <span className="w-10 text-[11px] font-mono text-[#bac9cc] font-semibold text-right shrink-0">
                      {dayName}
                    </span>

                    {/* 24 Hour Slots */}
                    <div className="grid grid-cols-24 gap-1.5 flex-1">
                      {dayCells.map((cell) => {
                        const cellStyle = getCellStyles(cell);
                        const isHovered = hoveredCell?.id === cell.id;

                        return (
                          <motion.div
                            key={cell.id}
                            whileHover={{ scale: 1.25, zIndex: 30 }}
                            onMouseEnter={() => setHoveredCell(cell)}
                            onMouseLeave={() => setHoveredCell(null)}
                            className={`h-6 rounded-md border ${cellStyle} transition-all duration-200 cursor-pointer relative flex items-center justify-center ${
                              cell.isRecent ? 'ring-2 ring-[#00daf3] ring-offset-2 ring-offset-[#0b0f19]' : ''
                            } ${isHovered ? 'shadow-[0_0_15px_rgba(0,218,243,0.8)] border-[#00daf3]' : ''}`}
                          >
                            {/* Subtle recent pulse ring */}
                            {cell.isRecent && (
                              <span className="absolute inset-0 rounded-md bg-[#00daf3]/40 animate-ping pointer-events-none" />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend & Hover Tooltip Bar */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          
          {/* Intensity Legend */}
          <div className="flex items-center gap-2 text-[11px] text-[#bac9cc]">
            <span className="font-medium text-gray-400">Activity Level:</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-gray-500">Low</span>
              <span className="w-3.5 h-3.5 rounded-sm bg-[#0B1220] border border-white/10" title="Very Low" />
              <span className="w-3.5 h-3.5 rounded-sm bg-[#123C4A] border border-[#123C4A]" title="Low" />
              <span className="w-3.5 h-3.5 rounded-sm bg-[#0F8B9D] border border-[#0F8B9D]" title="Moderate" />
              <span className="w-3.5 h-3.5 rounded-sm bg-[#22D3EE] border border-[#22D3EE]" title="High" />
              <span className="w-3.5 h-3.5 rounded-sm bg-[#67E8F9] border border-[#A5F3FC] shadow-[0_0_8px_rgba(103,232,249,0.8)]" title="Critical" />
              <span className="text-[10px] text-[#22D3EE] font-bold">Critical</span>
            </div>
          </div>

          {/* Quick Hover Text or Instructions */}
          {!hoveredCell && (
            <span className="text-[11px] text-gray-400 italic flex items-center gap-1">
              <Zap size={12} className="text-[#00daf3]" /> Hover over grid cells to inspect hourly telemetry
            </span>
          )}
        </div>
      </div>

      {/* Floating Detailed Hover Tooltip */}
      <AnimatePresence>
        {hoveredCell && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="relative z-20 mb-5 p-3.5 rounded-2xl bg-[#060a14]/95 border border-[#00daf3]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,218,243,0.25)] backdrop-blur-md"
          >
            <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#00daf3]" />
                <span className="text-xs font-bold font-mono text-white">
                  {hoveredCell.dayName}, {hoveredCell.timeSlot}
                </span>
              </div>
              {(() => {
                const badge = getStatusBadge(hoveredCell);
                return (
                  <span className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider ${badge.cls}`}>
                    {badge.text}
                  </span>
                );
              })()}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 block">Total Scans</span>
                <span className="font-extrabold text-[#00daf3] text-sm">{hoveredCell.scans}</span>
              </div>
              <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 block">Threats Detected</span>
                <span className="font-extrabold text-amber-400 text-sm">{hoveredCell.threats}</span>
              </div>
              <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 block">Critical Alerts</span>
                <span className="font-extrabold text-red-400 text-sm">{hoveredCell.critical}</span>
              </div>
              <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 block">AI Confidence</span>
                <span className="font-extrabold text-emerald-400 text-sm">{hoveredCell.confidence}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Insights Panel */}
      <div className="relative z-10 pt-4 border-t border-white/10 bg-[#070b16]/50 -mx-6 -mb-6 p-6 rounded-b-3xl">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-[#00daf3] animate-spin-slow" />
          <h4 className="font-bold text-xs font-mono text-white uppercase tracking-wider">
            AI Activity Insights
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#00daf3]/30 transition-colors">
            <Clock size={15} className="text-[#00daf3] shrink-0" />
            <div className="truncate">
              <span className="text-[10px] text-gray-400 block">Peak Scanning</span>
              <span className="text-xs font-bold font-mono text-white">14:00 - 16:00</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#00daf3]/30 transition-colors">
            <Cpu size={15} className="text-cyan-400 shrink-0" />
            <div className="truncate">
              <span className="text-[10px] text-gray-400 block">Most Active Source</span>
              <span className="text-xs font-bold font-mono text-white">Email Vectors (42%)</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/30 transition-colors">
            <ShieldAlert size={15} className="text-amber-400 shrink-0" />
            <div className="truncate">
              <span className="text-[10px] text-gray-400 block">Highest Risk Hour</span>
              <span className="text-xs font-bold font-mono text-amber-300">21:00 (Critical Spike)</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors">
            <TrendingUp size={15} className="text-emerald-400 shrink-0" />
            <div className="truncate">
              <span className="text-[10px] text-gray-400 block">AI Anomaly Detected</span>
              <span className="text-xs font-bold font-mono text-emerald-300">+42% Suspicious URLs</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TopDangerousDomains: React.FC = () => {
  const domains = [
    { url: 'secure-update-verify.com', count: 142 },
    { url: 'free-crypto-giveaway.net', count: 98 },
    { url: 'whatsapp-prize-claim.co', count: 65 },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 border border-red-500/20 bg-red-500/5 h-full shadow-lg">
      <div className="flex items-center gap-2 mb-5">
        <Globe size={18} className="text-red-400" />
        <h3 className="font-bold text-white">Top Dangerous Domains</h3>
      </div>
      <div className="space-y-3">
        {domains.map((domain, i) => (
          <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-red-500/10">
            <span className="text-xs text-red-300 font-mono truncate w-2/3">{domain.url}</span>
            <span className="text-[10px] text-white font-bold bg-white/10 px-2 py-0.5 rounded">{domain.count} hits</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TopScamNumbers: React.FC = () => {
  const numbers = [
    { phone: '+1 (800) 555-0199', count: 215 },
    { phone: '+44 7911 123456', count: 184 },
    { phone: '+1 (888) 123-4567', count: 132 },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 border border-amber-500/20 bg-amber-500/5 h-full shadow-lg">
      <div className="flex items-center gap-2 mb-5">
        <Phone size={18} className="text-amber-400" />
        <h3 className="font-bold text-white">Top Scam Numbers</h3>
      </div>
      <div className="space-y-3">
        {numbers.map((num, i) => (
          <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-amber-500/10">
            <span className="text-xs text-amber-300 font-mono truncate">{num.phone}</span>
            <span className="text-[10px] text-white font-bold bg-white/10 px-2 py-0.5 rounded">{num.count} hits</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ScanSuccessRate: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl p-6 border border-[#00daf3]/30 bg-gradient-to-br from-[#00daf3]/10 to-transparent h-full shadow-lg flex flex-col justify-center items-center text-center">
      <Target size={24} className="text-[#00daf3] mb-3" />
      <div className="text-3xl font-extrabold font-mono text-white mb-1">99.9%</div>
      <div className="text-xs text-[#bac9cc]">Scan Processing Success Rate</div>
    </div>
  );
};

export const AIAccuracyCard: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl p-6 border border-[#6001d1]/30 bg-gradient-to-br from-[#6001d1]/10 to-transparent h-full shadow-lg flex flex-col justify-center items-center text-center">
      <Brain size={24} className="text-[#d2bbff] mb-3" />
      <div className="text-3xl font-extrabold font-mono text-white mb-1">98.4%</div>
      <div className="text-xs text-[#bac9cc]">AI Neural Prediction Accuracy</div>
    </div>
  );
};

export interface AnalyticsToolbarProps {
  recordsCount?: number;
  activeExportType?: 'csv' | 'pdf' | 'print' | null;
  onExportCSV?: () => void;
  onExportPDF?: () => void;
  onPrint?: () => void;
  dateRangeText?: string;
}

export const AnalyticsToolbar: React.FC<AnalyticsToolbarProps> = ({
  recordsCount = 0,
  activeExportType = null,
  onExportCSV,
  onExportPDF,
  onPrint,
  dateRangeText = 'Last 30 Days (Jul 2026)',
}) => {
  const hasRecords = recordsCount > 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0a0d1c]/80 p-4 rounded-2xl border border-white/10 w-full no-print">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#0f1321] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white cursor-default">
          <Calendar size={14} className="text-[#00daf3]" />
          <span>{dateRangeText}</span>
        </div>
        <span className="text-xs text-[#bac9cc] font-mono hidden md:inline">
          ({recordsCount} active records)
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Export CSV Button */}
        <button
          onClick={onExportCSV}
          disabled={!hasRecords || activeExportType !== null}
          title={hasRecords ? "Download filtered telemetry as CSV" : "No data available to export"}
          className="relative group flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/40 text-white text-xs font-bold font-mono transition-all duration-200 border border-white/10 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        >
          {activeExportType === 'csv' ? (
            <>
              <Loader2 size={14} className="animate-spin text-emerald-400" />
              <span>Generating CSV...</span>
            </>
          ) : (
            <>
              <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
              <span>Export CSV</span>
            </>
          )}
        </button>

        {/* Export PDF Button */}
        <button
          onClick={onExportPDF}
          disabled={!hasRecords || activeExportType !== null}
          title={hasRecords ? "Generate executive PDF report" : "No data available to export"}
          className="relative group flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-[#00daf3]/20 hover:text-[#00daf3] hover:border-[#00daf3]/50 text-white text-xs font-bold font-mono transition-all duration-200 border border-white/10 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(0,218,243,0.25)]"
        >
          {activeExportType === 'pdf' ? (
            <>
              <Loader2 size={14} className="animate-spin text-[#00daf3]" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
              <span>Export PDF</span>
            </>
          )}
        </button>

        {/* Print Report Button */}
        <button
          onClick={onPrint}
          disabled={!hasRecords || activeExportType !== null}
          title={hasRecords ? "Print current report" : "No data available to print"}
          className="relative group flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00daf3]/10 hover:bg-[#00daf3]/25 text-[#00daf3] text-xs font-bold font-mono transition-all duration-200 border border-[#00daf3]/40 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer shadow-[0_0_15px_rgba(0,218,243,0.15)] hover:shadow-[0_0_25px_rgba(0,218,243,0.35)]"
        >
          {activeExportType === 'print' ? (
            <>
              <Loader2 size={14} className="animate-spin text-[#00daf3]" />
              <span className="hidden sm:inline">Preparing Print...</span>
            </>
          ) : (
            <>
              <Printer size={14} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Print Report</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

