import React, { useState } from 'react';
import { Search, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const EvidenceHighlights: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const Tooltip = ({ id, text, description, color }: { id: string, text: string, description: string, color: string }) => (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setActiveTooltip(id)}
      onMouseLeave={() => setActiveTooltip(null)}
    >
      <span className={`px-1 rounded font-bold border-b-2 cursor-help transition-colors ${
        color === 'red' ? 'bg-red-500/20 border-red-500 text-red-300 hover:bg-red-500/40' :
        color === 'orange' ? 'bg-orange-500/20 border-orange-500 text-orange-300 hover:bg-orange-500/40' :
        'bg-purple-500/20 border-purple-500 text-purple-300 hover:bg-purple-500/40'
      }`}>
        {text}
      </span>
      <AnimatePresence>
        {activeTooltip === id && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-[#0a0d1c] border border-white/20 rounded-xl shadow-2xl z-50 text-left"
          >
            <div className="flex items-start gap-2 text-xs">
              <Info size={14} className={`shrink-0 mt-0.5 ${color === 'red' ? 'text-red-400' : color === 'orange' ? 'text-orange-400' : 'text-purple-400'}`} />
              <span className="text-white/90">{description}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );

  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 bg-[#0a0d1c]/90">
      <div className="flex items-center gap-3 mb-6">
        <Search className="text-[#00daf3]" size={20} />
        <h3 className="text-xl font-bold text-white">Highlighted Evidence</h3>
      </div>
      
      <div className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 font-mono text-sm leading-8 text-[#94a3b8]">
        <Tooltip id="t1" color="red" text="URGENT:" description="Creates false panic to bypass logical thinking." /> Your <Tooltip id="t2" color="orange" text="Chase Bank" description="Impersonating a trusted financial institution." /> account has been <Tooltip id="t3" color="red" text="suspended" description="Common threat vector used in credential harvesting." /> due to suspicious activity. Please <Tooltip id="t4" color="purple" text="verify your identity" description="Classic call-to-action for phishing." /> immediately to restore access: <Tooltip id="t5" color="orange" text="https://chase-secure-update-alert.com/login" description="Domain is unregistered and uses suspicious hyphens." />
      </div>
    </div>
  );
};
