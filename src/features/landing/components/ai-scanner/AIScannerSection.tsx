import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScanStatus, ScanType, ScanResult, AnalysisStage } from './types';
import { AIInput } from './AIInput';
import { ThreatScoreAnimation } from './ThreatScoreAnimation';
import { ScanHistory } from './ScanHistory';
import { Sparkles, ShieldAlert, RefreshCw, ShieldCheck } from 'lucide-react';
import { scanService } from '../../../../services/scanService';
import { SCAM_SAMPLES, SAFE_SAMPLES } from '../../../../utils/fileExtractor';
import { ScannerErrorBoundary } from '../../../../components/common/ScannerErrorBoundary';

export const AIScannerSection: React.FC = () => {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [scanType, setScanType] = useState<ScanType>('SMS');
  const [inputText, setInputText] = useState('');
  const [history, setHistory] = useState<ScanResult[]>([]);
  const [currentResult, setCurrentResult] = useState<ScanResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoadSample = (type: ScanType, isSafe: boolean) => {
    const samples = isSafe ? SAFE_SAMPLES : SCAM_SAMPLES;
    const key = type in samples ? type : 'SMS';
    setInputText(samples[key] || '');
    setStatus('idle');
    setCurrentResult(null);
    setErrorMessage(null);
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setStatus('analyzing');
    setCurrentResult(null);
    setErrorMessage(null);

    try {
      const result = await scanService.scanContent(scanType as any, inputText);
      if (result) {
        setCurrentResult(result);
        setHistory(prev => [result, ...prev].slice(0, 10));
        setStatus('completed');
      } else {
        throw new Error("Unable to parse scan analysis results.");
      }
    } catch (err: any) {
      console.error("Analysis scan error:", err);
      setErrorMessage(err?.message || "Failed to analyze message. Please try again.");
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setInputText('');
    setCurrentResult(null);
    setErrorMessage(null);
  };

  return (
    <ScannerErrorBoundary onReset={handleReset}>
      <section className="relative py-12 lg:py-20 bg-[#F7F8F5]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 text-[#11875D] text-xs font-bold uppercase tracking-wider mx-auto"
            >
              <Sparkles size={14} />
              <span>AI Detection Portal</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-bold text-3xl sm:text-4xl text-[#111827] tracking-tight"
            >
              Real-Time AI Scam Analysis
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base text-[#64748B] max-w-2xl mx-auto"
            >
              Paste any suspicious SMS, email, URL or text to receive instant, explainable risk assessment.
            </motion.p>
          </div>

          {/* 2 Column Scanner Layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Input Card */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <AIInput 
                status={status}
                scanType={scanType}
                setScanType={setScanType}
                inputText={inputText}
                setInputText={setInputText}
                onAnalyze={handleAnalyze}
                onLoadSample={handleLoadSample}
              />
              
              {history.length > 0 && (
                <div className="hidden lg:block">
                  <ScanHistory history={history} />
                </div>
              )}
            </div>

            {/* Right Column: Output / Result Cards */}
            <div className="lg:col-span-6 flex flex-col h-full relative">
              <AnimatePresence mode="wait">
                {status === 'idle' ? (
                  /* Empty State Card */
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-white rounded-[20px] border border-[#E4E7E5] flex flex-col items-center justify-center p-12 text-center min-h-[420px] shadow-xs"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-center mb-5 text-[#11875D]">
                      <ShieldCheck size={38} />
                    </div>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">No Scan Yet</h3>
                    <p className="text-sm text-[#64748B] max-w-sm leading-relaxed">
                      Paste suspicious content into the input box to begin instant AI threat evaluation.
                    </p>
                  </motion.div>
                ) : status === 'error' ? (
                  /* Error State Card */
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-white rounded-[20px] p-8 border border-red-200 flex flex-col items-center justify-center text-center gap-5 min-h-[420px] shadow-xs"
                  >
                    <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-[#EF4444]">
                      <ShieldAlert size={32} />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-[#111827]">Scan Unsuccessful</h3>
                      <p className="text-xs text-[#64748B] max-w-md mx-auto">
                        {errorMessage || 'Unable to complete AI scan analysis. Please check your input and try again.'}
                      </p>
                    </div>
                    <button
                      onClick={handleAnalyze}
                      className="px-5 py-2.5 rounded-[16px] bg-[#EF4444] text-white font-bold text-xs flex items-center gap-2 hover:bg-red-600 transition-all cursor-pointer"
                    >
                      <RefreshCw size={14} />
                      <span>Retry Scan</span>
                    </button>
                  </motion.div>
                ) : currentResult ? (
                  /* Threat Score Animation Sequence (Step 1 -> Step 2 -> Step 3) */
                  <ThreatScoreAnimation 
                    key={currentResult.id || 'anim_res'}
                    result={currentResult} 
                    onReset={handleReset} 
                  />
                ) : null}
              </AnimatePresence>
            </div>

            {/* History for mobile */}
            {history.length > 0 && (
              <div className="lg:hidden col-span-full mt-6">
                <ScanHistory history={history} />
              </div>
            )}
          </div>

        </div>
      </section>
    </ScannerErrorBoundary>
  );
};
