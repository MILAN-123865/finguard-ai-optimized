import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Calendar, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

export const WelcomeCard: React.FC = () => {
  const { user } = useAuth();
  const displayName = user?.fullName || (user as any)?.name || 'Milan Rathod';
  const userInitial = displayName.trim().charAt(0).toUpperCase() || 'M';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[20px] p-6 border border-[#E5E7EB] shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-center text-[#11875D] font-bold text-lg shrink-0 overflow-hidden">
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt={displayName} className="w-full h-full object-cover" />
          ) : (
            <span>{userInitial}</span>
          )}
        </div>

        <div className="flex flex-col min-w-0 space-y-1">
          <div>
            <span className="text-xs font-semibold text-[#64748B] block">Welcome Back,</span>
            <h2 className="text-xl font-bold text-[#111827] truncate">
              {displayName}
            </h2>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-[#64748B] font-medium flex-wrap pt-0.5">
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-[#11875D]" />
              <span>Member Since: Jan 2026</span>
            </span>
            <span className="text-[#E5E7EB]">•</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#DDF2EA] text-[#11875D] font-bold text-[11px]">
              <CheckCircle2 size={12} /> Verified Status
            </span>
            <span className="text-[#E5E7EB]">•</span>
            <span className="inline-flex items-center gap-1.5 text-[#10B981] font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>Active Session</span>
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
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
  );
};
