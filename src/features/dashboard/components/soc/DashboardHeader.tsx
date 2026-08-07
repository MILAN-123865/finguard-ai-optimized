import React from 'react';
import { Shield, Radio, Sparkles, CheckCircle2, UserCheck, Calendar, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../../hooks/useAuth';

interface DashboardHeaderProps {
  showQuickSummary?: boolean;
  onToggleQuickSummary?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  showQuickSummary,
  onToggleQuickSummary,
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const displayName = user?.fullName || (user as any)?.name || 'Milan Rathod';
  const userInitial = displayName.trim().charAt(0).toUpperCase() || 'M';
  const isGoogle = user?.provider === 'google';
  const createdDate = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) 
    : 'Jan 2026';

  return (
    <div className="space-y-6 pb-6 border-b border-[#E5E7EB]">
      {/* Redesigned Government Style Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-[20px] border border-[#E5E7EB] shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
      >
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Small Circular Avatar */}
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-center text-[#11875D] font-bold text-lg overflow-hidden">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <span>{userInitial}</span>
              )}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-white flex items-center justify-center text-[7px] text-white font-bold">
              ✓
            </span>
          </div>

          {/* User Name & Details below username */}
          <div className="flex flex-col min-w-0 space-y-1">
            <div>
              <span className="text-xs font-semibold text-[#64748B] block">Welcome Back,</span>
              <h2 className="text-xl font-bold text-[#111827] truncate leading-tight">
                {displayName}
              </h2>
            </div>

            {/* Displayed neatly below username */}
            <div className="flex items-center gap-2.5 text-xs text-[#64748B] font-medium flex-wrap pt-0.5">
              <span className="flex items-center gap-1 text-[#64748B]">
                <Calendar size={13} className="text-[#11875D]" />
                <span>Member Since: {createdDate}</span>
              </span>
              <span className="text-[#E5E7EB]">•</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#DDF2EA] text-[#11875D] font-bold text-[11px]">
                {isGoogle ? 'Google Verified' : 'Verified Status'}
              </span>
              <span className="text-[#E5E7EB]">•</span>
              <span className="inline-flex items-center gap-1.5 text-[#10B981] font-bold text-xs">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Active Session</span>
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Small Clean Info Chips/Cards */}
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 shrink-0">
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[14px] px-4 py-2.5 flex flex-col min-w-[125px]">
            <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">Security Level</span>
            <span className="text-xs font-bold text-[#11875D] mt-0.5">Level 1 Guardian</span>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[14px] px-4 py-2.5 flex flex-col min-w-[125px]">
            <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">Last Login</span>
            <span className="text-xs font-bold text-[#111827] mt-0.5">Active Now</span>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[14px] px-4 py-2.5 flex flex-col min-w-[125px]">
            <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">Account Status</span>
            <span className="text-xs font-bold text-[#10B981] mt-0.5">Protected & Active</span>
          </div>
        </div>
      </motion.div>

      {/* Main Header Title Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="p-2 bg-[#DDF2EA] border border-[#11875D]/30 rounded-[12px] text-[#11875D]">
              <Shield size={20} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
              {t('dashboard.headerTitle', 'Security Intelligence Center')}
            </h1>
          </div>
          <p className="text-[#64748B] text-xs font-medium max-w-xl">
            {t('dashboard.headerSubtitle', 'Monitor live cyber threats, AI Detections and scam activity in real time.')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onToggleQuickSummary && (
            <button
              onClick={onToggleQuickSummary}
              className={`px-4 py-2 rounded-[12px] border transition-colors text-xs font-bold flex items-center gap-2 cursor-pointer ${
                showQuickSummary
                  ? 'bg-[#11875D] text-white border-[#11875D]'
                  : 'bg-[#DDF2EA] text-[#11875D] border-[#11875D]/30 hover:bg-[#c8eada]'
              }`}
            >
              <Sparkles size={15} />
              <span>{showQuickSummary ? t('dashboard.hideSummary', 'Hide AI Summary') : t('dashboard.quickSummary', 'Quick Summary')}</span>
            </button>
          )}

          <div className="flex items-center gap-2.5 px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-[12px] shadow-xs">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#64748B] font-bold uppercase">System Status</span>
              <span className="text-xs font-bold text-[#11875D] flex items-center gap-1">
                <Radio size={12} /> Live Telemetry
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
