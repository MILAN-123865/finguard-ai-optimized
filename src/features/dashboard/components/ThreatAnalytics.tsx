import React, { useState } from 'react';
import { WeeklyActivityChart } from './WeeklyActivityChart';
import { RiskDistributionChart } from './RiskDistributionChart';
import { ThreatAnalyticsData } from '../services/dashboardService';
import { Activity, PieChart as PieIcon, LineChart as LineIcon, ShieldAlert } from 'lucide-react';

interface ThreatAnalyticsProps {
  analytics: ThreatAnalyticsData | null;
}

export const ThreatAnalytics: React.FC<ThreatAnalyticsProps> = ({ analytics }) => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'distribution'>('weekly');

  return (
    <div className="glass-card rounded-3xl p-6 border border-[#00e5ff]/25 space-y-6 shadow-2xl">
      {/* Header Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity size={18} className="text-[#00daf3]" />
            <span>AI Threat Analytics Engine</span>
          </h3>
          <p className="text-xs font-mono text-[#bac9cc] mt-0.5">
            Real-time neural telemetry and risk spectrum distribution
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-[#0a0d1a] p-1.5 rounded-2xl border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'weekly'
                ? 'bg-gradient-to-r from-[#00e5ff] to-[#00daf3] text-[#00363d] shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                : 'text-[#bac9cc] hover:text-white'
            }`}
          >
            <LineIcon size={14} />
            <span>Weekly Volume</span>
          </button>

          <button
            onClick={() => setActiveTab('distribution')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'distribution'
                ? 'bg-gradient-to-r from-[#00e5ff] to-[#00daf3] text-[#00363d] shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                : 'text-[#bac9cc] hover:text-white'
            }`}
          >
            <PieIcon size={14} />
            <span>Risk Breakdown</span>
          </button>
        </div>
      </div>

      {/* Main Chart Render */}
      <div>
        {activeTab === 'weekly' ? (
          <WeeklyActivityChart data={analytics?.weeklyActivity} />
        ) : (
          <RiskDistributionChart distribution={analytics?.riskDistribution} />
        )}
      </div>

      {/* Threat Category Bar Breakdown */}
      {analytics?.threatCategories && (
        <div className="pt-4 border-t border-white/10 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#00daf3] font-bold">
            Primary Threat Vector Classifications
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
            {analytics.threatCategories.map((cat, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[#bac9cc] truncate block">{cat.category}</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-white font-bold">{cat.count.toLocaleString()}</span>
                  <span className="text-[#00daf3] font-bold text-[11px]">{cat.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
