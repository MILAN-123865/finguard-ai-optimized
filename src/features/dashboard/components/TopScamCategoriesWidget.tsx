import React from 'react';
import { AlertOctagon } from 'lucide-react';
import { motion } from 'motion/react';

export const TopScamCategoriesWidget: React.FC = () => {
  const categories = [
    { name: 'Phishing Links', count: 342, color: 'bg-red-500' },
    { name: 'Fake Job Offers', count: 156, color: 'bg-orange-500' },
    { name: 'Lottery Scams', count: 89, color: 'bg-yellow-500' },
    { name: 'Investment Fraud', count: 64, color: 'bg-purple-500' },
  ];

  const total = categories.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/10 h-full shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-white flex items-center gap-2">
          <AlertOctagon size={18} className="text-red-400" />
          Top Scam Categories
        </h3>
      </div>
      
      <div className="space-y-4">
        {categories.map((cat, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-white">{cat.name}</span>
              <span className="text-[#bac9cc]">{cat.count}</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(cat.count / total) * 100}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className={`h-full ${cat.color} rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
