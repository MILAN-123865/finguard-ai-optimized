import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  shortcut?: string;
  children: React.ReactElement;
  className?: string;
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  delay = 150,
  shortcut,
  children,
  className = '',
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!content || disabled) {
    return children;
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const positionClasses: Record<TooltipPosition, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const animationVariants = {
    top: { initial: { opacity: 0, y: 5, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 5, scale: 0.95 } },
    bottom: { initial: { opacity: 0, y: -5, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -5, scale: 0.95 } },
    left: { initial: { opacity: 0, x: 5, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: 5, scale: 0.95 } },
    right: { initial: { opacity: 0, x: -5, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -5, scale: 0.95 } },
  };

  const arrowClasses: Record<TooltipPosition, string> = {
    top: 'top-full left-1/2 -translate-x-1/2 -mt-1 border-t-slate-900/90 border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-b-slate-900/90 border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 -ml-1 border-l-slate-900/90 border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 -mr-1 border-r-slate-900/90 border-y-transparent border-l-transparent',
  };

  return (
    <div
      className="relative inline-flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            role="tooltip"
            initial={animationVariants[position].initial}
            animate={animationVariants[position].animate}
            exit={animationVariants[position].exit}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute z-50 pointer-events-none whitespace-nowrap ${positionClasses[position]} ${className}`}
          >
            <div className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/95 border border-[#00daf3]/30 text-white text-[11px] font-mono shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <span className="font-sans font-medium text-slate-100">{content}</span>
              {shortcut && (
                <span className="ml-1 px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-[#00daf3] font-mono border border-white/10 font-bold">
                  {shortcut}
                </span>
              )}
              <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
