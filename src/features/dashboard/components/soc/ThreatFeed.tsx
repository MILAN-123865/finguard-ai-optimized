import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity } from 'lucide-react';

interface FeedItem {
  id: string;
  time: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium';
}

const mockThreats = [
  { title: 'SMS Scam Blocked', severity: 'Critical' as const },
  { title: 'Fake Banking URL', severity: 'High' as const },
  { title: 'QR Phishing Attempt', severity: 'Medium' as const },
  { title: 'Voice Scam Detected', severity: 'Critical' as const },
  { title: 'Suspicious Email Attachment', severity: 'High' as const },
  { title: 'Malicious IP Blocked', severity: 'Medium' as const },
];

export const ThreatFeed: React.FC = () => {
  const [feed, setFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    const initialFeed = Array.from({ length: 4 }).map((_, i) => ({
      id: Math.random().toString(36),
      time: new Date(Date.now() - i * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...mockThreats[i % mockThreats.length]
    }));
    setFeed(initialFeed);

    const interval = setInterval(() => {
      const newItem = {
        id: Math.random().toString(36),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...mockThreats[Math.floor(Math.random() * mockThreats.length)]
      };
      
      setFeed(prev => [newItem, ...prev].slice(0, 6));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-[20px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-[#11875D]" />
          <h3 className="font-bold text-[#111827] text-sm">Live Threat Feed</h3>
        </div>
        <span className="text-[10px] font-bold bg-[#DDF2EA] text-[#11875D] px-2.5 py-0.5 rounded-full border border-[#11875D]/30">
          REAL-TIME
        </span>
      </div>

      <div className="flex-1 overflow-hidden relative space-y-2.5">
        <AnimatePresence initial={false}>
          {feed.map((item) => {
            const colorClass = 
              item.severity === 'Critical' ? 'text-[#EF4444] bg-red-50 border-red-200' :
              item.severity === 'High' ? 'text-[#F59E0B] bg-amber-50 border-amber-200' :
              'text-[#11875D] bg-[#DDF2EA] border-[#11875D]/30';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between p-3 rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] hover:bg-white transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-[#111827] text-xs font-bold">{item.title}</span>
                  <span className="text-[#64748B] text-[10px] mt-0.5 font-medium">{item.time}</span>
                </div>
                <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colorClass}`}>
                  {item.severity}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
