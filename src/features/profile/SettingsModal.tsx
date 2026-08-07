import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Settings, Moon, Globe, Bell, Shield, ShieldCheck, 
  ToggleLeft, ToggleRight, Info, ChevronRight 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useA11y } from '../../context/A11yContext';
import { Select } from '../../components/ui/Select';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const a11y = useA11y();
  const { t } = useTranslation();
  const [autoScan, setAutoScan] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);
  const [privacyTelemetry, setPrivacyTelemetry] = useState(true);
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'about'>('general');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0a0d1a] light:bg-white border border-white/10 light:border-slate-200 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row h-[80vh] max-h-[600px] text-white light:text-slate-900"
        >
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-[#0f1321] light:bg-slate-50 border-r border-white/5 light:border-slate-200 flex flex-col">
            <div className="p-6 border-b border-white/5 light:border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#00daf3]/10 rounded-xl">
                  <Settings size={20} className="text-[#00daf3]" />
                </div>
                <h2 className="font-bold">{t('settings.title', 'Settings')}</h2>
              </div>
              <button onClick={onClose} className="md:hidden text-[#bac9cc] light:text-slate-500 hover:text-white light:hover:text-slate-900">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 space-y-1">
              {[
                { id: 'general', label: t('settings.general', 'General'), icon: Settings },
                { id: 'security', label: t('settings.securityTab', 'Security & Privacy'), icon: Shield },
                { id: 'about', label: t('settings.aboutTab', 'About'), icon: Info },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    activeTab === tab.id 
                      ? 'bg-[#00daf3]/10 text-[#00daf3] font-bold' 
                      : 'text-[#bac9cc] light:text-slate-600 hover:bg-white/5 light:hover:bg-slate-200/60 hover:text-white light:hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <tab.icon size={16} />
                    <span className="text-sm">{tab.label}</span>
                  </div>
                  <ChevronRight size={14} className={activeTab === tab.id ? 'opacity-100' : 'opacity-0'} />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[#0a0d1a] light:bg-white relative">
            <button onClick={onClose} className="hidden md:block absolute top-6 right-6 text-[#bac9cc] light:text-slate-500 hover:text-white light:hover:text-slate-900 transition-colors">
              <X size={20} />
            </button>
            
            {activeTab === 'general' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">{t('settings.appearance', 'Appearance')}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                      <div className="flex items-center gap-3 text-[#bac9cc] light:text-slate-600">
                        <Moon size={18} />
                        <div>
                          <p className="text-sm font-bold text-white light:text-slate-900">{t('settings.theme', 'Theme')}</p>
                          <p className="text-xs">{t('settings.appearance', 'Select your interface theme preference.')}</p>
                        </div>
                      </div>
                      <Select 
                        value={a11y.theme}
                        onChange={(e) => a11y.setTheme(e.target.value as any)}
                        options={[
                          { value: 'light', label: t('settings.lightTheme', 'Light Theme') },
                          { value: 'dark', label: t('settings.darkTheme', 'Dark Theme') }
                        ]}
                        size="sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4">{t('settings.localization', 'Localization')}</h3>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                    <div className="flex items-center gap-3 text-[#bac9cc] light:text-slate-600">
                      <Globe size={18} />
                      <div>
                        <p className="text-sm font-bold text-white light:text-slate-900">{t('settings.language', 'Language')}</p>
                        <p className="text-xs">{t('settings.localization', 'Select your preferred language.')}</p>
                      </div>
                    </div>
                    <Select 
                      value={a11y.language}
                      onChange={(e) => a11y.setLanguage(e.target.value as any)}
                      options={[
                        { value: 'en', label: 'English' },
                        { value: 'gu', label: 'ગુજરાતી (Gujarati)' },
                        { value: 'hi', label: 'हिन्दी (Hindi)' },
                        { value: 'mr', label: 'मराठी (Marathi)' },
                        { value: 'te', label: 'తెలుగు (Telugu)' }
                      ]}
                      size="sm"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4">{t('settings.notifications', 'Notification Preferences')}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                      <div className="flex items-center gap-3 text-[#bac9cc] light:text-slate-600">
                        <Bell size={18} />
                        <div>
                          <p className="text-sm font-bold text-white light:text-slate-900">{t('settings.pushNotif', 'Push Notifications')}</p>
                          <p className="text-xs">Receive critical alerts in real-time.</p>
                        </div>
                      </div>
                      <button onClick={() => setNotifPush(!notifPush)} className="text-[#00daf3]">
                        {notifPush ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-white/20 light:text-slate-300" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                      <div className="flex items-center gap-3 text-[#bac9cc] light:text-slate-600">
                        <Bell size={18} />
                        <div>
                          <p className="text-sm font-bold text-white light:text-slate-900">{t('settings.emailDigest', 'Email Digest')}</p>
                          <p className="text-xs">Weekly summary of scanned threats.</p>
                        </div>
                      </div>
                      <button onClick={() => setNotifEmail(!notifEmail)} className="text-[#00daf3]">
                        {notifEmail ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-white/20 light:text-slate-300" />}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">{t('settings.security', 'Security Preferences')}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                      <div className="flex items-center gap-3 text-[#bac9cc] light:text-slate-600">
                        <ShieldCheck size={18} />
                        <div>
                          <p className="text-sm font-bold text-white light:text-slate-900">Auto Scan Messages</p>
                          <p className="text-xs">Automatically intercept and scan incoming texts.</p>
                        </div>
                      </div>
                      <button onClick={() => setAutoScan(!autoScan)} className="text-[#00daf3]">
                        {autoScan ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-white/20 light:text-slate-300" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4">{t('settings.privacy', 'Privacy Settings')}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                      <div className="flex items-center gap-3 text-[#bac9cc] light:text-slate-600">
                        <Shield size={18} />
                        <div>
                          <p className="text-sm font-bold text-white light:text-slate-900">{t('settings.telemetry', 'Share Telemetry')}</p>
                          <p className="text-xs">Help improve AI models anonymously.</p>
                        </div>
                      </div>
                      <button onClick={() => setPrivacyTelemetry(!privacyTelemetry)} className="text-[#00daf3]">
                        {privacyTelemetry ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-white/20 light:text-slate-300" />}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'about' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#00e5ff]/20 to-[#6001d1]/40 border border-[#00e5ff]/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                  <span className="material-symbols-outlined text-[#00daf3] text-4xl">shield_person</span>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold">{t('settings.about', 'FinGuard AI')}</h3>
                  <p className="text-sm text-[#bac9cc] light:text-slate-600 mt-1">Next-Gen Threat Protection Engine</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 light:bg-slate-50 border border-white/10 light:border-slate-200 w-full max-w-sm space-y-3 font-mono text-xs text-left">
                  <div className="flex justify-between">
                    <span className="text-[#bac9cc] light:text-slate-500">{t('settings.version', 'Version')}</span>
                    <span className="font-bold">v2.5.0 (Build 9812)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#bac9cc] light:text-slate-500">{t('settings.coreModel', 'Core Model')}</span>
                    <span className="text-[#00daf3] font-bold">Gemini-Pro-Vision</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#bac9cc] light:text-slate-500">{t('settings.lastUpdated', 'Last Updated')}</span>
                    <span className="font-bold">Today, 08:00 UTC</span>
                  </div>
                </div>
                <div className="flex gap-4 text-xs font-mono text-[#bac9cc] light:text-slate-500 mt-4">
                  <a href="/terms" className="hover:text-white light:hover:text-slate-900 hover:underline transition-all">{t('footer.terms', 'Terms of Service')}</a>
                  <span>•</span>
                  <a href="/privacy-policy" className="hover:text-white light:hover:text-slate-900 hover:underline transition-all">{t('footer.privacy', 'Privacy Policy')}</a>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
