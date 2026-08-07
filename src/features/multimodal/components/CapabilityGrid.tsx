import React from 'react';
import { ScanText, Brain, MessageSquare, Mic, Eye, ShieldAlert, Fingerprint, Network } from 'lucide-react';
import { motion } from 'motion/react';

const capabilities = [
  { name: 'OCR', icon: <ScanText size={20} />, delay: 0.1 },
  { name: 'Natural Language Processing', icon: <MessageSquare size={20} />, delay: 0.2 },
  { name: 'Large Language Models', icon: <Brain size={20} />, delay: 0.3 },
  { name: 'Speech Recognition', icon: <Mic size={20} />, delay: 0.4 },
  { name: 'Computer Vision', icon: <Eye size={20} />, delay: 0.5 },
  { name: 'Threat Intelligence', icon: <ShieldAlert size={20} />, delay: 0.6 },
  { name: 'Pattern Recognition', icon: <Fingerprint size={20} />, delay: 0.7 },
  { name: 'Explainable AI', icon: <Network size={20} />, delay: 0.8 },
];

export const CapabilityGrid: React.FC = () => {
  return (
    <div className="w-full mt-24 mb-12">
      <div className="text-center mb-10">
        <h3 className="text-xl font-bold text-white mb-2">Powered by Advanced AI</h3>
        <p className="text-[#94a3b8] text-sm">FinGuard integrates multiple specialized models into one seamless pipeline.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {capabilities.map((cap, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: cap.delay, duration: 0.5 }}
            className="glass-card rounded-2xl p-4 border border-white/5 bg-white/5 flex flex-col items-center justify-center text-center gap-3 hover:bg-white/10 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-[#00daf3]/10 border border-[#00daf3]/30 text-[#00daf3] flex items-center justify-center group-hover:scale-110 transition-transform">
              {cap.icon}
            </div>
            <span className="text-xs font-bold text-white font-mono">{cap.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
