import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldAlert,
  History,
  FileText,
  User,
  LogOut,
  Radio,
  X,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';

interface DashboardSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isMobileOpen,
  onCloseMobile,
}) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: t('sidebar.socDashboard', 'Dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { label: t('sidebar.aiScanner', 'AI Scanner'), path: '/scanner', icon: ShieldAlert, badge: 'LIVE' },
    { label: t('sidebar.scanHistory', 'Scan History'), path: '/history', icon: History },
    { label: t('sidebar.communityReports', 'Scam Reports'), path: '/report', icon: FileText },
    { label: t('sidebar.entityProfile', 'Profile'), path: '/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-[#E4E7E5] z-50 flex flex-col justify-between p-5 transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Header Branding */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E4E7E5]">
            <NavLink to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-center text-[#11875D] shrink-0">
                <span className="material-symbols-outlined text-xl">
                  shield_person
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-[#111827] tracking-tight">
                  FinGuard <span className="text-[#11875D]">AI</span>
                </span>
                <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">
                  Security Portal
                </span>
              </div>
            </NavLink>

            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1.5 text-[#64748B] hover:text-[#111827] lg:hidden rounded-lg hover:bg-[#F8FAFC]"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Real-time Status Badge */}
          <div className="p-3 rounded-[16px] bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
              </span>
              <span className="text-xs font-bold text-[#11875D] uppercase tracking-wider">
                Shield Active
              </span>
            </div>
            <Radio size={14} className="text-[#11875D]" />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-[12px] text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#11875D] text-white shadow-2xs'
                        : 'text-[#64748B] hover:text-[#111827] hover:bg-[#F8FAFC]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-50 text-[#EF4444] border border-red-200">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="pt-4 border-t border-[#E4E7E5] space-y-3">
          {user && (
            <div className="p-3 rounded-[12px] bg-[#F8FAFC] border border-[#E4E7E5] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#11875D] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#111827] truncate">
                  {user.fullName || 'User'}
                </span>
                <span className="text-[10px] text-[#64748B] truncate">{user.email}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-[12px] text-xs font-bold text-[#EF4444] bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
