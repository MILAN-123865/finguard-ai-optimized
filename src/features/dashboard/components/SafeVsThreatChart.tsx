import React, { useState, useEffect, useMemo } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import { ShieldCheck, ShieldAlert, Activity, Calendar, BarChart3, PieChart as PieIcon, Sparkles, CheckCircle2, AlertOctagon, Loader2, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { CustomCyberTooltip } from '../../../components/charts/CustomChartTooltip';
import { Select } from '../../../components/ui/Select';
import { historyService, HistoryAnalyticsData } from '../../../services/historyService';

interface SafeVsThreatChartProps {
  className?: string;
  compact?: boolean;
}

export const SafeVsThreatChart: React.FC<SafeVsThreatChartProps> = ({
  className = '',
  compact = false,
}) => {
  const { t } = useTranslation();

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');
  const [chartType, setChartType] = useState<'area' | 'bar' | 'pie'>('area');
  const [analyticsData, setAnalyticsData] = useState<HistoryAnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const data = await historyService.getHistoryAnalytics(timeRange);
        if (isMounted) {
          setAnalyticsData(data);
        }
      } catch (err) {
        console.error('Error fetching analytics history:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAnalytics();
    return () => {
      isMounted = false;
    };
  }, [timeRange]);

  const totalSafe = analyticsData?.totalSafe ?? 0;
  const totalThreats = analyticsData?.totalThreats ?? 0;
  const totalScans = analyticsData?.totalScans ?? 0;
  const safePercentage = analyticsData?.safePercentage ?? 0;
  const threatPercentage = analyticsData?.threatPercentage ?? 0;
  const accuracy = analyticsData?.accuracy ?? 99.8;
  const chartData = analyticsData?.chartData ?? [];

  const pieData = useMemo(() => {
    if (analyticsData?.pieData && analyticsData.pieData.length > 0) {
      return analyticsData.pieData;
    }
    return [
      { name: t('scanner.safeDetections', 'Safe Detections'), value: totalSafe, color: '#11875D' },
      { name: t('scanner.threatDetections', 'Threat Detections'), value: totalThreats, color: '#EF4444' },
    ];
  }, [analyticsData, totalSafe, totalThreats, t]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-[20px] p-5 sm:p-6 border border-[#E4E7E5] shadow-xs flex flex-col gap-5 relative ${className}`}
    >
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E4E7E5] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-[12px] bg-[#DDF2EA] text-[#11875D]">
            <Activity size={20} />
          </div>
          <div>
            <h3 className="font-bold text-[#111827] text-base sm:text-lg flex items-center gap-2">
              <span>{t('scanner.distributionTitle', 'Historical Scan Analytics')}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#DDF2EA] text-[#11875D] text-[11px] font-bold">
                Analytics Engine
              </span>
            </h3>
            <p className="text-xs text-[#64748B]">
              {t('scanner.distributionSub', 'Telemetry breakdown of Safe vs. Threat verdicts over time')}
            </p>
          </div>
        </div>

        {/* View Switches & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-[#F8FAFC] border border-[#E4E7E5] rounded-[16px] p-1">
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 rounded-[12px] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                chartType === 'area'
                  ? 'bg-[#11875D] text-white shadow-2xs'
                  : 'text-[#64748B] hover:text-[#111827]'
              }`}
            >
              <Activity size={13} />
              <span className="hidden sm:inline">{t('scanner.areaView', 'Area')}</span>
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 rounded-[12px] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                chartType === 'bar'
                  ? 'bg-[#11875D] text-white shadow-2xs'
                  : 'text-[#64748B] hover:text-[#111827]'
              }`}
            >
              <BarChart3 size={13} />
              <span className="hidden sm:inline">{t('scanner.barView', 'Bar')}</span>
            </button>
            <button
              onClick={() => setChartType('pie')}
              className={`px-3 py-1 rounded-[12px] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                chartType === 'pie'
                  ? 'bg-[#11875D] text-white shadow-2xs'
                  : 'text-[#64748B] hover:text-[#111827]'
              }`}
            >
              <PieIcon size={13} />
              <span className="hidden sm:inline">{t('scanner.pieView', 'Pie')}</span>
            </button>
          </div>

          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            leftIcon={<Calendar size={13} />}
            options={[
              { value: '7d', label: '7 Days' },
              { value: '30d', label: '30 Days' },
              { value: 'all', label: 'All Time' }
            ]}
            size="sm"
          />
        </div>
      </div>

      {/* Metric Counters Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-[16px] bg-[#F8FAFC] border border-[#E4E7E5] flex flex-col gap-1">
          <span className="text-xs text-[#64748B] font-bold uppercase tracking-wider">
            {t('scanner.totalAnalyzed', 'Total Analyzed')}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-[#111827]">
            {isLoading ? '...' : totalScans.toLocaleString()}
          </span>
          <span className="text-[11px] text-[#11875D] font-medium flex items-center gap-1">
            <Sparkles size={11} /> Active AI Coverage
          </span>
        </div>

        <div className="p-3.5 rounded-[16px] bg-[#DDF2EA] border border-[#11875D]/30 flex flex-col gap-1">
          <span className="text-xs text-[#11875D] font-bold uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck size={12} /> {t('scanner.safeDetections', 'Safe Detections')}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-[#11875D]">
            {isLoading ? '...' : `${totalSafe.toLocaleString()} (${safePercentage}%)`}
          </span>
          <span className="text-[11px] text-[#11875D] font-medium flex items-center gap-1">
            <CheckCircle2 size={11} /> Clean Communications
          </span>
        </div>

        <div className="p-3.5 rounded-[16px] bg-red-50 border border-red-200 flex flex-col gap-1">
          <span className="text-xs text-[#EF4444] font-bold uppercase tracking-wider flex items-center gap-1">
            <ShieldAlert size={12} /> {t('scanner.threatDetections', 'Threat Detections')}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-[#EF4444]">
            {isLoading ? '...' : `${totalThreats.toLocaleString()} (${threatPercentage}%)`}
          </span>
          <span className="text-[11px] text-[#EF4444] font-medium flex items-center gap-1">
            <AlertOctagon size={11} /> Flagged Threats
          </span>
        </div>

        <div className="p-3.5 rounded-[16px] bg-[#F8FAFC] border border-[#E4E7E5] flex flex-col gap-1">
          <span className="text-xs text-[#64748B] font-bold uppercase tracking-wider">
            {t('scanner.aiPrecision', 'Model Accuracy')}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-[#111827]">
            {accuracy}%
          </span>
          <span className="text-[11px] text-[#64748B] font-medium">
            AI Engine Standard
          </span>
        </div>
      </div>

      {/* Main Recharts Container */}
      <div className="w-full h-[280px] sm:h-[320px] relative mt-2">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-[16px] border border-[#E4E7E5] gap-2 z-10"
            >
              <Loader2 className="w-7 h-7 text-[#11875D] animate-spin" />
              <span className="text-xs font-semibold text-[#64748B]">
                Loading telemetry analytics...
              </span>
            </motion.div>
          ) : chartData.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center p-6 text-center border border-[#E4E7E5] rounded-[16px] bg-[#F8FAFC] gap-2"
            >
              <Database size={24} className="text-[#64748B]" />
              <h4 className="font-bold text-[#111827] text-sm">No Telemetry Recorded</h4>
              <p className="text-xs text-[#64748B] max-w-md">
                No scan history recorded for this time range.
              </p>
            </motion.div>
          ) : chartType === 'area' ? (
            <ResponsiveContainer width="100%" height="100%" key={`area-${timeRange}`}>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="safeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#11875D" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#11875D" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7E5" vertical={false} />
                <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomCyberTooltip titlePrefix="Timeframe" unit="Scans" />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="safe"
                  name="Safe Verdicts"
                  stroke="#11875D"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#safeGradient)"
                  dot={{ r: 3, fill: '#11875D', strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#FFFFFF', stroke: '#11875D', strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="threat"
                  name="Threat Detections"
                  stroke="#EF4444"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#threatGradient)"
                  dot={{ r: 3, fill: '#EF4444', strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#FFFFFF', stroke: '#EF4444', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : chartType === 'bar' ? (
            <ResponsiveContainer width="100%" height="100%" key={`bar-${timeRange}`}>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7E5" vertical={false} />
                <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomCyberTooltip titlePrefix="Timeframe" unit="Scans" />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
                />
                <Bar dataKey="safe" name="Safe Verdicts" fill="#11875D" radius={[6, 6, 0, 0]} />
                <Bar dataKey="threat" name="Threat Detections" fill="#EF4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-between gap-6 p-2" key={`pie-${timeRange}`}>
              <div className="w-full md:w-1/2 h-[220px] sm:h-[260px] relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={3} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-[#111827]">
                    {totalScans}
                  </span>
                  <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">
                    Total Scans
                  </span>
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center gap-3">
                <div className="p-3.5 rounded-[16px] bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#11875D] shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-[#111827] block">
                        {t('scanner.safeDetections', 'Safe Detections')}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#11875D] block">
                      {totalSafe.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#11875D] font-bold">
                      {safePercentage}%
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-[16px] bg-red-50 border border-red-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444] shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-[#111827] block">
                        {t('scanner.threatDetections', 'Threat Detections')}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#EF4444] block">
                      {totalThreats.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#EF4444] font-bold">
                      {threatPercentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
