import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { CustomCyberTooltip } from '../../../components/charts/CustomChartTooltip';

interface WeeklyActivityChartProps {
  data?: Array<{ day: string; scans: number; threats: number; safe: number }>;
}

export const WeeklyActivityChart: React.FC<WeeklyActivityChartProps> = ({ data }) => {
  const chartData = data || [
    { day: 'Mon', scans: 1240, threats: 98, safe: 1142 },
    { day: 'Tue', scans: 1580, threats: 134, safe: 1446 },
    { day: 'Wed', scans: 1890, threats: 182, safe: 1708 },
    { day: 'Thu', scans: 2100, threats: 210, safe: 1890 },
    { day: 'Fri', scans: 1950, threats: 165, safe: 1785 },
    { day: 'Sat', scans: 1320, threats: 88, safe: 1232 },
    { day: 'Sun', scans: 1482, threats: 124, safe: 1358 },
  ];

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="scansGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="threatsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff5252" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ff5252" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis
            dataKey="day"
            stroke="#bac9cc"
            fontSize={11}
            tickLine={false}
            fontFamily="JetBrains Mono"
          />
          <YAxis
            stroke="#bac9cc"
            fontSize={11}
            tickLine={false}
            fontFamily="JetBrains Mono"
          />
          <Tooltip content={<CustomCyberTooltip titlePrefix="Day" />} />
          <Area
            type="monotone"
            dataKey="safe"
            stroke="#078A68"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#safeGradient)"
            name="Safe"
          />
          <Area
            type="monotone"
            dataKey="threats"
            stroke="#ff5252"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#threatsGradient)"
            name="Threats"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
