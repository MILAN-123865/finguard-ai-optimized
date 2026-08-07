import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useA11y, Language } from '../../context/A11yContext';

export interface LanguageSwitcherProps {
  variant?: 'toggle' | 'pills' | 'dropdown' | 'full';
  showLabel?: boolean;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'dropdown',
  showLabel = true,
  className = '',
}) => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useA11y();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { code: Language; name: string; nativeName: string; flag: string; label: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🌐', label: 'English (English)' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', label: 'ગુજરાતી (Gujarati)' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', label: 'हिन्दी (Hindi)' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', label: 'मराठी (Marathi)' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', label: 'తెలుగు (Telugu)' },
  ];

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  if (variant === 'pills') {
    return (
      <div className={`inline-flex items-center p-1 rounded-full bg-white border border-[#E4E7E5] shadow-xs ${className}`}>
        {showLabel && (
          <div className="flex items-center gap-1.5 pl-2 pr-1 text-xs font-medium text-[#64748B]">
            <Globe size={14} className="text-[#11875D]" />
          </div>
        )}
        <div className="flex items-center gap-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                language === lang.code
                  ? 'bg-[#11875D] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#111827] hover:bg-[#F8FAFC]'
              }`}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select Language"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E4E7E5] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#111827] transition-all cursor-pointer shadow-2xs"
      >
        <Globe size={15} className="text-[#11875D]" />
        <span>{currentLang.nativeName}</span>
        <ChevronDown size={14} className={`text-[#64748B] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-44 rounded-2xl bg-white border border-[#E4E7E5] shadow-lg p-1.5 z-50 flex flex-col gap-0.5"
          >
            {languages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#DDF2EA] text-[#11875D] font-bold'
                      : 'text-[#111827] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </span>
                  {isSelected && <Check size={14} className="text-[#11875D]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
