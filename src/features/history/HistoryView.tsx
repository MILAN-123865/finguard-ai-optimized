import React, { useState, useMemo, useEffect } from 'react';
import { useHistory } from '../../hooks/useHistory';
import { 
  Search, ShieldAlert, ShieldCheck, 
  X, Calendar, ArrowDownUp, Star, Download, 
  CheckSquare, Square, RefreshCw, Eye, Trash2
} from 'lucide-react';
import { ScanType, ScanResult } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { ToastContainer, ToastProps } from '../../components/ui/Toast';
import { Select } from '../../components/ui/Select';

export const HistoryView: React.FC = () => {
  const {
    history,
    totalCount,
    filterType,
    setFilterType,
    searchQuery,
    setSearchQuery,
    selectedScan,
    setSelectedScan,
    deleteItem,
    isLoading: isHistoryLoading,
  } = useHistory();

  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState<number>(10);
  
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (type: 'success' | 'error' | 'info' | 'warning', message: string, title?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, {
      id,
      type,
      title: title || (type === 'success' ? 'Export Complete' : type === 'error' ? 'Export Failed' : 'Notification'),
      message,
      onClose: (toastId) => setToasts(current => current.filter(t => t.id !== toastId))
    }]);
  };

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
  }, [selectedScan, setSelectedScan]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) newFavorites.delete(id);
    else newFavorites.add(id);
    setFavorites(newFavorites);
  };

  const toggleSelection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) newSelection.delete(id);
    else newSelection.add(id);
    setSelectedIds(newSelection);
  };

  const toggleAllSelection = () => {
    if (selectedIds.size === finalFilteredHistory.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(finalFilteredHistory.map(h => h.id)));
    }
  };

  const parseDateString = (dateStr: string) => {
    if (dateStr.includes('ago')) return new Date();
    return new Date(dateStr);
  };

  const finalFilteredHistory = useMemo(() => {
    let result = [...history];

    if (riskFilter !== 'all') {
      result = result.filter(item => item.level.toLowerCase() === riskFilter);
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      result = result.filter(item => {
        const itemDate = parseDateString(item.timestamp);
        const diffTime = Math.abs(now.getTime() - itemDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (dateFilter === 'today') return diffDays <= 1;
        if (dateFilter === 'week') return diffDays <= 7;
        if (dateFilter === 'month') return diffDays <= 30;
        return true;
      });
    }

    return result.sort((a, b) => {
      const dateA = parseDateString(a.timestamp).getTime();
      const dateB = parseDateString(b.timestamp).getTime();
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
    });
  }, [history, riskFilter, dateFilter, sortOrder]);

  const visibleHistory = useMemo(() => {
    return finalFilteredHistory.slice(0, visibleCount);
  }, [finalFilteredHistory, visibleCount]);

  // ISSUE 1 FIX: CSV Export Functionality
  const handleExportCSV = () => {
    if (!finalFilteredHistory || finalFilteredHistory.length === 0) {
      addToast('warning', 'No data available to export');
      return;
    }

    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const filename = `scan-telemetry-logs-${currentDate}.csv`;

      // Export columns: Type, Sender / Source, Content Preview, Risk Status, Timestamp
      const headers = ['Type', 'Sender / Source', 'Content Preview', 'Risk Status', 'Timestamp'];

      const rows = finalFilteredHistory.map(item => {
        const type = (item.type || 'N/A').toUpperCase();
        const sender = (item.sender || (item as any).source || 'Unknown').replace(/"/g, '""');
        const content = (item.content || '').replace(/"/g, '""').replace(/\n/g, ' ');
        const riskStatus = `${item.level || 'SAFE'} (${item.score ?? 0}%)`;
        const timestamp = (item.timestamp || '').replace(/"/g, '""');

        return `"${type}","${sender}","${content}","${riskStatus}","${timestamp}"`;
      });

      const csvContent = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      addToast('success', `Exported ${finalFilteredHistory.length} record(s) to ${filename}`);
    } catch (err: any) {
      console.error("Export CSV error:", err);
      addToast('error', 'Failed to export logs. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Search & Controls Header */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input 
            type="text"
            placeholder="Search telemetry content, sender ID or URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-[16px] bg-white border border-[#E4E7E5] text-xs text-[#111827] placeholder:text-[#94A3B8] font-medium focus:outline-none focus:border-[#11875D] transition-colors shadow-2xs"
          />
        </div>

        {/* Filters & Export Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as ScanType | 'all')}
            options={[
              { value: 'all', label: 'All Vectors' },
              { value: 'sms', label: 'SMS' },
              { value: 'email', label: 'Email' },
              { value: 'url', label: 'URL' }
            ]}
            size="sm"
          />

          <Select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            leftIcon={<ShieldAlert size={14} />}
            options={[
              { value: 'all', label: 'All Risks' },
              { value: 'critical', label: 'Critical' },
              { value: 'dangerous', label: 'Dangerous' },
              { value: 'suspicious', label: 'Suspicious' },
              { value: 'safe', label: 'Safe' }
            ]}
            size="sm"
          />

          <Select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            leftIcon={<Calendar size={14} />}
            options={[
              { value: 'all', label: 'Any Date' },
              { value: 'today', label: 'Today' },
              { value: 'week', label: 'Past 7 Days' },
              { value: 'month', label: 'Past 30 Days' }
            ]}
            size="sm"
          />

          <button
            onClick={() => setSortOrder(prev => prev === 'latest' ? 'oldest' : 'latest')}
            className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E4E7E5] hover:bg-white rounded-[16px] px-3.5 py-2.5 text-xs text-[#111827] font-semibold transition-colors cursor-pointer"
          >
            <ArrowDownUp size={14} className="text-[#64748B]" />
            {sortOrder === 'latest' ? 'Latest' : 'Oldest'}
          </button>
          
          {/* ISSUE 1 FIX: Export Button */}
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 bg-[#11875D] hover:bg-[#0e704d] text-white border border-[#11875D] rounded-[16px] px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
          >
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* History Table Container */}
      <div className="bg-white rounded-[20px] p-6 border border-[#E4E7E5] shadow-xs relative min-h-[400px]">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E4E7E5]">
          <h3 className="text-sm font-bold text-[#111827]">Scan Telemetry Logs</h3>
          <span className="text-xs text-[#64748B] font-semibold">Showing {visibleHistory.length} of {finalFilteredHistory.length} logs</span>
        </div>

        {finalFilteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
            <ShieldCheck size={48} className="text-[#11875D]" />
            <h3 className="text-lg font-bold text-[#111827]">No Records Found</h3>
            <p className="text-xs text-[#64748B] max-w-sm">No threat records matching your filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E4E7E5] text-[#64748B] font-bold uppercase select-none pb-3">
                  <th className="pb-3 w-10">
                    <button onClick={toggleAllSelection} className="text-[#64748B] hover:text-[#11875D]">
                      {selectedIds.size === finalFilteredHistory.length && finalFilteredHistory.length > 0 ? (
                        <CheckSquare size={16} className="text-[#11875D]" />
                      ) : (
                        <Square size={16} />
                      )}
                    </button>
                  </th>
                  <th className="pb-3 w-10"></th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Sender / Source</th>
                  <th className="pb-3">Content Preview</th>
                  <th className="pb-3">Risk Status</th>
                  <th className="pb-3">Timestamp</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7E5] text-[#111827]">
                {visibleHistory.map((scan) => {
                  const isThreat = scan.level === 'CRITICAL' || scan.level === 'DANGEROUS' || scan.level === 'HIGH';
                  const isSuspicious = scan.level === 'SUSPICIOUS' || scan.level === 'MEDIUM';

                  let badgeStyle = 'bg-emerald-50 text-[#10B981] border-emerald-200';
                  if (isThreat) badgeStyle = 'bg-red-50 text-[#EF4444] border-red-200';
                  if (isSuspicious) badgeStyle = 'bg-amber-50 text-[#F59E0B] border-amber-200';

                  return (
                    <tr 
                      key={scan.id} 
                      className={`hover:bg-[#F8FAFC] transition-colors ${selectedIds.has(scan.id) ? 'bg-[#DDF2EA]/30' : ''}`}
                    >
                      <td className="py-3.5">
                        <button onClick={(e) => toggleSelection(scan.id, e)} className="text-[#64748B] hover:text-[#11875D]">
                          {selectedIds.has(scan.id) ? <CheckSquare size={16} className="text-[#11875D]" /> : <Square size={16} />}
                        </button>
                      </td>
                      <td className="py-3.5">
                        <button onClick={(e) => toggleFavorite(scan.id, e)} className="text-[#64748B] hover:text-amber-500 transition-colors">
                          <Star size={16} className={favorites.has(scan.id) ? 'fill-amber-400 text-amber-500' : ''} />
                        </button>
                      </td>
                      <td className="py-3.5 uppercase font-bold text-[#11875D]">{scan.type}</td>
                      <td className="py-3.5 font-medium text-[#111827]">{scan.sender || (scan as any).source || 'Unknown'}</td>
                      <td className="py-3.5 max-w-sm truncate text-[#64748B]" title={scan.content}>{scan.content}</td>
                      <td className="py-3.5">
                        <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeStyle}`}>
                          {isThreat ? <ShieldAlert size={12} /> : <ShieldCheck size={12} />}
                          {scan.level} ({scan.score}%)
                        </div>
                      </td>
                      <td className="py-3.5 text-[#64748B]">{scan.timestamp}</td>
                      <td className="py-3.5 text-right space-x-2 whitespace-nowrap">
                        {/* ISSUE 2 FIX: Eye / View Button */}
                        <button
                          onClick={() => setSelectedScan(scan)}
                          className="p-1.5 rounded-lg bg-[#F8FAFC] border border-[#E4E7E5] hover:bg-[#DDF2EA] text-[#11875D] transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => deleteItem(scan.id)}
                          className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-[#EF4444] hover:bg-red-100 transition-colors cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {finalFilteredHistory.length > visibleCount && (
          <div className="mt-6 flex justify-center border-t border-[#E4E7E5] pt-6">
            <button 
              onClick={() => setVisibleCount(prev => prev + 10)}
              className="px-6 py-2 rounded-[16px] bg-[#11875D] text-white font-bold text-xs hover:bg-[#0e704d] transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <RefreshCw size={14} /> Load More Records
            </button>
          </div>
        )}
      </div>

      {/* ISSUE 2 FIX: Scan Details Modal */}
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
              {/* Modal Header */}
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

              {/* Modal Content */}
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

              {/* Modal Footer */}
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

      <ToastContainer toasts={toasts} />
    </div>
  );
};
