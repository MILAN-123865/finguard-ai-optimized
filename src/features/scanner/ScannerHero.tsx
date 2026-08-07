import React from 'react';
import { ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ScannerHeroProps {
  onQuickScanClick: () => void;
  onTryDemoClick?: () => void;
}

export const ScannerHero: React.FC<ScannerHeroProps> = ({ onQuickScanClick, onTryDemoClick }) => {
  const { t } = useTranslation();

  return (
    <div className="relative rounded-[20px] bg-white p-6 sm:p-8 border border-[#E4E7E5] mb-6 text-center shadow-xs">
      <div className="relative z-10 max-w-3xl mx-auto space-y-4">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 text-[#11875D] text-xs font-bold shadow-2xs">
          <ShieldCheck size={14} className="text-[#11875D]" />
          <span>{t('landing.heroTag', 'AI Powered Scam Detection')}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight leading-snug">
          {t('landing.heroTitleMain', 'Analyze Messages Before They Become')} <span className="text-[#11875D]">{t('landing.heroTitleAccent', 'Financial Threats')}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#64748B] text-sm max-w-xl mx-auto leading-relaxed">
          {t('landing.heroSubtitle', 'Deploy our autonomous AI engine to dissect suspicious messages and URLs in milliseconds. Protect your assets with official threat scanning.')}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onQuickScanClick}
            className="bg-[#11875D] hover:bg-[#0e704d] text-white px-6 py-2.5 rounded-[16px] font-bold text-sm transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheck size={16} />
            <span>{t('landing.pasteMessage', 'Paste Message')}</span>
          </button>

          <button
            onClick={onTryDemoClick || onQuickScanClick}
            className="border border-[#E4E7E5] bg-[#F8FAFC] text-[#111827] hover:bg-white px-6 py-2.5 rounded-[16px] font-bold text-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles size={15} className="text-[#11875D]" />
            <span>{t('landing.tryDemo', 'Try Demo')}</span>
          </button>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E4E7E5] text-xs text-[#64748B] max-w-xl mx-auto font-medium">
          <div>
            <p className="text-base sm:text-lg font-bold text-[#111827]">99.8%</p>
            <p className="text-[11px]">{t('landing.detectionPrecision', 'Detection Accuracy')}</p>
          </div>
          <div>
            <p className="text-base sm:text-lg font-bold text-[#11875D]">&lt;10ms</p>
            <p className="text-[11px]">{t('landing.analysisLatency', 'Response Speed')}</p>
          </div>
          <div>
            <p className="text-base sm:text-lg font-bold text-[#11875D]">0-Day</p>
            <p className="text-[11px]">{t('landing.phishKitDefense', 'Fraud Mitigation')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
