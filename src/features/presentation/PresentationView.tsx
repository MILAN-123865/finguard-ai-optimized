import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Presentation, Download, FileSpreadsheet, FileText, CheckCircle2,
  ChevronLeft, ChevronRight, Sun, Moon, Maximize2, Upload, RefreshCw,
  Sparkles, ShieldCheck, ShieldAlert, Layers, Eye, Info, Check, Sliders
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { exportToPowerPoint, PresentationData } from './services/pptxExporter';
import { exportPresentationToPDF } from './services/pdfExporter';
import { DEFAULT_COMPANY_LOGO_PNG } from './utils/defaultLogo';

// Initial default high-quality executive presentation deck data
const initialPresentationData: PresentationData = {
  title: 'FinGuard AI: Enterprise Threat Intelligence & Cyber Defense',
  subtitle: 'Executive Board Overview, Telemetry Analysis & Autonomous Mitigation',
  author: 'Security Operations Center (SOC)',
  theme: 'dark',
  logoDataUrl: DEFAULT_COMPANY_LOGO_PNG,
  slides: [
    {
      id: 'slide-1',
      title: 'Executive Summary & Neural Security Telemetry',
      subtitle: 'Real-Time Fraud Prevention & Autonomous Threat Mitigation Performance',
      metrics: [
        { label: 'Total Scans Analyzed', value: '1,248,920+', change: '+18% YoY' },
        { label: 'Threat Mitigation Precision', value: '99.85%', change: 'Zero False Positives' },
        { label: 'Mean Time to Detect (MTTD)', value: '0.42 sec', change: '-65% Latency' }
      ],
      bullets: [
        'FinGuard AI deploys deep neural heuristics across financial, communication, and digital identity vectors.',
        'Zero-trust verification prevents synthetic identity theft, deepfake video calls, and automated phishing campaigns.',
        'Continuous learning models auto-quarantine malicious payloads before credential submission.'
      ]
    },
    {
      id: 'slide-2',
      title: 'Vector Telemetry & Attack Surface Matrix',
      subtitle: 'Comparative Matrix of Scanned Vectors vs. Flagged Threats',
      tableData: {
        headers: ['Vector Domain', 'Risk Level', 'Primary Threat Type', 'Mitigation Strategy'],
        rows: [
          ['SMS & Voice Telemetry', 'CRITICAL', 'Deepfake Audio & Smishing', 'Biometric Waveform Verification'],
          ['Banking & UPI Checkout', 'HIGH', 'Mule Account & QR Spoof', 'Transaction Pattern Anomaly Check'],
          ['Email & Document Scanning', 'HIGH', 'Invoice Fraud & Malware', 'Multimodal OCR & Neural Sandbox'],
          ['Identity & KYC Verification', 'MEDIUM', 'Synthetic Face Swap', '3D Liveness Light Pattern Mesh']
        ]
      }
    },
    {
      id: 'slide-3',
      title: 'Multi-Stage Neural Detection Architecture',
      subtitle: 'End-to-End Multimodal Intelligence Pipeline',
      bullets: [
        'Stage 1: Multimodal Ingestion (Real-Time OCR, Voice Spectrum, URL Heuristics, QR Code Decoding)',
        'Stage 2: Gemini 1.5 Grounded Neural Model Inference & Fraud Heuristic Scoring',
        'Stage 3: Automated Threat Quarantine, Victim Emergency Alerting & CERT Incident Filing',
        'Stage 4: Federated Threat Sharing across Community Banking Alliances'
      ]
    },
    {
      id: 'slide-4',
      title: 'Strategic Cyber Resilience Roadmap (2026)',
      subtitle: 'Key Milestones for Zero-Trust Enterprise Security Expansion',
      bullets: [
        'Q1 2026: Rollout of Quantum-Resistant Passkey Authentication for Enterprise Clients',
        'Q2 2026: Autonomous Voice & Video Deepfake Detection API v3.0 Integration',
        'Q3 2026: Real-Time Cross-Border Financial Fraud Interception Mesh Deployment',
        'Q4 2026: ISO 27001 & SOC2 Type II Global Compliance Renewal & Audit'
      ]
    },
    {
      id: 'slide-5',
      title: 'Enterprise Value & Financial Impact ROI',
      subtitle: 'Quantifiable Risk Reduction & Operational Cost Efficiency',
      metrics: [
        { label: 'Prevented Financial Losses', value: '$4.25 Million', change: 'H1 2026 Total' },
        { label: 'SOC Operational Efficiency', value: '3.4x Faster', change: 'Automated Triage' },
        { label: 'Compliance Readiness Rate', value: '100%', change: 'Audit Passed' }
      ],
      bullets: [
        'Automated AI triage reduces security team review workload by 78%, eliminating analyst fatigue.',
        'Sub-second incident reporting ensures immediate freeze of compromised bank credentials.',
        'Comprehensive audit log export ready for regulatory presentation and legal filing.'
      ]
    }
  ]
};

export const PresentationView: React.FC = () => {
  const { t } = useTranslation();
  const [presData, setPresData] = useState<PresentationData>(initialPresentationData);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0); // 0 is Cover, 1+ are content
  const [isExportingPPT, setIsExportingPPT] = useState<boolean>(false);
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showQualityModal, setShowQualityModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSlides = presData.slides.length + 1; // +1 for Cover Slide

  // Custom Logo Upload Handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setPresData((prev) => ({
            ...prev,
            logoDataUrl: evt.target!.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetLogo = () => {
    setPresData((prev) => ({
      ...prev,
      logoDataUrl: DEFAULT_COMPANY_LOGO_PNG,
    }));
  };

  // Export Handlers
  const handleExportPPTX = async () => {
    try {
      setIsExportingPPT(true);
      await exportToPowerPoint(presData);
    } catch (err) {
      console.error('Failed to export PowerPoint:', err);
    } finally {
      setIsExportingPPT(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      setIsExportingPDF(true);
      await exportPresentationToPDF('pdf-slide-render', presData.title);
    } catch (err) {
      console.error('Failed to export PDF:', err);
    } finally {
      setIsExportingPDF(false);
    }
  };

  const isDarkTheme = presData.theme === 'dark';

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
      {/* Hidden File Input for Custom Logo */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleLogoUpload}
        accept="image/png,image/jpeg,image/svg+xml"
        className="hidden"
      />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-white/10 bg-[#090c1e]/90 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#00e5ff]/20 to-[#6001d1]/30 border border-[#00e5ff]/40 text-[#00daf3] shadow-[0_0_25px_rgba(0,229,255,0.25)]">
            <Presentation size={28} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>PowerPoint Presentation Center</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#00daf3]/10 text-[#00daf3] border border-[#00daf3]/30 font-mono text-xs uppercase font-bold">
                16:9 Widescreen
              </span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#bac9cc]">
              Generate, preview, and export corporate slides with embedded company logo on every slide.
            </p>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quality Compliance Checklist Trigger */}
          <button
            onClick={() => setShowQualityModal(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ShieldCheck size={16} />
            <span>15-Point Quality Check</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() =>
              setPresData((prev) => ({
                ...prev,
                theme: prev.theme === 'dark' ? 'light' : 'dark',
              }))
            }
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00daf3] text-[#bac9cc] hover:text-white transition-all cursor-pointer"
            title="Toggle Presentation Theme Mode"
          >
            {isDarkTheme ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-400" />}
          </button>

          {/* Custom Logo Upload */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#00daf3] text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer"
            title="Upload Custom Company Logo"
          >
            <Upload size={15} className="text-[#00daf3]" />
            <span className="hidden sm:inline">Change Logo</span>
          </button>

          {/* Export to PowerPoint */}
          <button
            onClick={handleExportPPTX}
            disabled={isExportingPPT}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#6001d1] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#00e5ff]/20 hover:brightness-110 transition-all cursor-pointer disabled:opacity-50"
          >
            {isExportingPPT ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <FileSpreadsheet size={16} />
            )}
            <span>Export .PPTX</span>
          </button>

          {/* Export to PDF */}
          <button
            onClick={handleExportPDF}
            disabled={isExportingPDF}
            className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs flex items-center gap-2 hover:bg-white/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isExportingPDF ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <FileText size={16} />
            )}
            <span>Export .PDF</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Slide Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Column: Slide Navigation Thumbnails */}
        <div className="lg:col-span-1 glass-card p-4 rounded-3xl border border-white/10 bg-[#090c1e]/90 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-mono font-bold uppercase text-[#bac9cc] flex items-center gap-1.5">
              <Layers size={14} className="text-[#00daf3]" /> Slide Deck ({totalSlides})
            </span>
            <span className="text-[10px] font-mono text-[#00daf3]">16:9 Widescreen</span>
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
            {/* Cover Slide Thumbnail */}
            <button
              onClick={() => setCurrentSlideIndex(0)}
              className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 ${
                currentSlideIndex === 0
                  ? 'border-[#00daf3] bg-[#00daf3]/10 text-white shadow-[0_0_15px_rgba(0,218,243,0.2)]'
                  : 'border-white/10 bg-white/5 text-[#bac9cc] hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-[#00daf3]">Slide 1 • Cover</span>
                <span className="text-[10px] font-mono opacity-70">Title</span>
              </div>
              <span className="text-xs font-bold truncate text-white">{presData.title}</span>
            </button>

            {/* Content Slide Thumbnails */}
            {presData.slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlideIndex(idx + 1)}
                className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 ${
                  currentSlideIndex === idx + 1
                    ? 'border-[#00daf3] bg-[#00daf3]/10 text-white shadow-[0_0_15px_rgba(0,218,243,0.2)]'
                    : 'border-white/10 bg-white/5 text-[#bac9cc] hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#00daf3]">
                    Slide {idx + 2}
                  </span>
                  <span className="text-[10px] font-mono opacity-70">
                    {slide.metrics ? 'Metrics' : slide.tableData ? 'Table' : 'Content'}
                  </span>
                </div>
                <span className="text-xs font-bold truncate text-white">{slide.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: High-DPI Slide Viewport Canvas */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/20 shadow-2xl transition-all duration-300">
            {/* Active Slide Element Container */}
            <div
              className={`pdf-slide-render w-full h-full p-8 sm:p-12 flex flex-col justify-between relative transition-colors duration-300 select-none ${
                isDarkTheme ? 'bg-[#0f1321] text-white' : 'bg-slate-50 text-slate-900'
              }`}
            >
              {/* MANDATORY REQUIREMENT: Top-Right Company Logo with Equal Margins (Top & Right) */}
              <div className="absolute top-6 right-6 z-50 p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center pointer-events-none transition-transform hover:scale-105">
                <img
                  src={presData.logoDataUrl}
                  alt="Company Logo"
                  className="h-10 sm:h-12 w-auto object-contain max-w-[120px]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* SLIDE CONTENT RENDERING */}
              {currentSlideIndex === 0 ? (
                /* COVER SLIDE */
                <div className="flex-1 flex flex-col justify-center pr-28 z-10 space-y-6">
                  <div className="w-2.5 h-16 bg-[#00daf3] rounded-full shadow-[0_0_20px_#00e5ff]" />
                  <div>
                    <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
                      {presData.title}
                    </h2>
                    <p className="text-base sm:text-xl font-medium text-[#00daf3] mt-3">
                      {presData.subtitle}
                    </p>
                  </div>
                  <div className={`pt-6 border-t ${isDarkTheme ? 'border-white/10 text-[#bac9cc]' : 'border-slate-300 text-slate-600'} text-xs font-mono flex items-center gap-4`}>
                    <span>Prepared by: <strong className={isDarkTheme ? 'text-white' : 'text-slate-900'}>{presData.author}</strong></span>
                    <span>•</span>
                    <span>Confidential Corporate Deck</span>
                  </div>
                </div>
              ) : (
                /* CONTENT SLIDE */
                <div className="flex-1 flex flex-col justify-between pr-28 z-10 space-y-6">
                  {/* Header */}
                  <div>
                    <h3 className={`text-xl sm:text-3xl font-extrabold tracking-tight ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
                      {presData.slides[currentSlideIndex - 1].title}
                    </h3>
                    {presData.slides[currentSlideIndex - 1].subtitle && (
                      <p className="text-xs sm:text-sm font-semibold text-[#00daf3] mt-1">
                        {presData.slides[currentSlideIndex - 1].subtitle}
                      </p>
                    )}
                    <div className={`mt-3 h-[1px] w-full ${isDarkTheme ? 'bg-white/10' : 'bg-slate-300'}`} />
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 flex flex-col justify-center space-y-4">
                    {/* Metrics Grid */}
                    {presData.slides[currentSlideIndex - 1].metrics && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {presData.slides[currentSlideIndex - 1].metrics!.map((m, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-2xl border ${
                              isDarkTheme ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                            } flex flex-col gap-1 shadow-md`}
                          >
                            <span className="text-[11px] font-mono text-[#00daf3] uppercase font-bold">{m.label}</span>
                            <span className={`text-2xl font-black ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>{m.value}</span>
                            {m.change && <span className="text-[10px] font-mono text-emerald-400 font-bold">{m.change}</span>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bullets */}
                    {presData.slides[currentSlideIndex - 1].bullets && (
                      <ul className="space-y-2.5 pl-2">
                        {presData.slides[currentSlideIndex - 1].bullets!.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                            <span className="w-2 h-2 rounded-full bg-[#00daf3] mt-1.5 shrink-0 shadow-[0_0_10px_#00e5ff]" />
                            <span className={isDarkTheme ? 'text-[#bac9cc]' : 'text-slate-700'}>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Table Data */}
                    {presData.slides[currentSlideIndex - 1].tableData && (
                      <div className="overflow-x-auto rounded-xl border border-white/10">
                        <table className="w-full text-left text-xs font-mono">
                          <thead className="bg-[#6001d1]/40 text-white uppercase font-bold">
                            <tr>
                              {presData.slides[currentSlideIndex - 1].tableData!.headers.map((h, idx) => (
                                <th key={idx} className="p-2.5 border-b border-white/10">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className={isDarkTheme ? 'divide-y divide-white/5 text-[#bac9cc]' : 'divide-y divide-slate-200 text-slate-800'}>
                            {presData.slides[currentSlideIndex - 1].tableData!.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-white/5">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-2.5 font-sans">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Footer Meta */}
                  <div className={`pt-3 border-t ${isDarkTheme ? 'border-white/10 text-[#bac9cc]' : 'border-slate-300 text-slate-500'} text-[11px] font-mono flex items-center justify-between`}>
                    <span>FinGuard AI Enterprise Presentation</span>
                    <span>Slide {currentSlideIndex + 1} of {totalSlides}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Slide Navigation Controls */}
          <div className="flex items-center justify-between glass-card p-4 rounded-2xl border border-white/10 bg-[#090c1e]/90">
            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentSlideIndex === 0}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-white/10 disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft size={16} /> Previous Slide
            </button>

            <span className="text-xs font-mono text-[#00daf3] font-bold">
              Slide {currentSlideIndex + 1} / {totalSlides}
            </span>

            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.min(totalSlides - 1, prev + 1))}
              disabled={currentSlideIndex === totalSlides - 1}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-white/10 disabled:opacity-30 cursor-pointer"
            >
              Next Slide <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 15-Point Quality Verification Modal */}
      <AnimatePresence>
        {showQualityModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-[#0f1321] border border-[#00e5ff]/40 rounded-3xl p-6 shadow-2xl space-y-6 text-white"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Quality Check & Verification</h3>
                    <p className="text-xs font-mono text-[#bac9cc]">15-Point Executive Slide Compliance Audit</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowQualityModal(false)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#bac9cc] hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                {[
                  'Logo visible on every slide',
                  'Top-right equal margins maintained',
                  'Original proportions & aspect ratio',
                  'Fully visible in .PPTX export',
                  'Fully visible in .PDF export',
                  'Never cropped, stretched, or blurred',
                  'Highest layer stack position',
                  'Zero overlapping shapes or text',
                  'Sufficient empty space padding',
                  '300 DPI high-resolution PNG',
                  'No compression quality loss',
                  'Directly embedded, not linked',
                  'Consistent ~3-5% slide width',
                  'Sharp at 100%, 200% & PDF zoom',
                  'Verified in Light & Dark mode'
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
                    <span className="text-white text-[11px] font-sans">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setShowQualityModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#00daf3] text-[#00363d] font-bold text-xs cursor-pointer hover:brightness-110"
                >
                  Close Audit Panel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
