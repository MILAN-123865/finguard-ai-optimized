import React from 'react';
import { History, ArrowRight } from 'lucide-react';
import { ScanResult } from '../../types';
import { useRecentScans } from '../../hooks/useRecentScans';

interface RecentScanPreviewProps {
  scans?: ScanResult[];
  onViewAll?: () => void;
  onSelectScan?: (scan: ScanResult) => void;
}

export const RecentScanPreview: React.FC<RecentScanPreviewProps> = ({ scans, onViewAll, onSelectScan }) => {
  const { recentScans } = useRecentScans();
  const displayScans = scans && scans.length > 0 ? scans : recentScans;

  if (displayScans.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2 uppercase tracking-wider">
          <History size={16} className="text-[#11875D]" />
          Recent Scans
        </h3>
        {onViewAll && (
          <button 
            onClick={onViewAll}
            className="text-xs font-bold text-[#11875D] hover:underline transition-colors flex items-center gap-1 cursor-pointer"
          >
            View Full History <ArrowRight size={12} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayScans.slice(0, 2).map((scan, i) => (
          <div 
            key={scan.id || i} 
            onClick={() => onSelectScan?.(scan)}
            className="bg-white rounded-[20px] p-4 border border-[#E5E7EB] hover:border-[#11875D] shadow-xs transition-all flex gap-4 items-start group cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              scan.level === 'DANGEROUS' || scan.level === 'CRITICAL' || scan.score >= 70
                ? 'bg-red-50 text-[#EF4444] border border-red-200' 
                : 'bg-[#DDF2EA] text-[#11875D] border border-[#11875D]/30'
            }`}>
              <span className="font-bold text-xs">{scan.score}%</span>
            </div>
            
            <div className="space-y-1 overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] text-[#11875D] uppercase tracking-wider font-bold">{scan.type}</span>
                <span className="text-[10px] text-[#64748B] font-medium truncate">
                  {scan.timestamp ? new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
              <p className="text-xs text-[#111827] font-semibold line-clamp-1 group-hover:text-[#11875D] transition-colors">
                {scan.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
