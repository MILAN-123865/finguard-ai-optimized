import React from 'react';
import { Shield, Zap, Settings, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export const DashboardQuickActions: React.FC = () => {
  const actions = [
    { label: 'Run Full Scan', icon: Shield, color: 'text-[#00daf3]', bg: 'bg-[#00daf3]/10', border: 'border-[#00daf3]/30' },
    { label: 'Enable Auto-Protect', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30' },
    { label: 'Lock Down API', icon: Lock, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
    { label: 'System Settings', icon: Settings, color: 'text-[#bac9cc]', bg: 'bg-white/5', border: 'border-white/10' },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/10 h-full shadow-lg">
      <h3 className="font-bold text-white mb-4">Quick Shortcuts</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((act, i) => {
          const Icon = act.icon;
          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border ${act.border} ${act.bg} hover:bg-white/10 transition-colors group`}
            >
              <Icon size={24} className={`${act.color} group-hover:scale-110 transition-transform`} />
              <span className="text-[11px] font-bold text-white font-mono text-center">{act.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
