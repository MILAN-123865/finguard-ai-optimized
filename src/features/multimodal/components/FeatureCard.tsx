import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon, ArrowRight } from 'lucide-react';

export interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  buttonText: string;
  color: string;
  delay?: number;
  onClick: (id: string) => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  id, title, description, icon: Icon, features, buttonText, color, delay = 0, onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden group cursor-pointer h-full flex flex-col bg-[#050711]/80 backdrop-blur-md"
      onClick={() => onClick(id)}
    >
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity ${color.replace('text-', 'bg-')}`} />
      
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-white/5 bg-white/5 group-hover:scale-110 transition-transform`}>
        <Icon className={color} size={24} />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-[#94a3b8] mb-6">{description}</p>
      
      <div className="space-y-2 flex-1">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${color.replace('text-', 'bg-')}`} />
            <span className="text-xs text-[#bac9cc] font-mono">{feature}</span>
          </div>
        ))}
      </div>
      
      <button className="mt-8 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold flex items-center justify-center gap-2 group-hover:bg-white/10 transition-colors">
        {buttonText}
        <ArrowRight size={16} className={`${color} group-hover:translate-x-1 transition-transform`} />
      </button>
    </motion.div>
  );
};
