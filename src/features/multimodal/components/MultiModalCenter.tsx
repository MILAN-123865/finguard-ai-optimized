import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquareText, Mail, Link, QrCode, Image as ImageIcon, Mic, ArrowLeft } from 'lucide-react';

import { FeatureCard } from './FeatureCard';
import { UploadWorkspace } from './UploadWorkspace';
import { AnalysisPipeline } from './AnalysisPipeline';
import { ThreatSummary } from './ThreatSummary';
import { EvidencePanel } from './EvidencePanel';
import { RecommendationCard } from './RecommendationCard';
import { RecentAnalysis } from './RecentAnalysis';
import { CapabilityGrid } from './CapabilityGrid';

const modules = [
  {
    id: 'sms',
    title: 'SMS Scam Detection',
    description: 'Paste suspicious SMS messages to detect urgency, coercion, and smishing links.',
    icon: MessageSquareText,
    features: ['Threat detection', 'Risk score', 'Keyword highlighting', 'Recommendations'],
    buttonText: 'Analyze SMS',
    color: 'text-blue-400'
  },
  {
    id: 'email',
    title: 'Email Phishing Detection',
    description: 'Upload .eml or paste headers to verify sender authenticity and detect fake domains.',
    icon: Mail,
    features: ['Header verification', 'Fake domain detection', 'SPF/DKIM check', 'DMARC status'],
    buttonText: 'Analyze Email',
    color: 'text-purple-400'
  },
  {
    id: 'url',
    title: 'Website URL Scanner',
    description: 'Input any link to safely sandbox and verify the destination before clicking.',
    icon: Link,
    features: ['Domain reputation', 'SSL Certificate', 'Redirect detection', 'Blacklist check'],
    buttonText: 'Analyze URL',
    color: 'text-[#00daf3]'
  },
  {
    id: 'qr',
    title: 'QR Code Scanner',
    description: 'Upload a QR code to decode its destination and check for malicious redirects known as Quishing.',
    icon: QrCode,
    features: ['Decode automatically', 'Display destination', 'Check redirects', 'Confidence score'],
    buttonText: 'Analyze QR',
    color: 'text-pink-400'
  },
  {
    id: 'image',
    title: 'Image Scam Detector',
    description: 'Upload screenshots of fake payments, lotteries, or social media scams for OCR extraction.',
    icon: ImageIcon,
    features: ['OCR extraction', 'Detect fake payments', 'Lottery scams', 'Highlight suspicious text'],
    buttonText: 'Analyze Image',
    color: 'text-orange-400'
  },
  {
    id: 'voice',
    title: 'Voice Scam Detector',
    description: 'Upload audio to detect deepfakes, emotional pressure, and vishing intent.',
    icon: Mic,
    features: ['Speech-to-text', 'Intent detection', 'Emotional pressure', 'Risk scoring'],
    buttonText: 'Analyze Voice',
    color: 'text-green-400'
  }
];

export const MultiModalCenter: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [analysisState, setAnalysisState] = useState<'idle' | 'analyzing' | 'complete'>('idle');

  const activeModule = modules.find(m => m.id === activeModuleId);

  const handleStartAnalysis = (data: string) => {
    console.log("Analyzing:", data);
    setAnalysisState('analyzing');
  };

  const handleReset = () => {
    setActiveModuleId(null);
    setAnalysisState('idle');
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 relative min-h-screen">
      
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[#050711]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00daf3]/10 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        
        {/* VIEW 1: Main Grid Selection */}
        {!activeModuleId && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-16 space-y-4">
              <span className="text-[#00daf3] font-mono text-sm tracking-widest uppercase font-bold bg-[#00daf3]/10 px-4 py-1.5 rounded-full border border-[#00daf3]/20">
                Multi-Modal AI Security Center
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Analyze every type of digital scam <br className="hidden md:block"/>
                using one unified AI platform.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, idx) => (
                <FeatureCard 
                  key={module.id} 
                  {...module} 
                  delay={idx * 0.1}
                  onClick={setActiveModuleId}
                />
              ))}
            </div>

            <CapabilityGrid />
          </motion.div>
        )}

        {/* VIEW 2 & 3: Workspace & Results */}
        {activeModuleId && activeModule && (
          <motion.div
            key="workspace"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 text-[#94a3b8] hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold">Back to Multi-Modal Center</span>
            </button>

            {analysisState === 'idle' && (
              <UploadWorkspace 
                moduleId={activeModule.id} 
                title={activeModule.title}
                onAnalyze={handleStartAnalysis}
                onClose={handleReset}
              />
            )}

            {analysisState === 'analyzing' && (
              <AnalysisPipeline onComplete={() => setAnalysisState('complete')} />
            )}

            {analysisState === 'complete' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                <div className="lg:col-span-8 space-y-6">
                  <ThreatSummary score={94} level="CRITICAL" confidence={99} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <EvidencePanel 
                      findings={[
                        'Detected urgency marker: "IMMEDIATE ACTION REQUIRED"',
                        'URL domain registered < 24 hours ago',
                        'Sender domain fails SPF/DKIM verification',
                        'Known phishing layout matched with 98% accuracy'
                      ]} 
                    />
                    <RecommendationCard 
                      action="AUTO-BLOCK & REPORT"
                      description="This is a confirmed high-risk threat vector. Do not click any links or reply to the sender. FinGuard recommends immediately blocking the sender and deleting the message."
                    />
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <RecentAnalysis />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
