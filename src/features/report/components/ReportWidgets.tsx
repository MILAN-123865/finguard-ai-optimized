import React from 'react';
import { Calendar, AlertOctagon, TrendingUp, Search, Filter, X } from 'lucide-react';
import { motion } from 'motion/react';
import { ReportItem } from '../../../types';
import { Select } from '../../../components/ui/Select';

interface WeeklyReportCardProps {
  reportsCount?: number;
}

export const WeeklyReportCard: React.FC<WeeklyReportCardProps> = ({ reportsCount = 0 }) => {
  const displayCount = 248 + reportsCount;
  return (
    <div className="glass-card rounded-3xl p-6 border border-[#6001d1]/30 bg-gradient-to-br from-[#6001d1]/10 to-transparent h-full shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={18} className="text-[#d2bbff]" />
        <h3 className="font-bold text-white">This Week</h3>
      </div>
      <div className="text-3xl font-extrabold font-mono text-white mb-2">
        {displayCount.toLocaleString()}
      </div>
      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold font-mono">
        <TrendingUp size={14} />
        <span>+12.4% vs last week</span>
      </div>
    </div>
  );
};

interface MonthlyReportCardProps {
  reportsCount?: number;
}

export const MonthlyReportCard: React.FC<MonthlyReportCardProps> = ({ reportsCount = 0 }) => {
  const displayCount = 1092 + reportsCount;
  return (
    <div className="glass-card rounded-3xl p-6 border border-[#00daf3]/30 bg-gradient-to-br from-[#00daf3]/10 to-transparent h-full shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={18} className="text-[#00daf3]" />
        <h3 className="font-bold text-white">This Month</h3>
      </div>
      <div className="text-3xl font-extrabold font-mono text-white mb-2">
        {displayCount.toLocaleString()}
      </div>
      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold font-mono">
        <TrendingUp size={14} />
        <span>+4.8% vs last month</span>
      </div>
    </div>
  );
};

interface ReportTopCategoriesProps {
  reports?: ReportItem[];
}

export const ReportTopCategories: React.FC<ReportTopCategoriesProps> = ({ reports = [] }) => {
  // Aggregate categories dynamically
  const counts: Record<string, number> = {
    'Phishing Links & URLs': 342,
    'SMS Fraud': 210,
    'Email Phishing': 185,
    'WhatsApp & Social': 156,
    'Voice Vishing': 89,
  };

  reports.forEach((r) => {
    if (r.category === 'url') counts['Phishing Links & URLs'] += 1;
    else if (r.category === 'sms') counts['SMS Fraud'] += 1;
    else if (r.category === 'email') counts['Email Phishing'] += 1;
    else if (r.category === 'whatsapp') counts['WhatsApp & Social'] += 1;
    else if (r.category === 'voice') counts['Voice Vishing'] += 1;
  });

  const categories = [
    { name: 'Phishing Links & URLs', count: counts['Phishing Links & URLs'], color: 'bg-red-500' },
    { name: 'SMS Fraud', count: counts['SMS Fraud'], color: 'bg-[#00daf3]' },
    { name: 'Email Phishing', count: counts['Email Phishing'], color: 'bg-[#ffd166]' },
    { name: 'WhatsApp & Social', count: counts['WhatsApp & Social'], color: 'bg-[#00e5ff]' },
    { name: 'Voice Vishing', count: counts['Voice Vishing'], color: 'bg-purple-500' },
  ].sort((a, b) => b.count - a.count).slice(0, 3);

  const total = categories.reduce((acc, curr) => acc + curr.count, 0) || 1;

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/10 h-full shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-white flex items-center gap-2">
          <AlertOctagon size={18} className="text-red-400" />
          Top Reported Scams
        </h3>
      </div>
      
      <div className="space-y-4">
        {categories.map((cat, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-white">{cat.name}</span>
              <span className="text-[#bac9cc]">{cat.count.toLocaleString()}</span>
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

interface ReportFilterSearchProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedStatus: string;
  setSelectedStatus: (s: string) => void;
  selectedVector: string;
  setSelectedVector: (v: string) => void;
  onResetFilters?: () => void;
}

export const ReportFilterSearch: React.FC<ReportFilterSearchProps> = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedVector,
  setSelectedVector,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-[#0a0d1c]/80 p-4 rounded-2xl border border-white/10 mb-6">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3.5 top-3 text-[#bac9cc] w-4 h-4" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search reports by title, description, or domain..."
          className="w-full bg-[#0f1321] border border-white/10 rounded-xl py-2 pl-10 pr-9 text-xs text-white placeholder-white/30 focus:border-[#00daf3] focus:outline-none transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-2.5 text-[#bac9cc] hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto">
        <div className="flex items-center gap-1.5 text-xs text-[#bac9cc] font-mono shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter:</span>
        </div>

        {/* Status Dropdown */}
        <Select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          options={[
            { value: 'ALL', label: 'All Statuses' },
            { value: 'VERIFIED', label: 'VERIFIED' },
            { value: 'PENDING', label: 'PENDING' },
            { value: 'UNDER INVESTIGATION', label: 'UNDER INVESTIGATION' },
            { value: 'RESOLVED', label: 'RESOLVED' }
          ]}
          size="sm"
        />
        
        {/* Vector Dropdown */}
        <Select
          value={selectedVector}
          onChange={(e) => setSelectedVector(e.target.value)}
          options={[
            { value: 'ALL', label: 'All Vectors' },
            { value: 'SMS', label: 'SMS' },
            { value: 'EMAIL', label: 'EMAIL' },
            { value: 'WHATSAPP', label: 'WHATSAPP' },
            { value: 'URL', label: 'URL' },
            { value: 'VOICE', label: 'VOICE' }
          ]}
          size="sm"
        />
      </div>
    </div>
  );
};

