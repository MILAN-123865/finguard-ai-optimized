import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { CustomCyberTooltip } from './CustomChartTooltip';

interface ThreatTelemetryChartProps {
  data: { time: string; scans: number; threats: number }[];
}

export const ThreatTelemetryChart: React.FC<ThreatTelemetryChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="scansGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00daf3" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#00daf3" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="threatsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff5252" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#ff5252" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" stroke="#bac9cc" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#bac9cc" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomCyberTooltip titlePrefix="Time Point" />} />
          <Area type="monotone" dataKey="scans" stroke="#00daf3" strokeWidth={2} fillOpacity={1} fill="url(#scansGrad)" name="Total Scans" />
          <Area type="monotone" dataKey="threats" stroke="#ff5252" strokeWidth={2} fillOpacity={1} fill="url(#threatsGrad)" name="Threats Found" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
