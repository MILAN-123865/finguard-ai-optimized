import React, { useState, useEffect } from 'react';
import { FileText, Eye, ExternalLink, ShieldCheck, ShieldAlert, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useRecentScans } from '../../../../hooks/useRecentScans';
import { ScanResult } from '../../../../types';

export const ReportsTable: React.FC = () => {
  const { recentScans } = useRecentScans();
  const navigate = useNavigate();
  const [selectedScan, setSelectedScan] = useState<ScanResult | null>(null);

  // Close modal via ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedScan(null);
      }
    };
    if (selectedScan) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedScan]);

  const displayScans = recentScans && recentScans.length > 0 ? recentScans : [
    {
      id: 'REP-091',
      type: 'sms' as const,
      content: 'URGENT: Your SBI account is locked. Verify at https://sbi-verify-auth.net',
      timestamp: '10:45 AM',
      score: 96,
      level: 'CRITICAL',
      confidence: 99,
      recommendation: 'Block URL immediately across gateway.'
    },
    {
      id: 'REP-090',
      type: 'url' as const,
      content: 'https://paypal-verification-portal-99.com/login',
      timestamp: '10:30 AM',
      score: 94,
      level: 'CRITICAL',
      confidence: 98,
      recommendation: 'Do not enter credentials.'
    },
    {
      id: 'REP-089',
      type: 'voice' as const,
      content: 'Incoming voice call impersonating Bank officer requesting instant OTP.',
      timestamp: '09:15 AM',
      score: 87,
      level: 'DANGEROUS',
      confidence: 95,
      recommendation: 'Hang up and report caller ID.'
    },
    {
      id: 'REP-088',
      type: 'qr' as const,
      content: 'Malicious QR code sticker directing to crypto drainer site.',
      timestamp: '08:42 AM',
      score: 92,
      level: 'CRITICAL',
      confidence: 97,
      recommendation: 'Do not connect wallet.'
    },
    {
      id: 'REP-087',
      type: 'email' as const,
      content: 'Fake invoice notice claiming pending bill payment.',
      timestamp: '07:20 AM',
      score: 76,
      level: 'SUSPICIOUS',
      confidence: 88,
      recommendation: 'Flag email as spam.'
    }
  ];

  const getStatusBadge = (scan: ScanResult) => {
    const levelStr = String(scan.level || '').toUpperCase();
    if (scan.score >= 80 || levelStr === 'CRITICAL' || levelStr === 'DANGEROUS') {
      return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-[#EF4444] border border-red-200">Blocked</span>;
    }
    if (scan.score >= 50 || levelStr === 'SUSPICIOUS' || levelStr === 'WARNING') {
      return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-[#F59E0B] border border-amber-200">Flagged</span>;
    }
    return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF2EA] text-[#11875D] border border-[#11875D]/30">Clean</span>;
  };

  return (
    <div className="bg-white rounded-[20px] border border-[#E4E7E5] p-5 shadow-xs flex flex-col h-full relative">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E4E7E5]">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-[#11875D]" />
          <h3 className="font-bold text-[#111827] text-sm">Recent Threat Reports</h3>
        </div>
        <button
          onClick={() => navigate('/history')}
          className="text-xs font-bold text-[#11875D] hover:underline flex items-center gap-1 cursor-pointer"
        >
          View All <ExternalLink size={12} />
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E4E7E5] text-[#64748B] font-bold uppercase pb-2">
              <th className="pb-2">ID</th>
              <th className="pb-2">Vector</th>
              <th className="pb-2">Payload Preview</th>
              <th className="pb-2">Verdict</th>
              <th className="pb-2">Time</th>
              <th className="pb-2 text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E7E5] text-[#111827]">
            {displayScans.slice(0, 5).map((scan) => (
              <tr key={scan.id} className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-3 font-bold text-[#111827]">{scan.id}</td>
                <td className="py-3 uppercase font-bold text-[#11875D]">{scan.type}</td>
                <td className="py-3 max-w-[200px] truncate text-[#64748B]" title={scan.content}>{scan.content}</td>
                <td className="py-3">{getStatusBadge(scan)}</td>
                <td className="py-3 text-[#64748B]">{scan.timestamp}</td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => setSelectedScan(scan)}
                    className="p-1.5 rounded-[8px] bg-[#F8FAFC] border border-[#E4E7E5] hover:bg-[#DDF2EA] text-[#11875D] transition-colors cursor-pointer"
                    title="View Scan Details"
                  >
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedScan && (
          <div 
            onClick={() => setSelectedScan(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[20px] p-6 border border-[#E4E7E5] shadow-2xl max-w-lg w-full space-y-4 my-8 relative"
            >
              <div className="flex items-center justify-between border-b border-[#E4E7E5] pb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#DDF2EA] flex items-center justify-center text-[#11875D]">
                    <ShieldCheck size={18} />
                  </div>
                  <h3 className="font-bold text-[#111827] text-base">Scan Details</h3>
                </div>
                <button
                  onClick={() => setSelectedScan(null)}
                  className="p-1 rounded-full text-[#64748B] hover:text-[#111827] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                  title="Close Modal"
                >
                  <X size={18} />
                </button>
              </div>

              {!selectedScan.id && !selectedScan.content ? (
                <div className="text-center py-8 text-xs text-[#64748B] font-semibold">
                  No details available
                </div>
              ) : (
                <div className="space-y-4 text-xs text-[#111827]">
                  {/* Type & Sender / Source */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-[12px] bg-[#F8FAFC] border border-[#E4E7E5]">
                      <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">Type</span>
                      <span className="font-bold text-[#11875D] uppercase text-xs">{selectedScan.type || 'N/A'}</span>
                    </div>

                    <div className="p-3 rounded-[12px] bg-[#F8FAFC] border border-[#E4E7E5]">
                      <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">Sender / Source</span>
                      <span className="font-bold text-[#111827] truncate block text-xs">
                        {selectedScan.sender || (selectedScan as any).source || 'Unknown'}
                      </span>
                    </div>
                  </div>

                  {/* Full Message Content */}
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">Full Message Content</span>
                    <div className="p-3.5 rounded-[12px] bg-[#F8FAFC] border border-[#E4E7E5] font-sans text-xs font-semibold text-[#111827] leading-relaxed break-words max-h-36 overflow-y-auto">
                      "{selectedScan.content || selectedScan.message || 'No details available'}"
                    </div>
                  </div>

                  {/* Risk Score & Risk Level */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-[12px] bg-[#F8FAFC] border border-[#E4E7E5]">
                      <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">Risk Score</span>
                      <span className="text-xl font-extrabold text-[#EF4444]">{selectedScan.score ?? 0}/100</span>
                    </div>

                    <div className="p-3 rounded-[12px] bg-[#F8FAFC] border border-[#E4E7E5]">
                      <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">Risk Level</span>
                      <span className="text-sm font-bold text-[#EF4444] block mt-1">{selectedScan.level || 'SAFE'}</span>
                    </div>
                  </div>

                  {/* Confidence Score & Timestamp */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-[12px] bg-[#DDF2EA] border border-[#11875D]/30">
                      <span className="text-[10px] text-[#11875D] uppercase font-bold block mb-1">Confidence Score</span>
                      <span className="text-lg font-bold text-[#11875D]">{selectedScan.confidence || 98.6}%</span>
                    </div>

                    <div className="p-3 rounded-[12px] bg-[#F8FAFC] border border-[#E4E7E5]">
                      <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">Timestamp</span>
                      <span className="font-semibold text-[#64748B] block mt-1">{selectedScan.timestamp || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Threat Indicators */}
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">Threat Indicators</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedScan.highlights && selectedScan.highlights.length > 0 ? (
                        selectedScan.highlights.map((h, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-[8px] bg-red-50 text-[#EF4444] border border-red-200 text-[11px] font-semibold">
                            {typeof h === 'string' ? h : (h as any).phrase || (h as any).text}
                          </span>
                        ))
                      ) : selectedScan.keywords && selectedScan.keywords.length > 0 ? (
                        selectedScan.keywords.map((k, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-[8px] bg-red-50 text-[#EF4444] border border-red-200 text-[11px] font-semibold">
                            {k}
                          </span>
                        ))
                      ) : (
                        <span className="px-2.5 py-1 rounded-[8px] bg-[#DDF2EA] text-[#11875D] border border-[#11875D]/30 text-[11px] font-semibold">
                          No threat indicators detected
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Recommended Action */}
                  <div className="p-3.5 rounded-[12px] bg-red-50 border border-red-200 text-[#EF4444]">
                    <span className="text-[10px] uppercase font-bold block mb-1">Recommended Action</span>
                    <p className="text-xs font-semibold leading-relaxed">
                      {typeof selectedScan.recommendation === 'string'
                        ? selectedScan.recommendation
                        : (selectedScan.recommendation as any)?.title || 'Do NOT click suspicious links. Block sender and report phishing.'}
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedScan(null)}
                  className="px-5 py-2.5 rounded-[12px] bg-[#11875D] hover:bg-[#0e704d] text-white font-bold text-xs cursor-pointer shadow-2xs transition-colors"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
