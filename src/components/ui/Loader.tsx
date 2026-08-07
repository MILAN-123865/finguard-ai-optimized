import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Spinner: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "text-[#00daf3]" }) => (
  <Loader2 size={size} className={`animate-spin ${className}`} />
);

export const PageLoader: React.FC<{ text?: string }> = ({ text = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <div className="w-16 h-16 rounded-full border-4 border-[#00daf3]/20 border-t-[#00daf3] animate-spin mb-4" />
    <h3 className="text-xl font-bold text-white">{text}</h3>
  </div>
);

export const CardLoader: React.FC = () => (
  <div className="glass-card p-6 rounded-3xl border border-white/10 animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-white/10" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-white/10 rounded w-1/3" />
        <div className="h-3 bg-white/10 rounded w-1/4" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-white/10 rounded w-full" />
      <div className="h-3 bg-white/10 rounded w-5/6" />
      <div className="h-3 bg-white/10 rounded w-4/6" />
    </div>
  </div>
);

export const TableLoader: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="w-full bg-[#0a0d1c] rounded-2xl border border-white/10 overflow-hidden">
    <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-4 gap-4">
      <div className="h-4 bg-white/10 rounded w-1/4" />
      <div className="h-4 bg-white/10 rounded w-1/4" />
      <div className="h-4 bg-white/10 rounded w-1/4" />
      <div className="h-4 bg-white/10 rounded w-1/4" />
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="h-16 border-b border-white/5 flex items-center px-4 gap-4 animate-pulse">
        <div className="h-4 bg-white/5 rounded w-1/4" />
        <div className="h-4 bg-white/5 rounded w-1/4" />
        <div className="h-4 bg-white/5 rounded w-1/4" />
        <div className="h-4 bg-white/5 rounded w-1/4" />
      </div>
    ))}
  </div>
);
