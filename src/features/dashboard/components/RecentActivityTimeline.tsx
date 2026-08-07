import React from 'react';
import { History, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export const RecentActivityTimeline: React.FC = () => {
  const activities = [
    { type: 'danger', title: 'Malicious Link Blocked', time: '10 mins ago', icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' },
    { type: 'success', title: 'System Scan Completed', time: '2 hours ago', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30' },
    { type: 'warning', title: 'Suspicious Sender Flagged', time: '5 hours ago', icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/30' },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/10 h-full shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <History size={18} className="text-[#00daf3]" />
        <h3 className="font-bold text-white">Recent Activity</h3>
      </div>
      
      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[19px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#00e5ff]/50 before:to-transparent">
        {activities.map((act, i) => {
          const Icon = act.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border ${act.border} ${act.bg} ${act.color} shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10`}>
                <Icon size={16} />
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-sm text-white">{act.title}</h4>
                </div>
                <div className="text-[10px] text-[#bac9cc] font-mono">{act.time}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
