import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Accessibility, X, Moon, Sun, Type, Eye, Languages, Navigation } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useA11y } from '../../context/A11yContext';
import { LanguageSelector } from './LanguageSelector';

export const AccessibilityWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const a11y = useA11y();
  const { t } = useTranslation();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-[#00daf3] text-[#00363d] p-3 rounded-full shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0f1321]"
        aria-label={t('a11y.accessibilitySettings', 'Accessibility Settings')}
        title={t('a11y.accessibilitySettingsTooltip', 'Open accessibility preferences and display controls')}
        aria-expanded={isOpen}
      >
        <Accessibility size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
              aria-hidden="true"
            />
            
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 sm:bottom-6 sm:left-6 w-full sm:w-96 max-h-[90vh] bg-[#0f1321] light:bg-white border border-white/10 light:border-slate-200 sm:rounded-3xl shadow-2xl flex flex-col pointer-events-auto text-white light:text-slate-900"
              role="dialog"
              aria-modal="true"
              aria-label="Accessibility Settings Panel"
            >
              <div className="px-6 py-5 border-b border-white/10 light:border-slate-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Accessibility className="text-[#00daf3]" size={20} />
                  <h2 className="text-lg font-bold">{t('a11y.accessibilitySettings', 'Accessibility')}</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 rounded-full text-[#bac9cc] light:text-slate-500 hover:text-white light:hover:text-slate-900 hover:bg-white/10 light:hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00daf3]"
                  aria-label={t('a11y.closePanel', 'Close Panel')}
                  title={t('a11y.closePanelTooltip', 'Close accessibility settings panel')}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* Theme Controls */}
                <section aria-labelledby="theme-heading">
                  <h3 id="theme-heading" className="text-sm font-bold uppercase tracking-wider mb-3">{t('settings.theme', 'Theme')}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => a11y.setTheme('light')}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all ${a11y.theme === 'light' ? 'border-[#00daf3] bg-[#00daf3]/10 text-[#00daf3]' : 'border-white/10 light:border-slate-300 text-[#bac9cc] light:text-slate-600 hover:bg-white/5 light:hover:bg-slate-100'}`}
                      aria-pressed={a11y.theme === 'light'}
                      aria-label={t('a11y.lightThemeLabel', 'Switch to Light Theme mode')}
                      title={t('a11y.lightThemeTooltip', 'Switch to high-contrast Light mode interface for bright environments')}
                    >
                      <Sun size={20} className="mb-2" />
                      <span className="text-xs font-medium">{t('settings.lightTheme', 'Light')}</span>
                    </button>
                    <button
                      onClick={() => a11y.setTheme('dark')}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all ${a11y.theme === 'dark' ? 'border-[#00daf3] bg-[#00daf3]/10 text-[#00daf3]' : 'border-white/10 light:border-slate-300 text-[#bac9cc] light:text-slate-600 hover:bg-white/5 light:hover:bg-slate-100'}`}
                      aria-pressed={a11y.theme === 'dark'}
                      aria-label={t('a11y.darkThemeLabel', 'Switch to Dark Theme mode')}
                      title={t('a11y.darkThemeTooltip', 'Switch to low-glare Dark mode interface for low-light environments')}
                    >
                      <Moon size={20} className="mb-2" />
                      <span className="text-xs font-medium">{t('settings.darkTheme', 'Dark')}</span>
                    </button>
                  </div>
                </section>

                {/* Text Size Controls */}
                <section aria-labelledby="text-size-heading">
                  <h3 id="text-size-heading" className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Type size={16} /> {t('a11y.fontScale', 'Font Size')}
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {(['sm', 'md', 'lg', 'xl'] as const).map(size => {
                      const sizeDetails: Record<string, { label: string; tooltip: string }> = {
                        sm: { label: 'Small font size (14px)', tooltip: 'Set application text size to Small (14px)' },
                        md: { label: 'Medium font size (16px)', tooltip: 'Set application text size to Medium standard (16px)' },
                        lg: { label: 'Large font size (18px)', tooltip: 'Set application text size to Large (18px) for easier reading' },
                        xl: { label: 'Extra Large font size (20px)', tooltip: 'Set application text size to Extra Large (20px) for maximum readability' },
                      };
                      return (
                        <button
                          key={size}
                          onClick={() => a11y.setFontSize(size)}
                          className={`py-2 rounded-xl border transition-all uppercase text-xs font-bold ${a11y.fontSize === size ? 'border-[#00daf3] bg-[#00daf3]/10 text-[#00daf3]' : 'border-white/10 light:border-slate-300 text-[#bac9cc] light:text-slate-600 hover:bg-white/5 light:hover:bg-slate-100'}`}
                          aria-pressed={a11y.fontSize === size}
                          aria-label={t(`a11y.fontSize_${size}`, sizeDetails[size].label)}
                          title={t(`a11y.fontSize_${size}_tooltip`, sizeDetails[size].tooltip)}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Display Preferences */}
                <section aria-labelledby="display-heading">
                  <h3 id="display-heading" className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Eye size={16} /> Visual & Motion
                  </h3>
                  <div className="space-y-3">
                    <label
                      className="flex items-center justify-between p-3 rounded-xl border border-white/10 light:border-slate-300 bg-white/5 light:bg-slate-50 cursor-pointer hover:bg-white/10 transition-colors"
                      title={t('a11y.highContrastTooltip', 'Enable high contrast borders and text emphasis')}
                    >
                      <span className="text-sm font-medium">{t('a11y.highContrast', 'High Contrast Mode')}</span>
                      <input
                        type="checkbox"
                        checked={a11y.highContrast}
                        onChange={(e) => a11y.setHighContrast(e.target.checked)}
                        className="w-5 h-5 accent-[#00daf3]"
                        aria-label={t('a11y.highContrastLabel', 'Toggle high contrast mode for increased visual clarity')}
                        title={t('a11y.highContrastTooltip', 'Enable high contrast borders and text emphasis')}
                      />
                    </label>
                    <label
                      className="flex items-center justify-between p-3 rounded-xl border border-white/10 light:border-slate-300 bg-white/5 light:bg-slate-50 cursor-pointer hover:bg-white/10 transition-colors"
                      title={t('a11y.reduceMotionTooltip', 'Disable non-essential motion effects and animations for motion sensitivity')}
                    >
                      <span className="text-sm font-medium">{t('a11y.reduceMotion', 'Reduce Motion')}</span>
                      <input
                        type="checkbox"
                        checked={a11y.reduceMotion}
                        onChange={(e) => a11y.setReduceMotion(e.target.checked)}
                        className="w-5 h-5 accent-[#00daf3]"
                        aria-label={t('a11y.reduceMotionLabel', 'Toggle reduced motion to minimize screen animations')}
                        title={t('a11y.reduceMotionTooltip', 'Disable non-essential motion effects and animations for motion sensitivity')}
                      />
                    </label>
                  </div>
                </section>

                {/* Language & Layout */}
                <section aria-labelledby="lang-heading">
                  <h3 id="lang-heading" className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Languages size={16} /> {t('settings.language', 'Language')}
                  </h3>
                  <LanguageSelector variant="full" />
                </section>

                <section aria-labelledby="keyboard-heading">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <Navigation className="text-blue-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <h4 id="keyboard-heading" className="text-sm font-bold text-blue-400 mb-1">{t('a11y.keyboardNav', 'Keyboard Navigation')}</h4>
                      <p className="text-xs text-blue-400/80 leading-relaxed">
                        This application supports full keyboard navigation. Use <kbd className="px-1.5 py-0.5 rounded bg-black/30 border border-blue-500/30">Tab</kbd> to move forward and <kbd className="px-1.5 py-0.5 rounded bg-black/30 border border-blue-500/30">Shift + Tab</kbd> to move backward. Focus indicators are persistent.
                      </p>
                    </div>
                  </div>
                </section>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
