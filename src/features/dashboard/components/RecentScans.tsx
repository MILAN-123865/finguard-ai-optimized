import React, { useState, useMemo } from 'react';
import { ScanResult } from '../../../types';
import { 
  MessageSquare, Mail, MessageCircle, Globe, ShieldAlert, ShieldCheck, 
  Sparkles, X, Clock, AlertTriangle, QrCode, FileText, ChevronDown, ChevronUp,
  Cpu, Terminal, ArrowRight, Shield, CheckCircle2, Lock, Filter, ArrowUpDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Select } from '../../../components/ui/Select';

interface RecentScansProps {
  scans?: ScanResult[];
  onInspectScan?: (scan: ScanResult) => void;
}

type SeverityFilter = 'ALL' | 'CRITICAL' | 'WARNING' | 'SAFE';
type SortOrder = 'NEWEST' | 'HIGHEST_RISK' | 'LOWEST_RISK';

const defaultScans: ScanResult[] = [
  {
    id: 'SCN-9981',
    type: 'url',
    content: 'https://secure-verify-chase-update.net/login?token=9281',
    score: 98,
    level: 'CRITICAL',
    confidence: 99,
    keywords: ['phishing', 'fake-chase', 'credential-harvest', 'invalid-ssl', 'homograph-attack'],
    timestamp: '2 mins ago',
    recommendation: 'Block domain immediately across network firewalls. Do not enter credentials. Report domain to domain registrar abuse team.'
  },
  {
    id: 'SCN-9980',
    type: 'sms',
    content: 'USPS: Your package #88214 is on hold due to missing address fee ($1.99). Click: bit.ly/usps-track-fee',
    score: 86,
    level: 'DANGEROUS',
    confidence: 94,
    keywords: ['smishing', 'usps-impersonation', 'shortened-url', 'urgency-bait'],
    timestamp: '14 mins ago',
    recommendation: 'Delete message immediately, block sender phone number, and inform users regarding postal tracking scams.'
  },
  {
    id: 'SCN-9979',
    type: 'email',
    content: 'Invoice #INV-2026-881 attached from Quickbooks Online Support <billing@qbo-service-verify.com>',
    score: 72,
    level: 'SUSPICIOUS',
    confidence: 88,
    keywords: ['mismatched-dkim', 'macro-payload', 'invoice-scam', 'typosquatting'],
    timestamp: '38 mins ago',
    recommendation: 'Quarantine email in mail gateway. Do not download or open PDF attachments. Flag domain for security review.'
  },
  {
    id: 'SCN-9978',
    type: 'whatsapp',
    content: 'Hey Mom, I lost my phone and need $450 urgently for my rent today please send to this Venmo @family-help!',
    score: 91,
    level: 'DANGEROUS',
    confidence: 96,
    keywords: ['family-impersonation', 'urgent-transfer', 'whatsapp-fraud', 'social-engineering'],
    timestamp: '1 hour ago',
    recommendation: 'Do not send funds. Contact the family member directly via an established secondary communication line.'
  },
  {
    id: 'SCN-9977',
    type: 'url',
    content: 'https://github.com/MILAN-123865/finguard-ai-optimized',
    score: 4,
    level: 'SAFE',
    confidence: 99,
    keywords: ['verified-domain', 'open-source', 'valid-ssl', 'clean-reputation'],
    timestamp: '2 hours ago',
    recommendation: 'No security threat detected. Safe for normal navigation and repository access.'
  }
];

export const RecentScans: React.FC<RecentScansProps> = ({ scans, onInspectScan }) => {
  const [expandedId, setExpandedId] = useState<string | null>('SCN-9981'); // default expand first item for instant preview
  const [selectedScan, setSelectedScan] = useState<ScanResult | null>(null);
  const [activeFilter, setActiveFilter] = useState<SeverityFilter>('ALL');
  const [sortBy, setSortBy] = useState<SortOrder>('NEWEST');

  const rawScans = useMemo(() => {
    return scans && scans.length > 0 ? scans : defaultScans;
  }, [scans]);

  // Counts breakdown
  const counts = useMemo(() => {
    let critical = 0;
    let warning = 0;
    let safe = 0;

    rawScans.forEach((scan) => {
      const isCritical = scan.score >= 70 || scan.level === 'CRITICAL' || scan.level === 'DANGEROUS';
      const isWarning = (scan.score >= 40 && scan.score < 70) || scan.level === 'SUSPICIOUS' || scan.level === 'WARNING';
      if (isCritical) critical++;
      else if (isWarning) warning++;
      else safe++;
    });

    return { all: rawScans.length, critical, warning, safe };
  }, [rawScans]);

  // Filter and sort display items
  const displayScans = useMemo(() => {
    let list = rawScans.filter((scan) => {
      const isCritical = scan.score >= 70 || scan.level === 'CRITICAL' || scan.level === 'DANGEROUS';
      const isWarning = (scan.score >= 40 && scan.score < 70) || scan.level === 'SUSPICIOUS' || scan.level === 'WARNING';
      const isSafe = scan.score < 40 || scan.level === 'SAFE' || scan.level === 'CLEAN';

      if (activeFilter === 'CRITICAL') return isCritical;
      if (activeFilter === 'WARNING') return isWarning;
      if (activeFilter === 'SAFE') return isSafe;
      return true;
    });

    if (sortBy === 'HIGHEST_RISK') {
      list = [...list].sort((a, b) => b.score - a.score);
    } else if (sortBy === 'LOWEST_RISK') {
      list = [...list].sort((a, b) => a.score - b.score);
    }

    return list.slice(0, 10);
  }, [rawScans, activeFilter, sortBy]);

  const toggleExpand = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setExpandedId(prev => (prev === id ? null : id));
  };

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sms':
        return <MessageSquare size={14} className="text-[#00daf3]" />;
      case 'email':
        return <Mail size={14} className="text-[#d2bbff]" />;
      case 'whatsapp':
        return <MessageCircle size={14} className="text-emerald-400" />;
      case 'url':
        return <Globe size={14} className="text-[#41e3fe]" />;
      case 'qr':
        return <QrCode size={14} className="text-amber-400" />;
      default:
        return <FileText size={14} className="text-[#00daf3]" />;
    }
  };

  const getTypeBadgeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sms':
        return 'bg-[#00daf3]/10 text-[#00daf3] border-[#00daf3]/30';
      case 'email':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
      case 'whatsapp':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'url':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  const getStatusBadgeStyle = (level: string) => {
    switch (level?.toUpperCase()) {
      case 'CRITICAL':
      case 'DANGEROUS':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.2)]';
      case 'SUSPICIOUS':
      case 'WARNING':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'SAFE':
      case 'CLEAN':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-blue-500/15 text-blue-300 border-blue-500/40';
    }
  };

  const handleInspectModal = (scan: ScanResult, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedScan(scan);
    if (onInspectScan) {
      onInspectScan(scan);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-[#00e5ff]/20 space-y-4 shadow-2xl relative overflow-hidden bg-[#050816]/90 backdrop-blur-xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00daf3] animate-ping" />
            <h3 className="text-base font-bold text-white">Recent AI Neural Scans</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00daf3]/10 text-[#00daf3] border border-[#00daf3]/30">
              Interactive Telemetry
            </span>
          </div>
          <p className="text-xs font-mono text-[#bac9cc] mt-0.5">
            Filter telemetry scans by threat severity or sort by risk score
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#00e5ff] bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
          <Clock size={13} className="animate-spin" style={{ animationDuration: '6s' }} />
          <span>Real-time Stream</span>
        </div>
      </div>

      {/* Threat Severity Filter & Sorting Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white/5 p-2.5 rounded-2xl border border-white/10 font-mono text-xs">
        {/* Severity Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto hide-scrollbar">
          <span className="text-[11px] text-[#bac9cc] shrink-0 mr-1 flex items-center gap-1">
            <Filter size={12} className="text-[#00e5ff]" /> Severity:
          </span>

          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
              activeFilter === 'ALL'
                ? 'bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff]/50 shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                : 'bg-white/5 text-[#bac9cc] hover:text-white border-white/10'
            }`}
          >
            All ({counts.all})
          </button>

          <button
            onClick={() => setActiveFilter('CRITICAL')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
              activeFilter === 'CRITICAL'
                ? 'bg-rose-500/25 text-rose-300 border-rose-500/60 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : 'bg-white/5 text-[#bac9cc] hover:text-rose-300 border-white/10'
            }`}
          >
            Critical ({counts.critical})
          </button>

          <button
            onClick={() => setActiveFilter('WARNING')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
              activeFilter === 'WARNING'
                ? 'bg-amber-500/25 text-amber-300 border-amber-500/60 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                : 'bg-white/5 text-[#bac9cc] hover:text-amber-300 border-white/10'
            }`}
          >
            Warning ({counts.warning})
          </button>

          <button
            onClick={() => setActiveFilter('SAFE')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
              activeFilter === 'SAFE'
                ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/60 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'bg-white/5 text-[#bac9cc] hover:text-emerald-300 border-white/10'
            }`}
          >
            Safe ({counts.safe})
          </button>
        </div>

        {/* Sort Selector */}
        <div className="shrink-0 self-end sm:self-auto">
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOrder)}
            leftIcon={<ArrowUpDown size={12} />}
            options={[
              { value: 'NEWEST', label: 'Newest First' },
              { value: 'HIGHEST_RISK', label: 'Highest Threat' },
              { value: 'LOWEST_RISK', label: 'Lowest Threat' }
            ]}
            size="sm"
          />
        </div>
      </div>

      {/* Expandable Scan Items List */}
      <div className="space-y-2.5 font-mono">
        {displayScans.length === 0 ? (
          <div className="py-10 text-center text-[#bac9cc] border border-dashed border-white/10 rounded-2xl p-6">
            <ShieldAlert size={28} className="mx-auto mb-2 text-white/30" />
            <p className="text-xs font-bold">No {activeFilter.toLowerCase()} scan records found</p>
            <p className="text-[11px] text-white/50 mt-1">Try selecting a different threat severity filter above.</p>
          </div>
        ) : (
          displayScans.map((scan) => {
            const isExpanded = expandedId === scan.id;
            const isDanger = scan.level === 'CRITICAL' || scan.level === 'DANGEROUS' || scan.score >= 70;
            const isWarning = (scan.score >= 40 && scan.score < 70) || scan.level === 'SUSPICIOUS' || scan.level === 'WARNING';

            return (
              <div
                key={scan.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'bg-gradient-to-b from-[#0a102a] to-[#060a1c] border-[#00e5ff]/50 shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_15px_rgba(0,229,255,0.15)]'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Primary Row Header Bar (Clickable to Toggle Expansion) */}
                <div
                  onClick={() => toggleExpand(scan.id)}
                  className="p-3.5 sm:px-4 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 select-none"
                >
                  {/* Left Section: Icon + Type + Content */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <button
                      onClick={(e) => toggleExpand(scan.id, e)}
                      className={`p-1.5 rounded-lg transition-transform duration-200 cursor-pointer ${
                        isExpanded ? 'bg-[#00e5ff]/20 text-[#00e5ff] rotate-180' : 'bg-white/5 text-[#bac9cc] hover:text-white'
                      }`}
                      title={isExpanded ? 'Collapse' : 'Expand details'}
                    >
                      <ChevronDown size={15} />
                    </button>

                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider shrink-0 ${getTypeBadgeStyle(scan.type)}`}>
                      {getIcon(scan.type)}
                      <span>{scan.type}</span>
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-mono truncate transition-colors ${isExpanded ? 'text-[#00e5ff] font-bold' : 'text-white/90'}`}>
                        {scan.content}
                      </p>
                    </div>
                  </div>

                  {/* Right Section: Threat Status + Score + Time + Action */}
                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                    {/* Status Badge */}
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusBadgeStyle(scan.level)}`}>
                      {isDanger ? <ShieldAlert size={12} /> : isWarning ? <AlertTriangle size={12} /> : <ShieldCheck size={12} />}
                      <span>{scan.level}</span>
                    </span>

                    {/* Score */}
                    <div className="flex items-center gap-2 min-w-[80px]">
                      <div className="w-10 h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className={`h-full ${isDanger ? 'bg-rose-500' : isWarning ? 'bg-amber-400' : 'bg-emerald-400'}`}
                          style={{ width: `${scan.score}%` }}
                        />
                      </div>
                      <span className={`font-extrabold text-xs ${isDanger ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {scan.score}/100
                      </span>
                    </div>

                    {/* Timestamp */}
                    <span className="text-[#bac9cc] text-[11px] hidden sm:inline-block w-20 text-right">
                      {scan.timestamp}
                    </span>

                    {/* Expand Toggle Text/Icon */}
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#00e5ff] bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 px-2.5 py-1 rounded-lg border border-[#00e5ff]/30 transition-all">
                      <span>{isExpanded ? 'Hide' : 'Expand'}</span>
                    </div>
                  </div>
                </div>

                {/* Expandable Technical Details Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-4 pb-4 pt-2 border-t border-white/10 space-y-4 text-xs">
                        {/* Technical Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Detection Keywords / Vectors */}
                          {scan.keywords && scan.keywords.length > 0 && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                              <span className="text-[#bac9cc] uppercase font-bold text-[10px] block mb-2">
                                Detected Vector Keywords
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {scan.keywords.map((kw, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 rounded-md bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 text-[10px] font-mono"
                                  >
                                    #{kw}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Recommendation */}
                          {scan.recommendation && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                              <span className="text-[#00e5ff] uppercase font-bold text-[10px] block mb-1">
                                Mitigation Guidance
                              </span>
                              <p className="text-white/90 text-xs leading-snug">
                                {scan.recommendation}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Technical Specs Footer */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-white/5 text-[11px] text-[#bac9cc]">
                          <div className="flex items-center gap-3">
                            <span>Scan ID: <strong className="text-white">{scan.id}</strong></span>
                            <span>•</span>
                            <span>Scanned: <strong className="text-white">{scan.timestamp}</strong></span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handleInspectModal(scan, e)}
                              className="text-[#00e5ff] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <span>Open Deep Inspection Modal</span>
                              <ArrowRight size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Inspection Modal */}
      <AnimatePresence>
        {selectedScan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#080d21] border border-[#00e5ff]/40 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(0,229,255,0.2)] text-left relative font-mono"
            >
              <button
                onClick={() => setSelectedScan(null)}
                className="absolute top-4 right-4 p-1.5 text-[#bac9cc] hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Sparkles size={18} className="text-[#00e5ff]" />
                <h4 className="text-base font-bold text-white">
                  Deep Inspection: {selectedScan.id}
                </h4>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#bac9cc] uppercase font-bold text-[10px]">Target Payload</span>
                  <div className="mt-1 p-3 rounded-xl bg-black/50 border border-white/10 text-white font-mono break-all">
                    {selectedScan.content}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[#bac9cc] uppercase font-bold text-[10px]">Result Type</span>
                    <div className="mt-1">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border uppercase ${getTypeBadgeStyle(selectedScan.type)}`}>
                        {getIcon(selectedScan.type)}
                        <span>{selectedScan.type}</span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[#bac9cc] uppercase font-bold text-[10px]">Threat Level</span>
                    <div className="mt-1">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase border ${getStatusBadgeStyle(selectedScan.level)}`}>
                        <span>{selectedScan.level}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {selectedScan.recommendation && (
                  <div>
                    <span className="text-[#00e5ff] uppercase font-bold text-[10px]">Recommended Action</span>
                    <p className="mt-1 p-3 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] font-bold leading-relaxed">
                      {selectedScan.recommendation}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedScan(null)}
                  className="px-4 py-2 rounded-xl bg-[#00e5ff] text-[#00363d] font-bold text-xs hover:bg-[#41e3fe] transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] cursor-pointer"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};



