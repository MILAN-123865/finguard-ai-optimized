import React, { useState } from 'react';
import { Download, Copy, Share2, RefreshCw, Check } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { ScanResult } from '../../../../types';

interface ReportActionsProps {
  onReset: () => void;
  result?: ScanResult | null;
}

export const ReportActions: React.FC<ReportActionsProps> = ({ onReset, result }) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    const summaryText = `[FinGuard AI Threat Scan Report]\nID: ${result.id}\nScore: ${result.score}% (${result.threatLevel || result.level})\nScam Category: ${result.scamType || result.scamCategory || 'General'}\nConfidence: ${result.confidence}%\nExplanation: ${result.explanation || result.reasoning || result.summary}\nRecommendation: ${typeof result.recommendation === 'string' ? result.recommendation : result.recommendation?.title}`;
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadPDF = () => {
    if (!result) return;
    try {
      const doc = new jsPDF();
      doc.setFillColor(10, 13, 28);
      doc.rect(0, 0, 210, 297, 'F');

      doc.setTextColor(0, 229, 255);
      doc.setFontSize(22);
      doc.text("FinGuard AI Threat Analysis Report", 14, 20);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text(`Scan ID: ${result.id}`, 14, 30);
      doc.text(`Timestamp: ${result.timestamp}`, 14, 36);

      doc.setFontSize(14);
      doc.setTextColor(result.score >= 60 ? 255 : 34, result.score >= 60 ? 80 : 197, result.score >= 60 ? 80 : 94);
      doc.text(`Risk Score: ${result.score}% (${result.threatLevel || result.level})`, 14, 48);

      doc.setTextColor(220, 220, 220);
      doc.setFontSize(11);
      doc.text(`Scam Category: ${result.scamType || result.scamCategory || 'Unclassified'}`, 14, 58);
      doc.text(`AI Confidence: ${result.confidence}%`, 14, 66);

      doc.text("Executive Summary:", 14, 78);
      const splitSummary = doc.splitTextToSize(result.summary || result.explanation || '', 180);
      doc.text(splitSummary, 14, 86);

      let yPos = 86 + splitSummary.length * 6 + 10;
      if (result.indicators && result.indicators.length > 0) {
        doc.text("Red Flags / Threat Indicators:", 14, yPos);
        yPos += 8;
        result.indicators.forEach(ind => {
          doc.text(`• ${ind}`, 18, yPos);
          yPos += 6;
        });
      }

      doc.save(`FinGuard_Scan_Report_${result.id}.pdf`);
    } catch (e) {
      console.error('PDF generation error:', e);
      // Fallback text download
      const element = document.createElement("a");
      const file = new Blob([JSON.stringify(result, null, 2)], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `FinGuard_Report_${result?.id || 'scan'}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handleShare = async () => {
    if (navigator.share && result) {
      try {
        await navigator.share({
          title: 'FinGuard AI Threat Scan',
          text: `FinGuard AI analyzed this payload with a ${result.score}% risk score (${result.threatLevel || result.level}).`,
          url: window.location.href,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 w-full">
      <button 
        onClick={handleDownloadPDF}
        className="flex-1 min-w-[140px] px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-2 text-sm font-bold text-[#bac9cc] hover:text-white cursor-pointer"
      >
        <Download size={16} />
        PDF Report
      </button>
      
      <button 
        onClick={handleCopy}
        className="flex-1 min-w-[140px] px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-2 text-sm font-bold text-[#bac9cc] hover:text-white cursor-pointer"
      >
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
        {copied ? 'Copied!' : 'Copy Result'}
      </button>

      <button 
        onClick={handleShare}
        className="flex-1 min-w-[140px] px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-2 text-sm font-bold text-[#bac9cc] hover:text-white cursor-pointer"
      >
        {shared ? <Check size={16} className="text-green-400" /> : <Share2 size={16} />}
        {shared ? 'Shared!' : 'Share'}
      </button>

      <button 
        onClick={onReset}
        className="flex-1 min-w-[200px] px-4 py-3 rounded-xl bg-[#00daf3]/10 hover:bg-[#00daf3]/20 border border-[#00daf3]/30 transition-colors flex items-center justify-center gap-2 text-sm font-bold text-[#00daf3] cursor-pointer"
      >
        <RefreshCw size={16} />
        Scan Another Message
      </button>
    </div>
  );
};
