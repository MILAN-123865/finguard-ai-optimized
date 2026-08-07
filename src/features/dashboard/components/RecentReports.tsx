import React from 'react';
import { ScamReport } from '../../../types';
import { FileText, CheckCircle2, Clock, AlertTriangle, ShieldAlert } from 'lucide-react';

interface RecentReportsProps {
  reports: ScamReport[];
  onReportClick?: () => void;
}

export const RecentReports: React.FC<RecentReportsProps> = ({ reports, onReportClick }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'RESOLVED':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-[10px] font-bold flex items-center gap-1">
            <CheckCircle2 size={12} />
            <span>RESOLVED</span>
          </span>
        );
      case 'PENDING':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-[10px] font-bold flex items-center gap-1">
            <Clock size={12} />
            <span>PENDING VERIFICATION</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#bac9cc] border border-white/20 font-mono text-[10px] font-bold">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4 shadow-2xl">
      <div className="flex justify-between items-center pb-3 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText size={18} className="text-red-400" />
            <span>Community Scam Reports Feed</span>
          </h3>
          <p className="text-xs font-mono text-[#bac9cc] mt-0.5">
            Crowdsourced intelligence submissions linked to report.py API
          </p>
        </div>

        {onReportClick && (
          <button
            onClick={onReportClick}
            className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 transition-all font-mono text-xs font-bold flex items-center gap-1.5"
          >
            <ShieldAlert size={14} />
            <span>Report Scam</span>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {(reports || []).map((rep) => (
          <div
            key={rep.id}
            className="p-4 rounded-2xl bg-[#0a0d1a]/80 border border-white/10 hover:border-[#00e5ff]/40 transition-all space-y-2"
          >
            <div className="flex justify-between items-start gap-3">
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-white">{rep.title}</h4>
                <p className="text-xs text-[#bac9cc] line-clamp-1">{rep.description}</p>
              </div>
              {getStatusBadge(rep.status)}
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#bac9cc] pt-2 border-t border-white/5">
              <span>Source: {rep.senderInfo || rep.scamUrl || 'Community Flag'}</span>
              <span>Reporter: {rep.reporterName || 'Anonymous'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
