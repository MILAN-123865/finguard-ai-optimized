import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Bot } from 'lucide-react';
import { AIAssistantWidget } from './AIAssistantWidget';

export const FloatingActionGroup: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Floating Action Button Group (Vertical Stack) */}
      <div 
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 flex flex-col items-center gap-2.5 sm:gap-4 pointer-events-none pb-[env(safe-area-inset-bottom)] select-none"
        aria-label="Floating Action Controls"
      >
        {/* Top Button: Scroll To Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              key="scroll-to-top-btn"
              initial={{ opacity: 0, scale: 0.5, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 15 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0a0d1a]/85 hover:bg-[#00daf3]/20 border border-[#00daf3]/40 text-[#00daf3] shadow-[0_0_15px_rgba(0,218,243,0.35)] hover:shadow-[0_0_22px_rgba(0,218,243,0.55)] backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer group"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Bottom Button: AI Assistant Trigger */}
        <AnimatePresence>
          {!isAIOpen && (
            <motion.button
              key="ai-assistant-btn"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsAIOpen(true)}
              className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#00e5ff] to-[#6001d1] shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_28px_rgba(0,229,255,0.65)] flex items-center justify-center text-white group border border-white/20 cursor-pointer transition-all duration-200 relative"
              aria-label="Open AI Assistant"
            >
              <Bot size={24} className="sm:text-[28px] group-hover:animate-pulse" />
              <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-red-500 rounded-full border-2 border-[#0f1321]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* AI Assistant Chat Modal */}
      <AIAssistantWidget
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        showTriggerButton={false}
      />
    </>
  );
};
