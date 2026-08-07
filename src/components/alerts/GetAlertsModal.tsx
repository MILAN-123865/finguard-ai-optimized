import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Bell, ShieldAlert, CheckCircle2, X, Sparkles, Send, AlertTriangle, Check, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, ToastProps } from '../ui/Toast';

interface GetAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = 'finguard_alert_prefs';

export interface AlertPreferences {
  email: string;
  criticalAlerts: boolean;
  zeroDayAlerts: boolean;
  weeklySummary: boolean;
  savedAt: string;
}

export const GetAlertsModal: React.FC<GetAlertsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState('');
  
  // Controlled checkbox states
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [zeroDayAlerts, setZeroDayAlerts] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSavedSub, setHasSavedSub] = useState(false);

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (type: 'info' | 'success' | 'warning' | 'error', title: string, message: string, duration = 4500) => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    const newToast: ToastProps = {
      id,
      type,
      title,
      message,
      duration,
      onClose: (toastId) => setToasts((prev) => prev.filter((t) => t.id !== toastId)),
    };
    setToasts((prev) => [...prev, newToast]);
  };

  // Load saved preferences from localStorage on mount or modal open
  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('aegis_threat_alert_subscriptions_v1');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.email) setEmail(parsed.email);
          
          if (parsed.criticalAlerts !== undefined) setCriticalAlerts(parsed.criticalAlerts);
          else if (parsed.categories?.criticalPhishing !== undefined) setCriticalAlerts(parsed.categories.criticalPhishing);

          if (parsed.zeroDayAlerts !== undefined) setZeroDayAlerts(parsed.zeroDayAlerts);
          else if (parsed.categories?.zeroDayDomains !== undefined) setZeroDayAlerts(parsed.categories.zeroDayDomains);

          if (parsed.weeklySummary !== undefined) setWeeklySummary(parsed.weeklySummary);
          else if (parsed.categories?.weeklyDigest !== undefined) setWeeklySummary(parsed.categories.weeklyDigest);

          setHasSavedSub(true);
        }
      } catch (e) {
        console.warn('Failed to parse saved threat alert preferences:', e);
      }
    }
  }, [isOpen]);

  // Click outside listener to close modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Save/Subscribe Action
  const handleSaveSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('warning', 'Invalid Email', 'Please enter a valid email address to receive threat alerts.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const prefs: AlertPreferences = {
        email,
        criticalAlerts,
        zeroDayAlerts,
        weeklySummary,
        savedAt: new Date().toISOString(),
      };

      // Save preferences to localStorage (finguard_alert_prefs)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      
      // Also write legacy key for compatibility
      localStorage.setItem('aegis_threat_alert_subscriptions_v1', JSON.stringify({
        email,
        categories: { criticalPhishing: criticalAlerts, zeroDayDomains: zeroDayAlerts, weeklyDigest: weeklySummary },
        subscribedAt: new Date().toISOString(),
      }));

      setHasSavedSub(true);
      setIsSubmitting(false);

      // Show success Toast notification
      addToast('success', 'Preferences Saved', 'Alert preferences saved successfully!');

      // Close modal
      setTimeout(() => {
        onClose();
      }, 600);
    }, 400);
  };

  // Test Alert Functionality
  const handleTestAlert = () => {
    // 1. Trigger Toast Notification
    addToast(
      'error',
      '⚠️ URGENT THREAT ALERT',
      '⚠️ URGENT: High-Risk Scam Detected! (Test Notification)',
      6000
    );

    // 2. Bonus Browser Desktop Notification API fallback
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        try {
          new Notification('FinGuard AI Threat Alert', {
            body: '⚠️ URGENT: High-Risk Scam Detected! (Test Notification)',
            icon: '/favicon.ico',
          });
        } catch (e) {
          console.log('Desktop notification error:', e);
        }
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            try {
              new Notification('FinGuard AI Threat Alert', {
                body: '⚠️ URGENT: High-Risk Scam Detected! (Test Notification)',
                icon: '/favicon.ico',
              });
            } catch (e) {
              console.log('Desktop notification error:', e);
            }
          }
        });
      }
    }
  };

  const handleUnsubscribe = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('aegis_threat_alert_subscriptions_v1');
    setHasSavedSub(false);
    setEmail('');
    addToast('info', 'Unsubscribed', 'You have unsubscribed from threat alerts.');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity"
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-lg glass-card rounded-3xl border border-[#00e5ff]/30 bg-[#070a1a] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Cyber Glow Accent */}
              <div className="absolute top-0 right-0 w-60 h-60 bg-[#00e5ff]/10 blur-[90px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#6001d1]/15 blur-[90px] rounded-full pointer-events-none" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full text-[#bac9cc] hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 cursor-pointer"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00e5ff]/20 to-[#6001d1]/30 border border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.25)] shrink-0">
                  <Bell size={24} className="animate-bounce" style={{ animationDuration: '3s' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {t('alerts.title', 'Real-Time Threat Alerts')}
                    </h3>
                    {hasSavedSub && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                        <CheckCircle2 size={10} /> ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-[#bac9cc]">
                    {t('alerts.subtitle', 'Get instant email notifications when zero-day scams or high-risk URLs emerge')}
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveSubscribe} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#bac9cc] uppercase tracking-wider mb-2">
                    {t('alerts.emailLabel', 'Notification Email Address')}
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#bac9cc]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="security-officer@company.com"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-[#00e5ff] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#00e5ff] transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Controlled Checkbox Options */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-mono font-bold text-[#bac9cc] uppercase tracking-wider">
                    {t('alerts.selectCategories', 'Alert Preferences')}
                  </label>

                  {/* 1. Critical Phishing & Scam Alerts */}
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#00e5ff]/40 transition-colors cursor-pointer">
                    <div className="space-y-0.5 pr-2">
                      <div className="text-xs font-bold font-sans text-white flex items-center gap-1.5">
                        <ShieldAlert size={14} className="text-red-400 shrink-0" />
                        <span>Critical Phishing & Scam Alerts</span>
                      </div>
                      <p className="text-[11px] font-mono text-[#bac9cc]">Instant alert when a scam score exceeding 80% is detected</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={criticalAlerts}
                      onChange={(e) => setCriticalAlerts(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#00e5ff] cursor-pointer shrink-0"
                    />
                  </label>

                  {/* 2. Zero-Day Spoofed Domains */}
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#00e5ff]/40 transition-colors cursor-pointer">
                    <div className="space-y-0.5 pr-2">
                      <div className="text-xs font-bold font-sans text-white flex items-center gap-1.5">
                        <AlertTriangle size={14} className="text-amber-400 shrink-0" />
                        <span>Zero-Day Spoofed Domains</span>
                      </div>
                      <p className="text-[11px] font-mono text-[#bac9cc]">Notifications on newly registered banking or fintech lookalike URLs</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={zeroDayAlerts}
                      onChange={(e) => setZeroDayAlerts(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#00e5ff] cursor-pointer shrink-0"
                    />
                  </label>

                  {/* 3. Weekly AI Threat Summary */}
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#00e5ff]/40 transition-colors cursor-pointer">
                    <div className="space-y-0.5 pr-2">
                      <div className="text-xs font-bold font-sans text-white flex items-center gap-1.5">
                        <Sparkles size={14} className="text-[#00e5ff] shrink-0" />
                        <span>Weekly AI Threat Summary</span>
                      </div>
                      <p className="text-[11px] font-mono text-[#bac9cc]">Digest of regional attack vectors, trending voice scams & tactics</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={weeklySummary}
                      onChange={(e) => setWeeklySummary(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#00e5ff] cursor-pointer shrink-0"
                    />
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-[#00e5ff] via-[#00daf3] to-[#6001d1] text-[#00363d] font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Saving...</span>
                    ) : hasSavedSub ? (
                      <>
                        <Check size={16} />
                        <span>SUBSCRIBE TO THREAT ALERTS</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>SUBSCRIBE TO THREAT ALERTS</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleTestAlert}
                    className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-white/5 border border-white/15 hover:border-[#00e5ff]/50 text-white font-mono text-xs hover:text-[#00e5ff] transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Bell size={14} />
                    <span>Test Alert</span>
                  </button>
                </div>

                {hasSavedSub && (
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#bac9cc]">
                    <span>Saved in finguard_alert_prefs</span>
                    <button
                      type="button"
                      onClick={handleUnsubscribe}
                      className="text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={12} /> Unsubscribe
                    </button>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ToastContainer toasts={toasts} />
    </>
  );
};

