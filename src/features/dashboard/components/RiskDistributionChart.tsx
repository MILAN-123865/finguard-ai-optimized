import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieCyberTooltip } from '../../../components/charts/CustomChartTooltip';

interface RiskDistributionChartProps {
  distribution?: {
    safe: number;
    suspicious: number;
    dangerous: number;
    critical: number;
  };
}

export const RiskDistributionChart: React.FC<RiskDistributionChartProps> = ({ distribution }) => {
  const data = [
    { name: 'Safe Verified', value: distribution?.safe || 82100, color: '#00daf3' },
    { name: 'Suspicious', value: distribution?.suspicious || 24330, color: '#ffd166' },
    { name: 'Dangerous', value: distribution?.dangerous || 12890, color: '#ff9f1c' },
    { name: 'Critical PhishKit', value: distribution?.critical || 5530, color: '#ff5252' },
  ];

  return (
    <div className="w-full h-72 flex flex-col justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="#0a0d1a" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<PieCyberTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span className="text-xs font-mono text-[#bac9cc]">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
