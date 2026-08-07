import React, { useState, useEffect } from 'react';
import { Bell, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { GetAlertsModal } from './GetAlertsModal';

interface ThreatAlertsWidgetProps {
  className?: string;
  compact?: boolean;
}

const LOCAL_STORAGE_KEY = 'aegis_threat_alert_subscriptions_v1';

export const ThreatAlertsWidget: React.FC<ThreatAlertsWidgetProps> = ({
  className = '',
}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const checkSubState = () => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setIsSubscribed(true);
        setUserEmail(parsed.email || '');
      } else {
        setIsSubscribed(false);
        setUserEmail('');
      }
    } catch {
      setIsSubscribed(false);
    }
  };

  useEffect(() => {
    checkSubState();

    window.addEventListener('aegis_alerts_updated', checkSubState);
    window.addEventListener('storage', checkSubState);

    return () => {
      window.removeEventListener('aegis_alerts_updated', checkSubState);
      window.removeEventListener('storage', checkSubState);
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-[20px] p-6 border border-[#E5E7EB] shadow-xs flex flex-col gap-4 ${className}`}
      >
        {/* HEADER */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-center text-[#11875D] shrink-0">
            <Bell size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
              <span>{t('alerts.widgetTitle', 'Threat Alert Feed')}</span>
              {isSubscribed && (
                <span className="px-2 py-0.5 rounded-full bg-[#DDF2EA] text-[#11875D] text-[10px] font-bold flex items-center gap-0.5 border border-[#11875D]/30">
                  <CheckCircle2 size={10} /> Active
                </span>
              )}
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5 font-medium">
              {t('alerts.widgetSub', 'Receive notifications about newly detected scams and phishing campaigns.')}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <p className="text-xs text-[#64748B] leading-relaxed font-medium">
          {isSubscribed
            ? `Threat monitoring notifications actively configured for ${userEmail || 'your email'}.`
            : 'Subscribe to receive immediate automated notifications whenever a critical scam or phishing URL is detected.'}
        </p>

        {/* BUTTON */}
        <button
          onClick={() => setIsModalOpen(true)}
          className={`w-full py-3 px-5 rounded-[16px] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            isSubscribed
              ? 'bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] hover:bg-white'
              : 'bg-[#11875D] hover:bg-[#0e704d] text-white shadow-2xs'
          }`}
        >
          <Mail size={15} />
          <span>{isSubscribed ? t('alerts.manageAlerts', 'Manage Threat Alerts') : t('alerts.getAlertsBtn', 'Get Threat Alerts')}</span>
          <ArrowRight size={15} />
        </button>
      </motion.div>

      {/* Modal */}
      <GetAlertsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
