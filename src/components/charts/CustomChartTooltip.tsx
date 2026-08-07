import React from 'react';
import { Activity } from 'lucide-react';

interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string;
  payload?: any;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  titlePrefix?: string;
  unit?: string;
  showRatios?: boolean;
}

export const CustomCyberTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  titlePrefix = 'Telemetry Point',
  unit = '',
  showRatios = true,
}) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload || {};

  return (
    <div className="bg-white border border-[#E4E7E5] rounded-[16px] p-3.5 shadow-md min-w-[200px] text-xs pointer-events-none transition-all">
      <div className="flex items-center justify-between pb-2 border-b border-[#E4E7E5] mb-2">
        <div className="flex items-center gap-1.5 text-[#11875D] font-bold">
          <Activity size={14} />
          <span>{label ? `${titlePrefix}: ${label}` : titlePrefix}</span>
        </div>
      </div>

      <div className="space-y-1.5">
        {payload.map((item, idx) => {
          const val = typeof item.value === 'number' ? item.value.toLocaleString() : item.value;
          const color = item.color || '#11875D';
          
          return (
            <div key={idx} className="flex items-center justify-between gap-4 bg-[#F8FAFC] px-2.5 py-1 rounded-[8px] border border-[#E4E7E5]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-[#64748B] font-medium capitalize">{item.name || item.dataKey}:</span>
              </div>
              <span className="font-bold text-[#111827]">
                {val} {unit}
              </span>
            </div>
          );
        })}
      </div>

      {showRatios && data.scans && data.threats !== undefined && (
        <div className="mt-2 pt-2 border-t border-[#E4E7E5] space-y-1 text-xs">
          <div className="flex items-center justify-between text-[#64748B]">
            <span>Clean Traffic:</span>
            <span className="text-[#10B981] font-bold">
              {(data.scans - data.threats).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-[#64748B]">
            <span>Threat Rate:</span>
            <span className={data.threats > 0 ? 'text-[#EF4444] font-bold' : 'text-[#10B981] font-bold'}>
              {((data.threats / data.scans) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export const PieCyberTooltip: React.FC<{
  active?: boolean;
  payload?: any[];
  totalVolume?: number;
}> = ({ active, payload, totalVolume = 100 }) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  const name = item.name || item.payload?.name || 'Category';
  const val = typeof item.value === 'number' ? item.value : 0;
  const pct = totalVolume > 0 ? ((val / totalVolume) * 100).toFixed(1) : 0;

  return (
    <div className="bg-white border border-[#E4E7E5] rounded-[16px] p-3 shadow-md text-xs">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color || item.fill }} />
        <span className="font-bold text-[#111827]">{name}</span>
      </div>
      <div className="text-[#64748B]">
        Count: <span className="font-bold text-[#111827]">{val.toLocaleString()}</span> ({pct}%)
      </div>
    </div>
  );
};
