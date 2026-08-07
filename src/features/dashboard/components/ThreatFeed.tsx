import React, { useState } from 'react';
import { ShieldAlert, Zap, Maximize2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { ExpandedThreatFeed } from './ExpandedThreatFeed';

export const ThreatFeed: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const liveThreats = [
    {
      type: 'Malicious URL',
      target: 'chase-account-verify-auth-sec.net',
      risk: 'CRITICAL',
      time: 'Just now',
    },
    {
      type: 'Banking SMS Scam',
      target: '+1 (888) 901-2821',
      risk: 'HIGH',
      time: '1m ago',
    },
    {
      type: 'WhatsApp Family Lure',
      target: '+1 (415) 234-9901',
      risk: 'CRITICAL',
      time: '3m ago',
    },
    {
      type: 'OTP Harvesting Phish',
      target: 'paypal-login-vault-check.io',
      risk: 'HIGH',
      time: '7m ago',
    },
  ];

  return (
    <>
      <div className="bg-white rounded-[20px] p-6 border border-[#E5E7EB] space-y-4 shadow-xs">
        <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]">
          <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
            <Zap size={16} className="text-[#11875D]" />
            <span>Live SOC Threat Feed</span>
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-[#11875D] uppercase bg-[#DDF2EA] px-2 py-0.5 rounded-full border border-[#11875D]/30">
              Stream Active
            </span>
            <button 
              onClick={() => setIsExpanded(true)}
              className="p-1 hover:bg-[#F8FAFC] rounded-md transition-colors text-[#64748B]"
              title="Expand Intelligence Module"
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          {liveThreats.map((threat, i) => (
            <div
              key={i}
              className="p-3 rounded-[12px] bg-[#F8FAFC] border border-[#E5E7EB] hover:bg-white transition-colors flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <ShieldAlert size={15} className="text-[#EF4444] shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[#111827] font-bold truncate">{threat.type}</span>
                  <span className="text-[10px] text-[#64748B] truncate">{threat.target}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 rounded-full bg-red-50 text-[#EF4444] border border-red-200 text-[9px] font-bold">
                  {threat.risk}
                </span>
                <span className="text-[10px] text-[#64748B]">{threat.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && <ExpandedThreatFeed onClose={() => setIsExpanded(false)} />}
      </AnimatePresence>
    </>
  );
};
