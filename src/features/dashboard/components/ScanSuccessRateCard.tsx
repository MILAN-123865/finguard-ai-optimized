import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Target } from 'lucide-react';

export const ScanSuccessRateCard: React.FC = () => {
  const data = [
    { name: 'Safe', value: 85 },
    { name: 'Threats', value: 15 },
  ];
  
  const COLORS = ['#00daf3', '#ff5252'];

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/10 h-full shadow-lg relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Target size={18} className="text-[#00daf3]" />
          Scan Success Rate
        </h3>
        <span className="text-2xl font-bold font-mono text-white">85%</span>
      </div>

      <div className="h-32 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <p className="text-[10px] text-[#bac9cc] font-mono uppercase">Safe Scans</p>
        </div>
      </div>
    </div>
  );
};
