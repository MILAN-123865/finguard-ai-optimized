import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'motion/react';

// --- Page & Route Transitions ---
export const PageTransition: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- Basic Entrances ---
export const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; duration?: number; className?: string }> = ({ children, delay = 0, duration = 0.4, className = '' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideIn: React.FC<{ children: React.ReactNode; direction?: 'up' | 'down' | 'left' | 'right'; delay?: number; className?: string }> = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 }
  };
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay, type: 'spring', stiffness: 200, damping: 20 }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- Interactions ---
export const HoverLift: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    whileTap={{ y: 0, scale: 0.98, transition: { duration: 0.1 } }}
    className={className}
  >
    {children}
  </motion.div>
);

export const CardLift: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div
    whileHover={{ 
      y: -6, 
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
      borderColor: 'rgba(255,255,255,0.2)'
    }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className={className}
  >
    {children}
  </motion.div>
);

export const ButtonRipple: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string }> = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </motion.button>
  );
};

// --- Data Visualization & Counters ---
export const ProgressFill: React.FC<{ progress: number; className?: string; barClassName?: string }> = ({ progress, className = '', barClassName = 'bg-[#00daf3]' }) => (
  <div className={`w-full bg-white/10 rounded-full overflow-hidden ${className}`}>
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      className={`h-full ${barClassName}`}
    />
  </div>
);

export const AnimatedNumber: React.FC<{ value: number; duration?: number; prefix?: string; suffix?: string; className?: string }> = ({ value, duration = 2, prefix = '', suffix = '', className = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing out quint
        const easeOutQuint = 1 - Math.pow(1 - progress, 5);
        
        setDisplayValue(Math.floor(easeOutQuint * value));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [value, duration, isInView]);

  return <span ref={ref} className={className}>{prefix}{displayValue}{suffix}</span>;
};

// --- Micro-Interactions ---
export const SuccessCheckmark: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = 'text-green-500' }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    initial="hidden"
    animate="visible"
  >
    <motion.path
      d="M20 6L9 17l-5-5"
      variants={{
        hidden: { pathLength: 0, opacity: 0 },
        visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
      }}
    />
  </motion.svg>
);

export const ConfettiBurst: React.FC<{ trigger: boolean }> = ({ trigger }) => {
  if (!trigger) return null;
  
  // A simple simulated confetti burst using Framer Motion
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => {
        const colors = ['#00daf3', '#6001d1', '#ffffff', '#ffeb3b', '#ff5722'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomAngle = Math.random() * Math.PI * 2;
        const randomRadius = 100 + Math.random() * 300;
        const x = Math.cos(randomAngle) * randomRadius;
        const y = Math.sin(randomAngle) * randomRadius;
        const rotation = Math.random() * 360;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: 0, 
              scale: Math.random() * 0.5 + 0.5, 
              x, 
              y,
              rotate: rotation + 180
            }}
            transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
            style={{ backgroundColor: randomColor }}
            className="absolute w-3 h-3 rounded-sm"
          />
        );
      })}
    </div>
  );
};
