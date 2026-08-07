import React, { useState, useMemo } from 'react';
import { History, Trash2, ArrowRight, ShieldAlert, ShieldCheck, MessageSquare, Mail, MessageCircle, Globe, Mic, Image, QrCode, Filter, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useRecentScans } from '../../hooks/useRecentScans';
import { ScanResult } from '../../types';
import { Tooltip } from './Tooltip';

interface RecentScansSidebarProps {
  onSelectScan?: (scan: ScanResult) => void;
  className?: string;
  compact?: boolean;
}

type SeverityFilter = 'ALL' | 'CRITICAL' | 'WARNING' | 'SAFE';

export const RecentScansSidebar: React.FC<RecentScansSidebarProps> = ({
  onSelectScan,
  className = '',
  compact = false,
}) => {
  const { t } = useTranslation();
  const { recentScans, removeScan, clearScans } = useRecentScans();
  const [activeFilter, setActiveFilter] = useState<SeverityFilter>('ALL');

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sms': return <MessageSquare size={14} className="text-[#11875D]" />;
      case 'email': return <Mail size={14} className="text-[#11875D]" />;
      case 'whatsapp': return <MessageCircle size={14} className="text-[#10B981]" />;
      case 'url': return <Globe size={14} className="text-[#11875D]" />;
      case 'voice': return <Mic size={14} className="text-[#EF4444]" />;
      case 'image': case 'screenshot': return <Image size={14} className="text-[#11875D]" />;
      case 'qr': return <QrCode size={14} className="text-[#11875D]" />;
      default: return <Globe size={14} className="text-[#11875D]" />;
    }
  };

  const getRiskBadge = (score: number, level?: string) => {
    const isCritical = score >= 80 || level === 'CRITICAL';
    const isHighRisk = (score >= 60 && score < 80) || level === 'HIGH' || level === 'DANGEROUS';
    const isWarning = (score >= 40 && score < 60) || level === 'SUSPICIOUS' || level === 'WARNING' || level === 'MEDIUM';

    if (isCritical) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 border border-red-300 text-[#991B1B] flex items-center gap-1 shrink-0">
          <ShieldAlert size={11} /> Critical ({score}%)
        </span>
      );
    }
    if (isHighRisk) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 border border-red-200 text-[#EF4444] flex items-center gap-1 shrink-0">
          <ShieldAlert size={11} /> High Risk ({score}%)
        </span>
      );
    }
    if (isWarning) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 border border-amber-200 text-[#F59E0B] flex items-center gap-1 shrink-0">
          <AlertTriangle size={11} /> Warning ({score}%)
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-[#10B981] flex items-center gap-1 shrink-0">
        <ShieldCheck size={11} /> Safe ({score}%)
      </span>
    );
  };

  const formatTimestamp = (ts: string) => {
    try {
      const date = new Date(ts);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} min ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays === 1) return 'Yesterday';
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch {
      return ts || 'Just now';
    }
  };

  const counts = useMemo(() => {
    let critical = 0;
    let warning = 0;
    let safe = 0;

    recentScans.forEach((scan) => {
      const isCritical = scan.score >= 60 || scan.level === 'CRITICAL' || scan.level === 'DANGEROUS' || scan.level === 'HIGH';
      const isWarning = (scan.score >= 40 && scan.score < 60) || scan.level === 'SUSPICIOUS' || scan.level === 'WARNING' || scan.level === 'MEDIUM';
      if (isCritical) critical++;
      else if (isWarning) warning++;
      else safe++;
    });

    return { all: recentScans.length, critical, warning, safe };
  }, [recentScans]);

  const filteredScans = useMemo(() => {
    return recentScans.filter((scan) => {
      const isCritical = scan.score >= 60 || scan.level === 'CRITICAL' || scan.level === 'DANGEROUS' || scan.level === 'HIGH';
      const isWarning = (scan.score >= 40 && scan.score < 60) || scan.level === 'SUSPICIOUS' || scan.level === 'WARNING' || scan.level === 'MEDIUM';
      const isSafe = scan.score < 40 || scan.level === 'SAFE' || scan.level === 'CLEAN';

      if (activeFilter === 'CRITICAL') return isCritical;
      if (activeFilter === 'WARNING') return isWarning;
      if (activeFilter === 'SAFE') return isSafe;
      return true;
    });
  }, [recentScans, activeFilter]);

  return (
    <div className={`bg-white rounded-[20px] p-5 lg:p-6 border border-[#E5E7EB] shadow-xs flex flex-col gap-4 w-full ${className}`}>
      
      {/* HEADER REDESIGN */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3.5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-center text-[#11875D] shrink-0">
              <History size={16} />
            </div>
            <h3 className="text-base font-bold text-[#111827]">
              Recent Scans
            </h3>
          </div>
          <p className="text-xs text-[#64748B] font-medium">
            Saved scan history and threat analysis records
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 text-[#11875D] text-xs font-bold">
            {filteredScans.length} / {recentScans.length} Stored
          </span>

          {recentScans.length > 0 && (
            <Tooltip content="Clear All History" position="left">
              <button
                onClick={clearScans}
                className="p-1.5 text-[#64748B] hover:text-[#EF4444] hover:bg-red-50 rounded-[10px] transition-colors cursor-pointer border border-[#E5E7EB]"
                aria-label="Clear all recent scans"
              >
                <Trash2 size={14} />
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      {/* FILTER SECTION (PILL BUTTONS) */}
      {recentScans.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3 py-1.5 rounded-[12px] text-xs font-bold transition-all cursor-pointer shrink-0 border ${
              activeFilter === 'ALL'
                ? 'bg-[#11875D] text-white border-[#11875D] shadow-2xs'
                : 'bg-white text-[#64748B] hover:text-[#111827] border-[#E5E7EB] hover:border-[#11875D]'
            }`}
          >
            All ({counts.all})
          </button>

          <button
            onClick={() => setActiveFilter('CRITICAL')}
            className={`px-3 py-1.5 rounded-[12px] text-xs font-bold transition-all cursor-pointer shrink-0 border ${
              activeFilter === 'CRITICAL'
                ? 'bg-[#11875D] text-white border-[#11875D] shadow-2xs'
                : 'bg-white text-[#64748B] hover:text-[#EF4444] border-[#E5E7EB] hover:border-[#11875D]'
            }`}
          >
            Critical ({counts.critical})
          </button>

          <button
            onClick={() => setActiveFilter('WARNING')}
            className={`px-3 py-1.5 rounded-[12px] text-xs font-bold transition-all cursor-pointer shrink-0 border ${
              activeFilter === 'WARNING'
                ? 'bg-[#11875D] text-white border-[#11875D] shadow-2xs'
                : 'bg-white text-[#64748B] hover:text-[#F59E0B] border-[#E5E7EB] hover:border-[#11875D]'
            }`}
          >
            Warning ({counts.warning})
          </button>

          <button
            onClick={() => setActiveFilter('SAFE')}
            className={`px-3 py-1.5 rounded-[12px] text-xs font-bold transition-all cursor-pointer shrink-0 border ${
              activeFilter === 'SAFE'
                ? 'bg-[#11875D] text-white border-[#11875D] shadow-2xs'
                : 'bg-white text-[#64748B] hover:text-[#11875D] border-[#E5E7EB] hover:border-[#11875D]'
            }`}
          >
            Safe ({counts.safe})
          </button>
        </div>
      )}

      {/* SCAN CARDS (OPTIMIZED HORIZONTAL PROPORTIONS) */}
      <div className="space-y-3 overflow-y-auto max-h-[440px] pr-1 hide-scrollbar">
        {filteredScans.length === 0 ? (
          /* EMPTY STATE */
          <div className="py-10 text-center flex flex-col items-center justify-center gap-3 border border-dashed border-[#E5E7EB] rounded-[20px] p-6 bg-[#F8FAFC]">
            <div className="w-12 h-12 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-center text-[#11875D]">
              <ShieldCheck size={24} />
            </div>
            <h4 className="text-sm font-bold text-[#111827]">No Recent Scans</h4>
            <p className="text-xs text-[#64748B] font-medium max-w-xs leading-relaxed">
              Your completed scans will appear here.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredScans.map((scan) => (
              <motion.div
                key={scan.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectScan?.(scan)}
                className="bg-white rounded-[16px] px-4 py-3 border border-[#E5E7EB] shadow-xs hover:border-[#11875D] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-2.5 group relative min-h-[105px]"
              >
                {/* TOP ROW: TYPE BADGE (LEFT) | RISK BADGE (RIGHT) */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-[6px] bg-[#F8FAFC] border border-[#E5E7EB]">
                      {getTypeIcon(scan.type)}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#11875D]">
                      {scan.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {getRiskBadge(scan.score, scan.level)}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeScan(scan.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-[#64748B] hover:text-[#EF4444] hover:bg-red-50 rounded-[6px] transition-all cursor-pointer"
                      aria-label="Delete scan item"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                {/* MIDDLE: MESSAGE PREVIEW (2 LINES MAX) */}
                <p className="text-xs font-semibold text-[#111827] line-clamp-2 leading-relaxed group-hover:text-[#11875D] transition-colors">
                  "{scan.content}"
                </p>

                {/* BOTTOM ROW: TIMESTAMP (LEFT) | ANALYZE BUTTON (RIGHT) */}
                <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]">
                  <span className="text-[11px] text-[#64748B] font-medium">
                    {formatTimestamp(scan.timestamp)}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectScan?.(scan);
                    }}
                    className="px-2.5 py-1 rounded-[8px] bg-white border border-[#E5E7EB] text-[#11875D] hover:bg-[#11875D] hover:text-white hover:border-[#11875D] font-bold text-[11px] flex items-center gap-1 transition-all shadow-2xs cursor-pointer"
                  >
                    <span>Analyze</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
