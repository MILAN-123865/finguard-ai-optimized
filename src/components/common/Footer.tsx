import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, Globe, MessageSquare, AtSign, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full pt-12 pb-10 bg-white border-t border-[#E4E7E5] mt-16 relative z-10 text-[#111827]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-10">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#E4E7E5]">
          
          {/* Column 1: Description & Socials */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-center text-[#11875D]">
                <span className="material-symbols-outlined text-xl">shield_person</span>
              </div>
              <span className="text-xl font-bold text-[#111827] tracking-tight">
                FinGuard <span className="text-[#11875D]">AI</span>
              </span>
            </div>
            <p className="text-[#64748B] text-xs leading-relaxed">
              {t('footer.description', 'Autonomous cybersecurity shield neutralizing financial fraud vectors, phishing links, and social engineering in real-time.')}
            </p>
            <div className="flex items-center gap-2 text-[#64748B] pt-1">
              <a href="#" className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#DDF2EA] hover:text-[#11875D] border border-[#E4E7E5] transition-colors"><Globe size={16} /></a>
              <a href="#" className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#DDF2EA] hover:text-[#11875D] border border-[#E4E7E5] transition-colors"><MessageSquare size={16} /></a>
              <a href="#" className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#DDF2EA] hover:text-[#11875D] border border-[#E4E7E5] transition-colors"><AtSign size={16} /></a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#11875D] mb-1">
              {t('footer.navigation', 'Navigation')}
            </h5>
            <NavLink to="/" className="text-[#64748B] hover:text-[#11875D] transition-colors text-xs font-medium">{t('navbar.home', 'Home')}</NavLink>
            <NavLink to="/scanner" className="text-[#64748B] hover:text-[#11875D] transition-colors text-xs font-medium">{t('navbar.scanner', 'AI Scam Scanner')}</NavLink>
            <NavLink to="/dashboard" className="text-[#64748B] hover:text-[#11875D] transition-colors text-xs font-medium">{t('navbar.dashboard', 'Security Dashboard')}</NavLink>
            <NavLink to="/history" className="text-[#64748B] hover:text-[#11875D] transition-colors text-xs font-medium">{t('navbar.history', 'Scan History')}</NavLink>
            <NavLink to="/report" className="text-[#64748B] hover:text-[#11875D] transition-colors text-xs font-medium">{t('navbar.report', 'Report Scam')}</NavLink>
          </div>

          {/* Column 3: Resources */}
          <div className="flex flex-col gap-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#11875D] mb-1">
              {t('footer.intelligence', 'Resources')}
            </h5>
            <NavLink to="/knowledge" className="text-[#64748B] hover:text-[#11875D] transition-colors text-xs font-medium">Knowledge Hub</NavLink>
            <NavLink to="/learning" className="text-[#64748B] hover:text-[#11875D] transition-colors text-xs font-medium">Security Academy</NavLink>
            <NavLink to="/emergency" className="text-[#64748B] hover:text-[#11875D] transition-colors text-xs font-medium">Emergency SOS</NavLink>
            <NavLink to="/terms" className="text-[#64748B] hover:text-[#11875D] transition-colors text-xs font-medium">Terms of Service</NavLink>
            <NavLink to="/privacy-policy" className="text-[#64748B] hover:text-[#11875D] transition-colors text-xs font-medium">Privacy Policy</NavLink>
          </div>

          {/* Column 4: System Status */}
          <div className="flex flex-col gap-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#11875D] mb-1">
              {t('footer.systemHealth', 'System Status')}
            </h5>
            <div className="p-3.5 rounded-[16px] bg-[#F8FAFC] border border-[#E4E7E5] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#64748B]">Telemetry Engine</span>
                <span className="text-[#10B981] font-bold">ONLINE</span>
              </div>
              <div className="flex items-center gap-2 text-[#11875D] text-xs font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                <span>All Security Engines Operational</span>
              </div>
            </div>
            <p className="text-[11px] text-[#64748B] mt-1 font-medium">
              Official Cyber Security & Anti-Fraud Platform Standard
            </p>
          </div>
        </div>

        {/* APEX CODERS Team Card */}
        <div className="rounded-[20px] bg-[#F8FAFC] border border-[#E4E7E5] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDF2EA] text-[#11875D] text-[11px] font-bold uppercase tracking-wider">
              <Users size={13} />
              <span>Official Development Team</span>
            </div>
            <p className="text-xs text-[#64748B] pt-1">
              Engineered & Designed with precision by
            </p>
          </div>

          {/* APEX CODERS Stylized Display */}
          <div className="text-center md:text-right">
            <h2 className="font-bold text-2xl sm:text-3xl tracking-wide uppercase text-[#111827]">
              APEX CODERS
            </h2>
            <p className="text-xs text-[#11875D] tracking-wider uppercase font-semibold mt-0.5">
              Official Development Team
            </p>
            <div className="text-xs sm:text-sm text-[#111827] font-semibold mt-2 flex flex-wrap items-center justify-center md:justify-end gap-2">
              <span className="px-2.5 py-1 bg-white border border-[#E4E7E5] rounded-[12px]">Manan Patel</span>
              <span className="px-2.5 py-1 bg-white border border-[#E4E7E5] rounded-[12px]">Milan Rathod</span>
              <span className="px-2.5 py-1 bg-white border border-[#E4E7E5] rounded-[12px]">Neel Prajapati</span>
              <span className="px-2.5 py-1 bg-white border border-[#E4E7E5] rounded-[12px]">Pratik Rathva</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-[#64748B] gap-3 pt-2">
          <p>© 2026 FinGuard AI. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs">
            <ShieldCheck size={16} className="text-[#11875D]" />
            <span>Built by <strong className="text-[#111827] font-bold">APEX CODERS</strong></span>
          </div>
        </div>

      </div>
    </footer>
  );
};
