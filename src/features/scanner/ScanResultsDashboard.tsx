import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, RefreshCw, Share2, Copy, Check
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ScanResult } from '../../types';
import { ThreatScoreAnimation } from '../landing/components/ai-scanner/ThreatScoreAnimation';

interface ScanResultsDashboardProps {
  result: ScanResult;
  onReset?: () => void;
  onReportClick?: () => void;
}

export const ScanResultsDashboard: React.FC<ScanResultsDashboardProps> = ({ result, onReset, onReportClick }) => {
  const [copiedHash, setCopiedHash] = useState(false);
  const [shared, setShared] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleShareReport = async () => {
    const shareTitle = 'FinGuard AI Threat Report';
    const shareText = `FinGuard AI Security Scan [${String(result.type).toUpperCase()}]: Threat Probability ${result.score}% (${result.threatLevel || result.level} Risk, ${result.confidence || 99.2}% Confidence).`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2500);
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareTitle}\n${shareText}\n${shareUrl}`);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyHash = async () => {
    const threatHash = `FINGUARD-THREAT-HASH-${(result.id || 'SCAN').toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    try {
      await navigator.clipboard.writeText(threatHash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setIsExportingPDF(true);
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFFFF',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`FinGuard_Scan_Report_${result.id || 'result'}.pdf`);
    } catch (e) {
      console.error("PDF generation failed:", e);
    } finally {
      setIsExportingPDF(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto" ref={reportRef}>
      {/* Header bar */}
      <div className="bg-white rounded-[20px] p-6 border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-center text-[#11875D]">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Scan Analysis Report</h2>
            <p className="text-xs text-[#64748B] font-mono">ID: {result.id || 'SCAN-001'} • {new Date(result.timestamp || Date.now()).toLocaleTimeString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-center">
          <button
            onClick={handleShareReport}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-[12px] bg-[#F8FAFC] border border-[#E5E7EB] hover:bg-white text-[#111827] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {shared ? <Check size={14} className="text-[#10B981]" /> : <Share2 size={14} />}
            <span>{shared ? 'Copied' : 'Share'}</span>
          </button>

          {onReset && (
            <button
              onClick={onReset}
              className="flex-1 sm:flex-none px-4 py-2 rounded-[12px] bg-[#11875D] hover:bg-[#0e704d] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <RefreshCw size={14} />
              <span>Scan Again</span>
            </button>
          )}
        </div>
      </div>

      {/* 3-Step Threat Score Animation Component */}
      <ThreatScoreAnimation result={result} onReset={onReset} />
    </div>
  );
};