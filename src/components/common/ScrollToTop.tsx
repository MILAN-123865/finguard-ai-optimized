import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
  className?: string;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 15 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className={
            className ||
            "fixed bottom-24 right-6 sm:bottom-28 sm:right-8 z-40 w-12 h-12 rounded-full bg-[#0a0d1a]/85 hover:bg-[#00daf3]/20 border border-[#00daf3]/40 text-[#00daf3] shadow-[0_0_15px_rgba(0,218,243,0.35)] backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer group"
          }
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
