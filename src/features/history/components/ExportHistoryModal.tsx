import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Code2, 
  FileType, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Filter, 
  Database,
  Sparkles
} from 'lucide-react';
import { ScanResult } from '../../../types';
import { 
  ExportFormat, 
  ExportFilters, 
  exportToCSV, 
  exportToExcel, 
  exportToPDF, 
  exportToJSON,
  generateExportFilename 
} from '../../../utils/exportUtils';

interface ExportHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  filteredRecords: ScanResult[];
  allRecords: ScanResult[];
  filters: ExportFilters;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export const ExportHistoryModal: React.FC<ExportHistoryModalProps> = ({
  isOpen,
  onClose,
  filteredRecords,
  allRecords,
  filters,
  onSuccess,
  onError
}) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('csv');
  const [scope, setScope] = useState<'filtered' | 'all'>('filtered');
  const [isExporting, setIsExporting] = useState<boolean>(false);

  if (!isOpen) return null;

  const targetRecords = scope === 'filtered' ? filteredRecords : allRecords;
  const hasRecords = targetRecords.length > 0;

  const formatOptions = [
    {
      id: 'csv' as ExportFormat,
      name: 'CSV File',
      extension: '.csv',
      description: 'Standard comma-separated table with UTF-8 BOM encoding for Excel & Google Sheets.',
      icon: FileText,
      badge: 'Popular',
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
    },
    {
      id: 'xlsx' as ExportFormat,
      name: 'Excel Workbook',
      extension: '.xlsx',
      description: 'Formatted Microsoft Excel spreadsheet with column auto-sizing and freeze pane.',
      icon: FileSpreadsheet,
      badge: 'Formatted',
      color: 'border-green-500/40 bg-green-500/10 text-green-400'
    },
    {
      id: 'pdf' as ExportFormat,
      name: 'PDF Audit Report',
      extension: '.pdf',
      description: 'Executive landscape PDF audit log with threat metric breakdown & page numbering.',
      icon: FileType,
      badge: 'Executive',
      color: 'border-red-500/40 bg-red-500/10 text-red-400'
    },
    {
      id: 'json' as ExportFormat,
      name: 'Structured JSON',
      extension: '.json',
      description: 'Raw telemetry JSON payload formatted for SIEM, Splunk, or API ingestion.',
      icon: Code2,
      badge: 'API / SIEM',
      color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400'
    }
  ];

  const handleExport = async () => {
    if (!hasRecords) return;

    setIsExporting(true);
    try {
      const recordsToExport = targetRecords;
      
      switch (selectedFormat) {
        case 'csv':
          await exportToCSV(recordsToExport, filters);
          break;
        case 'xlsx':
          await exportToExcel(recordsToExport, filters);
          break;
        case 'pdf':
          await exportToPDF(recordsToExport, filters);
          break;
        case 'json':
          await exportToJSON(recordsToExport, filters);
          break;
      }

      const filename = generateExportFilename(selectedFormat);
      if (onSuccess) {
        onSuccess(`Exported ${recordsToExport.length} scan records to ${filename}`);
      }
      onClose();
    } catch (err: any) {
      console.error('Export error:', err);
      if (onError) {
        onError(err.message || 'Failed to generate export file. Please try again.');
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[#00daf3]/30 bg-[#0a0d1a] p-6 shadow-[0_0_50px_rgba(0,218,243,0.18)] z-10"
        >
          {/* Header glowing line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00daf3] to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            disabled={isExporting}
            className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-[#00daf3]/10 border border-[#00daf3]/30 text-[#00daf3]">
              <Download size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Export Telemetry & Scan History
                <Sparkles size={16} className="text-[#00daf3]" />
              </h2>
              <p className="text-sm text-gray-400">
                Generate and download audit logs in CSV, Excel, PDF, or JSON formats
              </p>
            </div>
          </div>

          {/* Scope and Filter Info Box */}
          <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Filter size={14} className="text-[#00daf3]" />
                Target Data Scope
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setScope('filtered')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    scope === 'filtered'
                      ? 'bg-[#00daf3]/20 border border-[#00daf3]/50 text-[#00daf3]'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  Filtered Records ({filteredRecords.length})
                </button>
                <button
                  type="button"
                  onClick={() => setScope('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    scope === 'all'
                      ? 'bg-[#00daf3]/20 border border-[#00daf3]/50 text-[#00daf3]'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  All Logs ({allRecords.length})
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-300 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="flex items-center gap-1 text-gray-400">
                <Database size={12} className="text-[#00daf3]" />
                Selected: <strong className="text-white ml-1">{targetRecords.length} records</strong>
              </span>
              {filters.filterType && filters.filterType !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-white/10 text-gray-300">
                  Category: {filters.filterType}
                </span>
              )}
              {filters.riskFilter && filters.riskFilter !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-white/10 text-gray-300">
                  Risk: {filters.riskFilter}
                </span>
              )}
              {filters.searchQuery && (
                <span className="px-2 py-0.5 rounded bg-white/10 text-gray-300 truncate max-w-[200px]">
                  Search: "{filters.searchQuery}"
                </span>
              )}
            </div>
          </div>

          {/* No Records Warning Banner */}
          {!hasRecords ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 text-center"
            >
              <AlertCircle size={32} className="mx-auto text-amber-400 mb-2 animate-bounce" />
              <h4 className="text-sm font-bold text-amber-200 mb-1">
                No scan history available to export
              </h4>
              <p className="text-xs text-amber-300/80 max-w-md mx-auto">
                Your current active search keywords or filters returned 0 records. Clear your search or change scope to "All Logs" to enable download.
              </p>
            </motion.div>
          ) : null}

          {/* Format Options Grid */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Select File Format
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formatOptions.map((opt) => {
                const IconComponent = opt.icon;
                const isSelected = selectedFormat === opt.id;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedFormat(opt.id)}
                    disabled={!hasRecords || isExporting}
                    className={`relative text-left p-4 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? 'border-[#00daf3] bg-[#00daf3]/10 shadow-[0_0_20px_rgba(0,218,243,0.15)]'
                        : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20'
                    } ${!hasRecords ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-lg ${opt.color}`}>
                          <IconComponent size={18} />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white block">
                            {opt.name}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">
                            {opt.extension}
                          </span>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <CheckCircle2 size={18} className="text-[#00daf3]" />
                      )}
                    </div>

                    <p className="text-xs text-gray-400 line-clamp-2">
                      {opt.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={isExporting}
              className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleExport}
              disabled={!hasRecords || isExporting}
              className="relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00daf3] to-[#00a8ff] text-sm font-bold text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,218,243,0.3)] disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
            >
              {isExporting ? (
                <>
                  <Loader2 size={18} className="animate-spin text-slate-950" />
                  Generating {selectedFormat.toUpperCase()}...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Download Export ({targetRecords.length})
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
