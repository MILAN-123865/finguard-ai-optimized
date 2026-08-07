import React, { useState } from 'react';
import { Upload, X, ScanSearch, FileType, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UploadWorkspaceProps {
  moduleId: string;
  title: string;
  onAnalyze: (data: string) => void;
  onClose: () => void;
}

export const UploadWorkspace: React.FC<UploadWorkspaceProps> = ({ moduleId, title, onAnalyze, onClose }) => {
  const [inputData, setInputData] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  const getPlaceholder = () => {
    switch(moduleId) {
      case 'sms': return 'Paste SMS message content here...';
      case 'email': return 'Paste email headers or full body...';
      case 'url': return 'https://suspicious-link.com/login';
      default: return 'Paste content here...';
    }
  };

  const isFileBased = ['qr', 'image', 'voice'].includes(moduleId);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card rounded-3xl border border-white/20 p-6 md:p-10 relative bg-[#0a0d1c]/95 backdrop-blur-xl shadow-2xl max-w-4xl mx-auto"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#94a3b8] hover:text-white transition-colors"
      >
        <X size={20} />
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-white mb-2 flex items-center gap-3">
          <ScanSearch className="text-[#00daf3]" size={28} />
          {title} Analysis
        </h2>
        <p className="text-[#94a3b8] text-sm">
          Submit suspicious content to our neural engine for immediate multi-stage verification.
        </p>
      </div>

      <div className="space-y-6">
        {isFileBased ? (
          <div 
            className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${
              isHovering ? 'border-[#00daf3] bg-[#00daf3]/5' : 'border-white/10 bg-white/5 hover:border-white/30'
            }`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => {
              // Mock file upload
              setInputData('mock_file_uploaded.png');
            }}
          >
            <Upload size={48} className={inputData ? "text-green-400 mb-4" : "text-[#94a3b8] mb-4"} />
            <h3 className="text-white font-bold mb-2">
              {inputData ? 'File Selected' : 'Drag & Drop File Here'}
            </h3>
            <p className="text-[#94a3b8] text-sm mb-6">
              {inputData ? inputData : 'or click to browse from your device'}
            </p>
            {!inputData && (
              <span className="px-6 py-2 rounded-xl bg-white/10 text-white font-medium text-sm">
                Browse Files
              </span>
            )}
          </div>
        ) : (
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder={getPlaceholder()}
            className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-sm font-mono placeholder:text-white/20 focus:outline-none focus:border-[#00daf3]/50 focus:ring-1 focus:ring-[#00daf3]/50 transition-all resize-none"
          />
        )}

        <div className="flex justify-between items-center pt-4">
          <div className="flex items-center gap-4 text-xs font-mono text-[#94a3b8]">
            <span className="flex items-center gap-1.5"><FileType size={14} /> End-to-end encrypted</span>
            <span className="flex items-center gap-1.5 text-green-400"><CheckCircle2 size={14} /> Neural Engine Online</span>
          </div>
          
          <button
            onClick={() => onAnalyze(inputData)}
            disabled={!inputData}
            className="px-8 py-3.5 bg-gradient-to-r from-[#00e5ff] to-[#00daf3] text-[#00363d] font-bold text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
          >
            <ScanSearch size={18} />
            Run Security Analysis
          </button>
        </div>
      </div>
    </motion.div>
  );
};
