import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex overflow-x-auto gap-2 border-b border-white/10 pb-4 hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all shrink-0 ${
              activeTab === tab.id 
                ? 'bg-[#00daf3] text-[#00363d] shadow-[0_0_15px_rgba(0,229,255,0.3)]' 
                : 'text-[#bac9cc] hover:bg-white/5 hover:text-white'
            }`}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-6">
        <AnimatePresence mode="wait">
          {tabs.map(tab => 
            activeTab === tab.id ? (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {tab.content}
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
