import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, AlertTriangle, Info, Clock, Activity, Target } from 'lucide-react';

export interface ThreatDetail {
  id: string;
  name: string;
  type: string;
  target: string;
  risk: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  time: string;
  description: string;
  targetAudience: string;
  method: string;
  preventionTips: string[];
  relatedThreats: string[];
  timeline: { status: 'New Threat' | 'Updated Threat' | 'Resolved Threat'; date: string }[];
  category: string;
  region: string;
  status: 'Active' | 'Resolved';
}

interface ThreatDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  threat: ThreatDetail | null;
}

export const ThreatDetailsDrawer: React.FC<ThreatDetailsDrawerProps> = ({ isOpen, onClose, threat }) => {
  if (!threat) return null;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'CRITICAL': return 'text-red-400 bg-red-500/20 border-red-500/40';
      case 'HIGH': return 'text-orange-400 bg-orange-500/20 border-orange-500/40';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/40';
      default: return 'text-[#00daf3] bg-[#00daf3]/20 border-[#00daf3]/40';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0d1a] border-l border-white/10 shadow-2xl z-[70] overflow-y-auto"
          >
            <div className="p-6 space-y-8">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold font-mono ${getRiskColor(threat.risk)}`}>
                      {threat.risk} RISK
                    </span>
                    <span className="text-[10px] text-[#bac9cc] font-mono">{threat.category}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">{threat.name}</h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white">
                  <X size={20} />
                </button>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Info size={16} className="text-[#00daf3]" /> Description
                </h4>
                <p className="text-sm text-[#bac9cc] leading-relaxed">{threat.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] text-[#bac9cc] mb-1 font-mono uppercase">Target Audience</div>
                  <div className="text-sm text-white font-medium flex items-center gap-2">
                    <Target size={14} className="text-purple-400" />
                    {threat.targetAudience}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] text-[#bac9cc] mb-1 font-mono uppercase">Scam Method</div>
                  <div className="text-sm text-white font-medium flex items-center gap-2">
                    <Activity size={14} className="text-orange-400" />
                    {threat.method}
                  </div>
                </div>
              </div>

              {/* Prevention Tips */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldAlert size={16} className="text-green-400" /> Prevention Tips
                </h4>
                <ul className="space-y-2">
                  {threat.preventionTips.map((tip, i) => (
                    <li key={i} className="text-sm text-[#bac9cc] flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock size={16} className="text-blue-400" /> Threat Timeline
                </h4>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
                  {threat.timeline.map((event, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-4 h-4 rounded-full border border-white/30 bg-[#0a0d1a] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                         <div className={`w-2 h-2 rounded-full ${event.status === 'Resolved Threat' ? 'bg-green-400' : event.status === 'Updated Threat' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                      </div>
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg bg-white/5 border border-white/10 relative">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-white text-xs">{event.status}</span>
                          <span className="text-[10px] text-[#bac9cc] font-mono">{event.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Threats */}
              <div className="space-y-3 pb-8">
                 <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <AlertTriangle size={16} className="text-yellow-400" /> Related Threats
                </h4>
                <div className="flex flex-wrap gap-2">
                  {threat.relatedThreats.map((rt, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#bac9cc]">
                      {rt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
