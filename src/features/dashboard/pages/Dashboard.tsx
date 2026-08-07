import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';

import { DashboardHeader } from '../components/soc/DashboardHeader';
import { StatsCards } from '../components/soc/StatsCards';
import { ReportsTable } from '../components/soc/ReportsTable';
import { QuickActions } from '../components/soc/QuickActions';
import { QuickSummaryBanner } from '../components/QuickSummaryBanner';
import { SafeVsThreatChart } from '../components/SafeVsThreatChart';

export const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showQuickSummary, setShowQuickSummary] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
          <div className="w-14 h-14 rounded-full border-2 border-[#00daf3] border-t-transparent animate-spin shadow-[0_0_20px_#00e5ff]" />
          <p className="text-xs text-[#00daf3] tracking-widest uppercase animate-pulse">
            Loading Security Intelligence Center...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in duration-700 relative">
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#00daf3]/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
        </div>

        {/* 1. Welcome Banner Header */}
        <DashboardHeader 
          showQuickSummary={showQuickSummary} 
          onToggleQuickSummary={() => setShowQuickSummary(prev => !prev)} 
        />

        {/* 2. AI Threat Intelligence Briefing */}
        <QuickSummaryBanner 
          isOpen={showQuickSummary} 
          onToggle={() => setShowQuickSummary(prev => !prev)} 
        />

        {/* 3. Threat Statistics Cards */}
        <StatsCards />

        {/* 4. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Historical Scan Chart & Recent Threat Reports (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <SafeVsThreatChart />
            <ReportsTable />
          </div>

          {/* Quick Actions Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <QuickActions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
