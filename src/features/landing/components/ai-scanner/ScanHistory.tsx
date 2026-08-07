import React from 'react';
import { ScanResult } from './types';
import { History, ShieldAlert, ShieldCheck, ArrowRight, AlertTriangle } from 'lucide-react';

interface ScanHistoryProps {
  history: ScanResult[];
  onSelectScan?: (scan: ScanResult) => void;
}

export const ScanHistory: React.FC<ScanHistoryProps> = ({ history, onSelectScan }) => {
  if (history.length === 0) return null;

  const formatTimestamp = (ts: string | number) => {
    try {
      const date = new Date(ts);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} min ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch {
      return 'Just now';
    }
  };

  const getRiskBadge = (score: number, level?: string) => {
    const isCritical = score >= 80 || level === 'Critical';
    const isHighRisk = (score >= 60 && score < 80) || level === 'High';
    const isWarning = (score >= 40 && score < 60) || level === 'Medium';

    if (isCritical) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 border border-red-300 text-[#991B1B] flex items-center gap-1">
          <ShieldAlert size={11} /> Critical ({score}%)
        </span>
      );
    }
    if (isHighRisk) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 border border-red-200 text-[#EF4444] flex items-center gap-1">
          <ShieldAlert size={11} /> High Risk ({score}%)
        </span>
      );
    }
    if (isWarning) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 border border-amber-200 text-[#F59E0B] flex items-center gap-1">
          <AlertTriangle size={11} /> Warning ({score}%)
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-[#10B981] flex items-center gap-1">
        <ShieldCheck size={11} /> Safe ({score}%)
      </span>
    );
  };

  return (
    <div className="bg-white rounded-[20px] p-6 border border-[#E5E7EB] shadow-xs flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-[#E5E7EB] pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-center text-[#11875D]">
              <History size={16} />
            </div>
            <h3 className="text-base font-bold text-[#111827]">Recent Scans</h3>
          </div>
          <p className="text-xs text-[#64748B] font-medium">
            Saved scan history and threat analysis records
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 text-[#11875D] text-xs font-bold shrink-0">
          {history.length} Stored
        </span>
      </div>

      {/* Cards List */}
      <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1 hide-scrollbar">
        {history.map((scan) => (
          <div
            key={scan.id}
            onClick={() => onSelectScan?.(scan)}
            className="bg-white rounded-[16px] p-4 border border-[#E5E7EB] shadow-xs hover:border-[#11875D] hover:shadow-md transition-all cursor-pointer flex flex-col gap-3 group"
          >
            {/* Top Row: Type & Risk Badge */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#11875D]">
                {scan.type}
              </span>
              {getRiskBadge(scan.score ?? scan.riskScore ?? 0, scan.threatLevel)}
            </div>

            {/* Message Preview (max 2 lines) */}
            <p className="text-xs font-semibold text-[#111827] line-clamp-2 leading-relaxed group-hover:text-[#11875D] transition-colors">
              "{scan.content}"
            </p>

            {/* Bottom Row: Timestamp & Outlined Analyze Button */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]">
              <span className="text-xs text-[#64748B] font-medium">
                {formatTimestamp(scan.timestamp)}
              </span>

              <button
                type="button"
                className="px-3 py-1 rounded-[10px] bg-white border border-[#E5E7EB] text-[#11875D] hover:bg-[#11875D] hover:text-white hover:border-[#11875D] font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                <span>Analyze</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
