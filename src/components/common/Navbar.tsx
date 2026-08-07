import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Menu, X, User, LogOut, LayoutDashboard, History, ShieldCheck, Settings, Presentation } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Tooltip } from './Tooltip';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName = user?.fullName || (user as any)?.name || user?.email?.split('@')[0] || 'User';
  const userInitial = displayName.trim().charAt(0).toUpperCase() || 'U';

  useEffect(() => {
    setAvatarError(false);
  }, [user?.avatarUrl]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      setUserDropdownOpen(false);
      setMobileMenuOpen(false);
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      navigate('/');
    }
  };

  const navItemClass = (isActive: boolean) =>
    isActive
      ? 'bg-[#11875D] text-white font-bold px-3.5 py-1.5 rounded-[16px] transition-all text-xs xl:text-sm flex items-center gap-1.5 whitespace-nowrap shadow-2xs'
      : 'text-[#64748B] hover:text-[#111827] hover:bg-[#F8FAFC] font-medium px-3.5 py-1.5 rounded-[16px] transition-all text-xs xl:text-sm flex items-center gap-1.5 whitespace-nowrap';

  const sosClass = (isActive: boolean) =>
    isActive
      ? 'bg-[#EF4444] text-white font-bold px-3.5 py-1.5 rounded-[16px] transition-all text-xs xl:text-sm flex items-center gap-1.5 whitespace-nowrap shadow-2xs'
      : 'text-[#EF4444] hover:bg-red-50 font-semibold px-3.5 py-1.5 rounded-[16px] transition-all text-xs xl:text-sm flex items-center gap-1.5 whitespace-nowrap';

  return (
    <nav className={`relative mx-auto my-3 sm:my-4 w-[95%] xl:w-full max-w-[1400px] z-50 bg-white border border-[#E4E7E5] shadow-xs transition-all duration-300 ${mobileMenuOpen ? 'rounded-[20px]' : 'rounded-full'}`}>
      <div className="flex flex-row items-center justify-between px-4 sm:px-6 xl:px-8 h-[60px] w-full gap-3 xl:gap-6 flex-nowrap">
        
        {/* Brand Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group shrink-0 whitespace-nowrap">
          <div className="w-9 h-9 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <span className="material-symbols-outlined text-[#11875D] text-xl">shield_person</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg sm:text-xl text-[#111827] tracking-tight whitespace-nowrap">
              FinGuard <span className="text-[#11875D]">AI</span>
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center justify-center gap-1.5 font-sans text-sm flex-nowrap whitespace-nowrap shrink-0">
          <NavLink to="/" className={({ isActive }) => navItemClass(isActive)} end>
            {t('navbar.home', 'Home')}
          </NavLink>
          <NavLink to="/scanner" className={({ isActive }) => navItemClass(isActive)}>
            {t('navbar.scanner', 'AI Scanner')}
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => navItemClass(isActive)}>
            {t('navbar.dashboard', 'Dashboard')}
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => navItemClass(isActive)}>
            {t('navbar.history', 'Scan History')}
          </NavLink>
          <NavLink to="/report" className={({ isActive }) => navItemClass(isActive)}>
            {t('navbar.report', 'Report Scam')}
          </NavLink>
          <NavLink to="/knowledge" className={({ isActive }) => navItemClass(isActive)}>
            {t('navbar.knowledge', 'Knowledge Hub')}
          </NavLink>
          <NavLink to="/learning" className={({ isActive }) => navItemClass(isActive)}>
            {t('navbar.community', 'Academy')}
          </NavLink>
          <NavLink to="/emergency" className={({ isActive }) => sosClass(isActive)}>
            <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse shrink-0" />
            {t('navbar.emergency', 'Emergency')}
          </NavLink>
        </div>

        {/* Right Actions / Language / Profile */}
        <div className="hidden xl:flex items-center gap-3 shrink-0 flex-nowrap whitespace-nowrap">
          <LanguageSwitcher variant="dropdown" />

          {isAuthenticated ? (
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="bg-[#F8FAFC] border border-[#E4E7E5] hover:border-[#11875D] text-[#111827] px-3.5 py-1.5 h-9 rounded-[16px] font-semibold transition-all flex items-center gap-2 cursor-pointer text-xs xl:text-sm shrink-0"
                aria-expanded={userDropdownOpen}
                aria-label="User Account Menu"
              >
                <div className="w-6 h-6 rounded-full bg-[#11875D] text-white flex items-center justify-center text-xs font-bold shrink-0 overflow-hidden">
                  {user?.avatarUrl && !avatarError ? (
                    <img
                      src={user.avatarUrl}
                      alt={displayName}
                      className="w-full h-full object-cover"
                      onError={() => setAvatarError(true)}
                    />
                  ) : (
                    <span>{userInitial}</span>
                  )}
                </div>
                <span className="max-w-[110px] truncate font-medium">{displayName}</span>
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E4E7E5] rounded-[20px] shadow-lg p-2 z-50 flex flex-col gap-1 text-[#111827]">
                  <div className="px-3 py-2 border-b border-[#E4E7E5] mb-1">
                    <p className="text-xs font-bold text-[#111827] truncate">{displayName}</p>
                    <p className="text-[11px] text-[#64748B] truncate">{user?.email}</p>
                  </div>

                  <button
                    onClick={() => { navigate('/profile'); setUserDropdownOpen(false); }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#111827] hover:bg-[#F8FAFC] hover:text-[#11875D] transition-colors text-left cursor-pointer"
                  >
                    <User size={15} className="text-[#11875D]" />
                    <span>My Profile</span>
                  </button>

                  <button
                    onClick={() => { navigate('/dashboard'); setUserDropdownOpen(false); }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#111827] hover:bg-[#F8FAFC] hover:text-[#11875D] transition-colors text-left cursor-pointer"
                  >
                    <LayoutDashboard size={15} className="text-[#11875D]" />
                    <span>Dashboard</span>
                  </button>

                  <button
                    onClick={() => { navigate('/history'); setUserDropdownOpen(false); }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#111827] hover:bg-[#F8FAFC] hover:text-[#11875D] transition-colors text-left cursor-pointer"
                  >
                    <History size={15} className="text-[#11875D]" />
                    <span>Scan History</span>
                  </button>

                  <button
                    onClick={() => { navigate('/presentation'); setUserDropdownOpen(false); }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#111827] hover:bg-[#F8FAFC] hover:text-[#11875D] transition-colors text-left cursor-pointer"
                  >
                    <Presentation size={15} className="text-[#11875D]" />
                    <span>Presentation Deck</span>
                  </button>

                  <div className="border-t border-[#E4E7E5] my-1" />

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#EF4444] hover:bg-red-50 transition-colors text-left font-bold cursor-pointer"
                  >
                    <LogOut size={15} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
              <button
                onClick={() => navigate('/login')}
                className="h-9 px-4 rounded-[16px] border border-[#E4E7E5] bg-white text-[#111827] hover:bg-[#F8FAFC] text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Lock size={14} className="text-[#64748B]" />
                <span>{t('navbar.login', 'Login')}</span>
              </button>
              <button
                onClick={() => navigate('/register')}
                className="h-9 px-4 rounded-[16px] bg-[#11875D] text-white hover:bg-[#0e704d] text-xs xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-2xs"
              >
                {t('navbar.register', 'Get Started')}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="xl:hidden flex items-center gap-2 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#111827] hover:bg-[#F8FAFC] rounded-xl border border-[#E4E7E5] cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border border-[#E4E7E5] rounded-[20px] mt-2 p-4 flex flex-col gap-2 text-sm shadow-md text-[#111827]">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#64748B] hover:text-[#11875D] font-medium border-b border-[#E4E7E5]">
            {t('navbar.home', 'Home')}
          </NavLink>
          <NavLink to="/scanner" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#64748B] hover:text-[#11875D] font-medium border-b border-[#E4E7E5]">
            {t('navbar.scanner', 'AI Scanner')}
          </NavLink>
          <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#64748B] hover:text-[#11875D] font-medium border-b border-[#E4E7E5]">
            {t('navbar.dashboard', 'Dashboard')}
          </NavLink>
          <NavLink to="/history" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#64748B] hover:text-[#11875D] font-medium border-b border-[#E4E7E5]">
            {t('navbar.history', 'Scan History')}
          </NavLink>
          <NavLink to="/report" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#64748B] hover:text-[#11875D] font-medium border-b border-[#E4E7E5]">
            {t('navbar.report', 'Report Scam')}
          </NavLink>
          <NavLink to="/knowledge" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#64748B] hover:text-[#11875D] font-medium border-b border-[#E4E7E5]">
            {t('navbar.knowledge', 'Knowledge Hub')}
          </NavLink>
          <NavLink to="/learning" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#64748B] hover:text-[#11875D] font-medium border-b border-[#E4E7E5]">
            {t('navbar.community', 'Academy')}
          </NavLink>
          <NavLink to="/emergency" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#EF4444] font-bold border-b border-[#E4E7E5] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
            {t('navbar.emergency', 'Emergency')}
          </NavLink>

          <div className="pt-2 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#64748B]">Language</span>
              <LanguageSwitcher variant="pills" showLabel={false} />
            </div>
            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                  className="h-9 rounded-[16px] border border-[#E4E7E5] bg-white text-[#111827] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Lock size={14} className="text-[#64748B]" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => { navigate('/register'); setMobileMenuOpen(false); }}
                  className="h-9 rounded-[16px] bg-[#11875D] text-white font-semibold text-xs flex items-center justify-center cursor-pointer shadow-2xs"
                >
                  Get Started
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full h-9 rounded-[16px] bg-red-50 text-[#EF4444] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut size={14} />
                <span>Logout ({displayName})</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
