import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity } from 'lucide-react';
import { CustomCyberTooltip } from '../../../components/charts/CustomChartTooltip';

export const WeeklyThreatTrend: React.FC = () => {
  const data = [
    { day: 'Mon', count: 4 },
    { day: 'Tue', count: 7 },
    { day: 'Wed', count: 2 },
    { day: 'Thu', count: 12 },
    { day: 'Fri', count: 5 },
    { day: 'Sat', count: 1 },
    { day: 'Sun', count: 3 },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/10 h-full shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={18} className="text-[#00daf3]" />
        <h3 className="font-bold text-white">Weekly Threat Trend</h3>
      </div>
      
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis 
              dataKey="day" 
              stroke="#bac9cc" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              fontFamily="JetBrains Mono" 
            />
            <YAxis 
              stroke="#bac9cc" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              fontFamily="JetBrains Mono" 
            />
            <Tooltip 
              content={<CustomCyberTooltip titlePrefix="Day" unit="Threats" showRatios={false} />}
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              name="Threats Detected"
              stroke="#00daf3" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#0a0d1a', stroke: '#00daf3', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#00daf3', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
