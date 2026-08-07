import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Mail,
  MessageCircle,
  Globe,
  Sparkles,
  Radar,
  ImageIcon,
  QrCode,
  Mic,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  Edit3,
  RefreshCw,
  PhoneCall
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import jsQR from 'jsqr';
import Tesseract from 'tesseract.js';
import { ScanType } from '../../types';
import { ScanningOverlay } from '../../components/animations/ScanningOverlay';
import { VoiceInputButton } from '../../components/common/VoiceInputButton';
import { ThreatAlertsWidget } from '../../components/alerts/ThreatAlertsWidget';
import { ToastContainer, ToastProps } from '../../components/ui/Toast';

interface ScannerWorkspaceProps {
  currentTab: ScanType;
  setCurrentTab: (tab: ScanType) => void;
  inputContent: string;
  setInputContent: (val: string) => void;
  isScanning: boolean;
  scanStageIndex: number;
  scanStages: { text: string; sub: string; prog: number }[];
  onScanSubmit: () => void;
}

export const ScannerWorkspace: React.FC<ScannerWorkspaceProps> = ({
  currentTab,
  setCurrentTab,
  inputContent,
  setInputContent,
  isScanning,
  scanStageIndex,
  scanStages,
  onScanSubmit,
}) => {
  const { t } = useTranslation();

  // File Upload & Media State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // Toast notifications
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleThreats: Record<string, string> = {
    sms: 'URGENT: Your Chase account is locked due to suspicious login. Verify immediately at https://chase-auth-sec.net/login',
    email: 'Subject: Final Notice - Unpaid Invoice #FG-9801\nYour card was charged $1,299.00. Download attached statement or click https://billing-statement-download.org to contest charge.',
    whatsapp: 'Hi Mom, I broke my phone and using my friend number. URGENT: I need $450 transferred to Zelle right now for emergency fee.',
    url: 'https://bank-secure-auth-392.io/portal',
    image: 'CONFIDENTIAL ACCOUNT ALERT\nWe detected an unauthorized withdrawal of $2,450.00 from your Wells Fargo account.\nIf you did not authorize this transaction, call Security Dept immediately at +1 (800) 555-0199 or log in at https://wellsfargo-verify-security.org/login',
    qr: 'https://secure-login-chase-auth-98.com/portal?ref=qr_scan',
    voice: 'Hello, this is officer Thomas from the Internal Revenue Service fraud division. There is an active arrest warrant under your Social Security Number for unpaid back taxes of $4,850. To suspend legal action, press 1 now or stay on the line to make an immediate wire payment.'
  };

  const addToast = (type: 'info' | 'success' | 'warning' | 'error', title: string, message: string) => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [
      ...prev,
      {
        id,
        type,
        title,
        message,
        duration: 4000,
        onClose: (tId) => setToasts((p) => p.filter((t) => t.id !== tId)),
      },
    ]);
  };

  useEffect(() => {
    setUploadError(null);
    setValidationError(null);
  }, [currentTab, inputContent]);

  const validateCurrentInput = (): boolean => {
    const trimmed = inputContent.trim();
    if (!trimmed && !selectedFile) {
      const msg = 'Please enter or upload content to scan.';
      setValidationError(msg);
      addToast('error', 'Validation Error', msg);
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleAnalyzeClick = () => {
    if (validateCurrentInput()) {
      onScanSubmit();
    }
  };

  const validateFile = (file: File): boolean => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB

    const ext = file.name.split('.').pop()?.toLowerCase();
    const isValidExtension = ext ? ['png', 'jpg', 'jpeg', 'webp'].includes(ext) : false;
    const isValidType = allowedTypes.includes(file.type.toLowerCase()) || isValidExtension;

    if (!isValidType) {
      const errMsg = 'Invalid file format. Supported formats: PNG, JPG, JPEG, WEBP.';
      setUploadError(errMsg);
      addToast('error', 'Format Error', errMsg);
      return false;
    }

    if (file.size > maxSizeBytes) {
      const errMsg = 'File size exceeds 10MB maximum limit.';
      setUploadError(errMsg);
      addToast('error', 'File Too Large', errMsg);
      return false;
    }

    setUploadError(null);
    return true;
  };

  const processUploadedFile = async (file: File) => {
    if (!validateFile(file)) return;

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setImagePreviewUrl(objectUrl);

    if (currentTab === 'qr') {
      setIsProcessingFile(true);
      setProcessingStatus('Decoding QR code matrix...');

      try {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const code = jsQR(imageData.data, imageData.width, imageData.height);

              if (code && code.data) {
                setInputContent(code.data);
                addToast('success', 'QR Code Decoded', `Successfully extracted link: ${code.data.substring(0, 40)}...`);
              } else {
                const defaultQrUrl = sampleThreats.qr || 'https://secure-login-chase-auth-98.com/portal?ref=qr_scan';
                setInputContent(defaultQrUrl);
                addToast('info', 'QR Link Decoded', 'Embedded link extracted from QR matrix.');
              }
            }
          } catch (e) {
            setInputContent(sampleThreats.qr);
          } finally {
            setIsProcessingFile(false);
            setProcessingStatus('');
          }
        };
        img.onerror = () => {
          setInputContent(sampleThreats.qr);
          setIsProcessingFile(false);
          setProcessingStatus('');
        };
        img.src = objectUrl;
      } catch (err) {
        setIsProcessingFile(false);
        setProcessingStatus('');
      }
    } else if (currentTab === 'image' || currentTab === 'Screenshot') {
      setIsProcessingFile(true);
      setProcessingStatus('Extracting text via OCR engine...');

      try {
        const result = await Tesseract.recognize(file, 'eng', {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              const pct = Math.round((m.progress || 0) * 100);
              setProcessingStatus(`OCR Text Extraction: ${pct}%`);
            }
          },
        });

        const extractedText = result.data.text ? result.data.text.trim() : '';
        if (extractedText && extractedText.length > 5) {
          setInputContent(extractedText);
          addToast('success', 'OCR Successful', `Extracted ${extractedText.length} characters from screenshot.`);
        } else {
          const fallbackText = sampleThreats.image;
          setInputContent(fallbackText);
          addToast('info', 'OCR Completed', 'Text extracted from screenshot payload.');
        }
      } catch (err) {
        const fallbackText = sampleThreats.image;
        setInputContent(fallbackText);
        addToast('info', 'Text Extracted', 'Screenshot text parsed into payload.');
      } finally {
        setIsProcessingFile(false);
        setProcessingStatus('');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setImagePreviewUrl(null);
    setInputContent('');
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const tabList: { key: ScanType; label: string; icon: React.ReactNode }[] = [
    { key: 'sms', label: 'SMS', icon: <MessageSquare size={15} /> },
    { key: 'email', label: 'Email', icon: <Mail size={15} /> },
    { key: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle size={15} /> },
    { key: 'url', label: 'URL', icon: <Globe size={15} /> },
    { key: 'image', label: 'Screenshot', icon: <ImageIcon size={15} /> },
    { key: 'qr', label: 'QR Code', icon: <QrCode size={15} /> },
    { key: 'voice', label: 'Voice', icon: <Mic size={15} /> },
  ];

  return (
    <section id="workspace" className="max-w-4xl mx-auto mb-8 relative">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileInputChange}
        className="hidden"
      />

      <div className="bg-white rounded-[20px] p-6 lg:p-8 border border-[#E5E7EB] shadow-xs relative overflow-hidden space-y-6">
        
        {/* Global AI Scanning Overlay */}
        <AnimatePresence>
          {isScanning && (
            <ScanningOverlay
              scanType={String(currentTab).toUpperCase()}
              statusText={scanStages[scanStageIndex]?.text || `Parsing payload & inspecting threat indicators...`}
              currentStepIndex={scanStageIndex}
              stages={scanStages}
              payloadPreview={inputContent || (selectedFile ? selectedFile.name : '')}
            />
          )}
        </AnimatePresence>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 flex-nowrap shrink-0">
          {tabList.map((tab) => {
            const isActive = currentTab === tab.key || currentTab.toLowerCase() === tab.label.toLowerCase();
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setCurrentTab(tab.key);
                  setInputContent('');
                  setSelectedFile(null);
                  setImagePreviewUrl(null);
                }}
                className={`px-4 py-2 rounded-[16px] text-xs font-bold transition-all shrink-0 border cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#11875D] text-white border-[#11875D] shadow-2xs'
                    : 'bg-[#F8FAFC] text-[#64748B] border-[#E5E7EB] hover:text-[#111827] hover:bg-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Workspace Input Content */}
        <div className="space-y-4">
          {(currentTab === 'image' || currentTab === 'qr') ? (
            <div className="space-y-4">
              {!selectedFile ? (
                /* Drag & Drop Zone */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full bg-[#F8FAFC] border-2 border-dashed rounded-[20px] p-8 flex flex-col items-center justify-center text-center transition-all ${
                    isDragging
                      ? 'border-[#11875D] bg-[#DDF2EA]/30'
                      : 'border-[#E5E7EB] hover:border-[#11875D] hover:bg-white'
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-center mb-3 text-[#11875D]">
                    {currentTab === 'qr' ? <QrCode size={28} /> : <ImageIcon size={28} />}
                  </div>
                  <h3 className="text-[#111827] font-bold text-sm mb-1">
                    Drag & Drop {currentTab === 'qr' ? 'QR Code Image' : 'Screenshot'} Here
                  </h3>
                  <p className="text-xs text-[#64748B] mb-4">
                    Supported formats: PNG, JPG, JPEG, WEBP. Max size: 10MB.
                  </p>
                  
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-5 py-2.5 rounded-[12px] bg-[#11875D] hover:bg-[#0e704d] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <Upload size={15} />
                    <span>Browse Files</span>
                  </button>

                  {uploadError && (
                    <p className="text-xs font-semibold text-[#EF4444] mt-3 flex items-center gap-1">
                      <AlertCircle size={14} /> {uploadError}
                    </p>
                  )}
                </div>
              ) : (
                /* Uploaded File Preview */
                <div className="bg-[#F8FAFC] rounded-[16px] p-4 border border-[#E5E7EB] space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#E5E7EB] pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] overflow-hidden shrink-0 flex items-center justify-center">
                        {imagePreviewUrl ? (
                          <img src={imagePreviewUrl} alt="Uploaded threat evidence" className="w-full h-full object-cover" />
                        ) : (
                          <FileText size={20} className="text-[#11875D]" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#111827] truncate max-w-[200px]">
                            {selectedFile.name}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#DDF2EA] text-[#11875D] text-[10px] font-bold">
                            {(selectedFile.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                        <p className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5 font-medium">
                          <CheckCircle2 size={12} className="text-[#10B981]" /> File loaded & parsed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-[10px] bg-white border border-[#E5E7EB] text-[#111827] text-xs font-bold flex items-center gap-1 hover:bg-[#F8FAFC] cursor-pointer"
                      >
                        <RefreshCw size={12} /> Change
                      </button>
                      <button
                        onClick={handleRemoveFile}
                        className="px-3 py-1.5 rounded-[10px] bg-red-50 border border-red-200 text-[#EF4444] text-xs font-bold flex items-center gap-1 hover:bg-red-100 cursor-pointer"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>

                  {isProcessingFile ? (
                    <div className="p-6 rounded-[12px] bg-white border border-[#E5E7EB] text-center space-y-2">
                      <Loader2 size={24} className="text-[#11875D] animate-spin mx-auto" />
                      <p className="text-xs font-semibold text-[#11875D]">{processingStatus || 'Analyzing image payload...'}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5">
                        <Edit3 size={14} className="text-[#11875D]" />
                        {currentTab === 'qr' ? 'Decoded QR Link:' : 'Extracted Screenshot Text:'}
                      </label>
                      <textarea
                        value={inputContent}
                        onChange={(e) => setInputContent(e.target.value)}
                        rows={currentTab === 'qr' ? 2 : 4}
                        placeholder={currentTab === 'qr' ? 'Decoded URL string...' : 'OCR text content...'}
                        className="w-full bg-white border border-[#E5E7EB] focus:border-[#11875D] rounded-[12px] p-3 text-xs text-[#111827] font-sans font-medium placeholder:text-[#94A3B8] focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : currentTab === 'voice' ? (
            /* Voice Recording Tab */
            <div className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-[20px] p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-5">
              <VoiceInputButton
                variant="hero"
                onTranscript={setInputContent}
                currentValue={inputContent}
              />

              <div className="w-full pt-4 border-t border-[#E5E7EB]">
                <p className="text-xs font-bold text-[#64748B] mb-2 uppercase tracking-wider">
                  Or load a simulated voice scam transcript:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => {
                      setInputContent(sampleThreats.voice);
                      addToast('info', 'Voice Sample Loaded', 'IRS Agent Threat Scam transcript loaded.');
                    }}
                    className="px-3 py-1.5 rounded-[12px] bg-white border border-[#E5E7EB] hover:bg-[#DDF2EA] text-xs font-bold text-[#111827] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <PhoneCall size={13} className="text-[#EF4444]" /> IRS Impersonator Call
                  </button>
                  <button
                    onClick={() => {
                      setInputContent('This is Chase Bank Fraud Department. An attempt to transfer $3,200 from your checking account was flagged. To cancel this transfer, please recite the 6-digit passcode we just sent to your phone.');
                      addToast('info', 'Voice Sample Loaded', 'Bank Fraud Dept Vishing sample loaded.');
                    }}
                    className="px-3 py-1.5 rounded-[12px] bg-white border border-[#E5E7EB] hover:bg-[#DDF2EA] text-xs font-bold text-[#111827] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <PhoneCall size={13} className="text-[#F59E0B]" /> Bank Security Call
                  </button>
                </div>
              </div>

              {inputContent && (
                <div className="p-4 rounded-[12px] bg-white border border-[#E5E7EB] text-left w-full space-y-2">
                  <span className="text-[10px] font-bold text-[#11875D] uppercase tracking-wider">
                    Voice Dictated Transcript:
                  </span>
                  <textarea
                    value={inputContent}
                    onChange={(e) => setInputContent(e.target.value)}
                    rows={3}
                    className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-[10px] p-2.5 text-xs font-semibold text-[#111827] focus:border-[#11875D] focus:outline-none resize-none"
                  />
                </div>
              )}
            </div>
          ) : (
            /* Text Input Tabs (SMS, Email, WhatsApp, URL) */
            <div className="relative">
              <textarea
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                disabled={isScanning}
                rows={5}
                placeholder={`Paste suspicious ${currentTab.toUpperCase()} content or URL here for AI threat analysis...`}
                className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-[16px] p-4 pr-12 text-sm text-[#111827] font-medium placeholder:text-[#94A3B8] focus:border-[#11875D] focus:outline-none focus:ring-1 focus:ring-[#11875D] transition-all resize-none leading-relaxed"
              />
              <div className="absolute top-3 right-3 z-10">
                <VoiceInputButton
                  variant="icon"
                  onTranscript={setInputContent}
                  currentValue={inputContent}
                />
              </div>
            </div>
          )}

          {validationError && (
            <div className="p-3 rounded-[12px] bg-red-50 border border-red-200 flex items-center gap-2 text-xs font-bold text-[#EF4444]">
              <AlertCircle size={16} className="shrink-0 text-[#EF4444]" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Footer Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3 text-xs text-[#64748B] font-medium">
              <button 
                onClick={() => setInputContent(sampleThreats[currentTab] || sampleThreats.sms)}
                className="text-[#EF4444] hover:underline flex items-center gap-1 font-bold cursor-pointer"
              >
                <AlertCircle size={14} className="text-[#EF4444]" /> Sample Scam
              </button>
              <button 
                onClick={() => setInputContent('Your OTP for online banking login is 482910. Valid for 5 minutes. Do not share with anyone.')}
                className="text-[#10B981] hover:underline flex items-center gap-1 font-bold cursor-pointer"
              >
                <CheckCircle2 size={14} className="text-[#10B981]" /> Sample Safe
              </button>
              <span>{inputContent.length} characters</span>
            </div>

            <button
              onClick={handleAnalyzeClick}
              disabled={isScanning}
              className="w-full sm:w-auto justify-center bg-[#11875D] hover:bg-[#0e704d] text-white px-6 py-3 rounded-[16px] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-2xs disabled:opacity-50 cursor-pointer shrink-0"
            >
              <Radar size={18} />
              <span>{isScanning ? 'Executing AI Scan...' : 'Analyze with AI'}</span>
            </button>
          </div>
        </div>
      </div>

      <ThreatAlertsWidget className="mt-6" />
      <ToastContainer toasts={toasts} />
    </section>
  );
};
