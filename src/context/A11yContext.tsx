import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../i18n';

export type Theme = 'light' | 'dark';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';
export type Language = 'en' | 'gu' | 'hi' | 'mr' | 'te';

interface A11yState {
  theme: Theme;
  fontSize: FontSize;
  highContrast: boolean;
  reduceMotion: boolean;
  language: Language;
  isRtl: boolean;
}

interface A11yContextType extends A11yState {
  setTheme: (theme: Theme) => void;
  setFontSize: (size: FontSize) => void;
  setHighContrast: (enabled: boolean) => void;
  setReduceMotion: (enabled: boolean) => void;
  setLanguage: (lang: Language) => void;
}

const defaultState: A11yState = {
  theme: 'dark',
  fontSize: 'md',
  highContrast: false,
  reduceMotion: false,
  language: 'en',
  isRtl: false,
};

const A11yContext = createContext<A11yContextType | undefined>(undefined);

export const A11yProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<A11yState>(() => {
    const saved = localStorage.getItem('finguard_a11y_prefs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.language && !['en', 'gu', 'hi', 'mr', 'te'].includes(parsed.language)) {
          parsed.language = 'en';
        }
        // Automatic migration from legacy 'system' or invalid theme to default 'dark'
        if (parsed.theme === 'system' || !['light', 'dark'].includes(parsed.theme)) {
          parsed.theme = 'dark';
        }
        return { ...defaultState, ...parsed };
      } catch (e) {
        console.error("Failed to parse a11y preferences", e);
      }
    }

    // Migrate direct legacy localStorage item 'theme' if set to 'system'
    const legacyTheme = localStorage.getItem('theme');
    if (legacyTheme === 'system') {
      localStorage.setItem('theme', 'dark');
    }

    return defaultState;
  });

  // Save state to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('finguard_a11y_prefs', JSON.stringify(state));
    localStorage.setItem('theme', state.theme);
    localStorage.setItem('language', state.language);
  }, [state]);

  // Apply Theme to DOM root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(state.theme);
  }, [state.theme]);

  // Apply Font Size
  useEffect(() => {
    const root = document.documentElement;
    const sizeMap = {
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px'
    };
    root.style.fontSize = sizeMap[state.fontSize];
  }, [state.fontSize]);

  // Apply High Contrast
  useEffect(() => {
    const root = document.documentElement;
    if (state.highContrast) {
      root.classList.add('high-contrast');
      root.style.setProperty('--contrast-bg', '#000000');
      root.style.setProperty('--contrast-text', '#ffffff');
      root.style.setProperty('--contrast-border', '#ffffff');
    } else {
      root.classList.remove('high-contrast');
      root.style.removeProperty('--contrast-bg');
      root.style.removeProperty('--contrast-text');
      root.style.removeProperty('--contrast-border');
    }
  }, [state.highContrast]);

  // Apply Reduce Motion
  useEffect(() => {
    const root = document.documentElement;
    if (state.reduceMotion) {
      root.classList.add('reduce-motion');
      let styleEl = document.getElementById('a11y-reduce-motion');
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'a11y-reduce-motion';
        styleEl.innerHTML = `
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        `;
        document.head.appendChild(styleEl);
      }
    } else {
      root.classList.remove('reduce-motion');
      const styleEl = document.getElementById('a11y-reduce-motion');
      if (styleEl) styleEl.remove();
    }
  }, [state.reduceMotion]);

  // Apply Language & sync with i18n
  useEffect(() => {
    const root = document.documentElement;
    root.lang = state.language;
    root.dir = 'ltr'; // No RTL required
    i18n.changeLanguage(state.language);
  }, [state.language]);

  const value = {
    ...state,
    setTheme: (theme: Theme) => setState(prev => ({ ...prev, theme })),
    setFontSize: (fontSize: FontSize) => setState(prev => ({ ...prev, fontSize })),
    setHighContrast: (highContrast: boolean) => setState(prev => ({ ...prev, highContrast })),
    setReduceMotion: (reduceMotion: boolean) => setState(prev => ({ ...prev, reduceMotion })),
    setLanguage: (language: Language) => setState(prev => ({ ...prev, language })),
  };

  return <A11yContext.Provider value={value}>{children}</A11yContext.Provider>;
};

export const useA11y = () => {
  const context = useContext(A11yContext);
  if (context === undefined) {
    throw new Error('useA11y must be used within an A11yProvider');
  }
  return context;
};
