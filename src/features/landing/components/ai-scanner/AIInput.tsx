import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScanType, ScanStatus } from './types';
import { ClipboardPaste, X, Loader2, Sparkles, AlertCircle, CheckCircle2, FileUp, FileText } from 'lucide-react';
import { ScanningOverlay } from '../../../../components/animations/ScanningOverlay';
import { extractTextFromFile } from '../../../../utils/fileExtractor';

interface AIInputProps {
  status: ScanStatus;
  scanType: ScanType;
  setScanType: (type: ScanType) => void;
  inputText: string;
  setInputText: (text: string) => void;
  onAnalyze: () => void;
  onLoadSample: (type: ScanType, isSafe: boolean) => void;
}

const TABS: ScanType[] = ['SMS', 'Email', 'WhatsApp', 'URL', 'Screenshot', 'QR Code', 'Voice'];

export const AIInput: React.FC<AIInputProps> = ({
  status,
  scanType,
  setScanType,
  inputText,
  setInputText,
  onAnalyze,
  onLoadSample
}) => {
  const isAnalyzing = status === 'analyzing';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExtractingFile, setIsExtractingFile] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.readText === 'function') {
        const text = await navigator.clipboard.readText();
        if (text) {
          setInputText(text);
          return;
        }
      }
    } catch (err) {
      console.warn('Clipboard readText restricted or unavailable:', err);
    }

    const fallbackText = window.prompt('Paste your text or link here:');
    if (fallbackText) {
      setInputText(fallbackText);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtractingFile(true);
    setUploadedFileName(file.name);
    try {
      const result = await extractTextFromFile(file);
      if (result.text) {
        setInputText(result.text);
      }
    } catch (err) {
      console.error('File extraction failed:', err);
    } finally {
      setIsExtractingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="bg-white rounded-[20px] p-6 lg:p-8 flex flex-col gap-6 border border-[#E4E7E5] shadow-xs">
      
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".txt,.pdf,.doc,.docx,image/*"
        className="hidden"
      />

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              if (!isAnalyzing && !isExtractingFile) {
                setScanType(tab);
                setInputText('');
                setUploadedFileName(null);
              }
            }}
            disabled={isAnalyzing || isExtractingFile}
            className={`px-4 py-2 rounded-[16px] text-xs font-bold transition-all shrink-0 border cursor-pointer ${
              scanType === tab
                ? 'bg-[#11875D] text-white border-[#11875D] shadow-2xs'
                : 'bg-[#F8FAFC] text-[#64748B] border-[#E4E7E5] hover:text-[#111827] hover:bg-white disabled:opacity-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isAnalyzing || isExtractingFile}
            placeholder={`Paste suspicious ${scanType} content or upload file (txt, pdf, docx, screenshot)...`}
            className="w-full h-48 lg:h-60 bg-[#F8FAFC] border border-[#E4E7E5] rounded-[16px] p-4 text-[#111827] text-sm font-medium resize-none focus:outline-none focus:border-[#11875D] focus:ring-1 focus:ring-[#11875D] transition-all disabled:opacity-70 disabled:cursor-not-allowed placeholder:text-[#94A3B8]"
          />

          <AnimatePresence>
            {isExtractingFile && (
              <div className="absolute inset-0 bg-white/90 rounded-[16px] flex flex-col items-center justify-center gap-3 z-20">
                <Loader2 size={28} className="animate-spin text-[#11875D]" />
                <span className="text-xs font-semibold text-[#111827]">
                  Extracting text from {uploadedFileName}...
                </span>
              </div>
            )}
            {isAnalyzing && (
              <ScanningOverlay
                scanType={scanType}
                statusText={`Deep-scanning ${scanType} payload & running AI threat detection...`}
                payloadPreview={inputText}
              />
            )}
          </AnimatePresence>
          
          <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10">
            <AnimatePresence>
              {inputText.length > 0 && !isAnalyzing && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => {
                    setInputText('');
                    setUploadedFileName(null);
                  }}
                  className="p-2 rounded-xl bg-white border border-[#E4E7E5] hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#111827] transition-colors cursor-pointer shadow-2xs"
                  title="Clear input"
                >
                  <X size={16} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* File Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing || isExtractingFile}
              className="p-2 rounded-xl bg-white border border-[#E4E7E5] hover:bg-[#F8FAFC] text-[#11875D] transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
              title="Upload file"
            >
              <FileUp size={16} />
            </button>

            {/* Paste Button */}
            <button
              onClick={handlePaste}
              disabled={isAnalyzing || isExtractingFile}
              className="p-2 rounded-xl bg-white border border-[#E4E7E5] hover:bg-[#F8FAFC] text-[#11875D] transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
              title="Paste from clipboard"
            >
              <ClipboardPaste size={16} />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-[#64748B] font-medium">
          <div className="flex gap-3 items-center">
            <button 
              onClick={() => onLoadSample(scanType, false)}
              disabled={isAnalyzing || isExtractingFile}
              className="hover:text-[#EF4444] transition-colors flex items-center gap-1 font-bold cursor-pointer"
            >
              <AlertCircle size={14} className="text-[#EF4444]" /> Sample Scam
            </button>
            <button 
              onClick={() => onLoadSample(scanType, true)}
              disabled={isAnalyzing || isExtractingFile}
              className="hover:text-[#10B981] transition-colors flex items-center gap-1 font-bold cursor-pointer"
            >
              <CheckCircle2 size={14} className="text-[#10B981]" /> Sample Safe
            </button>
            {uploadedFileName && (
              <span className="text-[#11875D] flex items-center gap-1 bg-[#DDF2EA] px-2 py-0.5 rounded-full font-bold">
                <FileText size={12} /> {uploadedFileName}
              </span>
            )}
          </div>
          <span>{inputText.length} characters</span>
        </div>
      </div>

      {/* Analyze Button */}
      <div className="pt-2">
        <button
          onClick={onAnalyze}
          disabled={inputText.trim().length === 0 || isAnalyzing || isExtractingFile}
          className="w-full py-3.5 rounded-[16px] bg-[#11875D] hover:bg-[#0e704d] text-white font-bold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
        >
          {isAnalyzing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Analyzing with AI...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Analyze with AI</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
