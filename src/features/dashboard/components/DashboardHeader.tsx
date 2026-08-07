import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, Calendar, Menu, Settings, LogOut, ShieldCheck, ChevronDown } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

interface DashboardHeaderProps {
  onToggleMobileMenu?: () => void;
  onToggleNotifications?: () => void;
  unreadCount?: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onToggleMobileMenu,
  onToggleNotifications,
  unreadCount = 2,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      setCurrentDateTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    logout();
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <header className="bg-white rounded-[20px] p-4 sm:p-5 border border-[#E4E7E5] flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shadow-xs relative">
      {/* Welcome & Time Info */}
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E4E7E5] text-[#111827] lg:hidden cursor-pointer"
          >
            <Menu size={20} />
          </button>
        )}

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
              Welcome Back, <span className="text-[#11875D]">{user?.fullName || (user as any)?.name || 'Security Analyst'}</span>
            </h1>
            <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 text-[#11875D] font-bold text-[10px] uppercase">
              Official Dashboard
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#64748B] mt-1 font-medium">
            <Calendar size={13} className="text-[#11875D]" />
            <span>{currentDateTime || 'Security Telemetry Sync'}</span>
          </div>
        </div>
      </div>

      {/* Right Controls: Search, Notifications, Avatar */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden sm:block w-56 md:w-64">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search threats, URLs..."
            className="w-full bg-[#F8FAFC] border border-[#E4E7E5] focus:border-[#11875D] rounded-[12px] pl-9 pr-3 py-2 text-xs font-medium text-[#111827] placeholder-[#64748B] focus:outline-none transition-all"
          />
        </div>

        {/* Notifications Button */}
        <button
          onClick={onToggleNotifications}
          className="relative p-2.5 rounded-[12px] bg-[#F8FAFC] border border-[#E4E7E5] hover:border-[#11875D] text-[#64748B] hover:text-[#11875D] transition-all cursor-pointer"
          title="Notifications"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] text-white font-bold text-[10px] flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile Dropdown */}
        <div ref={profileMenuRef} className="relative flex items-center">
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            className="group flex items-center gap-2 p-1 rounded-[12px] hover:bg-[#F8FAFC] transition-all cursor-pointer"
            aria-expanded={isProfileMenuOpen}
          >
            <div className="w-8 h-8 rounded-full bg-[#11875D] text-white font-bold text-xs flex items-center justify-center shrink-0">
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            <ChevronDown size={14} className={`text-[#64748B] transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180 text-[#11875D]' : ''}`} />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-[#E4E7E5] rounded-[20px] shadow-lg p-2 z-50 text-[#111827]">
              <div className="p-3 bg-[#F8FAFC] rounded-[12px] border border-[#E4E7E5] mb-2">
                <p className="text-xs font-bold text-[#111827] truncate">
                  {user?.fullName || (user as any)?.name || 'User'}
                </p>
                <p className="text-[11px] text-[#64748B] truncate">
                  {user?.email || 'user@finguard.com'}
                </p>
              </div>

              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    navigate('/profile');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[12px] text-xs font-medium text-[#111827] hover:bg-[#F8FAFC] hover:text-[#11875D] transition-colors text-left cursor-pointer"
                >
                  <Settings size={15} className="text-[#11875D]" />
                  <span>Account Settings</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[12px] text-xs font-bold text-[#EF4444] hover:bg-red-50 transition-colors text-left cursor-pointer"
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
