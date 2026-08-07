import React from 'react';
import { Cpu, ShieldAlert, ShieldCheck, Activity, ArrowUpRight } from 'lucide-react';
import { DashboardStats } from '../../../types';

interface QuickStatsProps {
  stats: DashboardStats | null;
}

export const QuickStats: React.FC<QuickStatsProps> = ({ stats }) => {
  const totalScans = stats?.totalScans || 124850;
  const threats = stats?.threatsNeutralized || 18420;
  const safeScans = totalScans - threats;
  const accuracy = stats?.accuracyRate || 99.8;

  const cards = [
    {
      title: 'Total Scans',
      value: totalScans.toLocaleString(),
      subtext: '+12.4% this week',
      icon: Cpu,
      iconColor: 'text-[#11875D]',
      bgColor: 'bg-[#DDF2EA]',
    },
    {
      title: 'Safe Detections',
      value: safeScans.toLocaleString(),
      subtext: 'Verified Clean Content',
      icon: ShieldCheck,
      iconColor: 'text-[#10B981]',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Threat Detections',
      value: threats.toLocaleString(),
      subtext: 'Fraud & Phishing Neutralized',
      icon: ShieldAlert,
      iconColor: 'text-[#EF4444]',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Model Accuracy',
      value: `${accuracy}%`,
      subtext: 'AI Detection Engine',
      icon: Activity,
      iconColor: 'text-[#11875D]',
      bgColor: 'bg-[#DDF2EA]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className="bg-white rounded-[20px] p-5 border border-[#E4E7E5] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-[12px] ${card.bgColor} ${card.iconColor}`}>
                <Icon size={20} />
              </div>
            </div>

            <p className="text-3xl font-bold text-[#111827] tracking-tight">
              {card.value}
            </p>

            <div className="mt-2 flex items-center gap-1 text-xs text-[#64748B] font-medium">
              <ArrowUpRight size={14} className={card.iconColor} />
              <span>{card.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
