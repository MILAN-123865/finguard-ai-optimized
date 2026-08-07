import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';
import gu from './locales/gu.json';
import mr from './locales/mr.json';
import te from './locales/te.json';

const SUPPORTED_LANGS = ['en', 'gu', 'hi', 'mr', 'te'];

const getInitialLanguage = (): string => {
  const savedA11y = localStorage.getItem('finguard_a11y_prefs');
  if (savedA11y) {
    try {
      const parsed = JSON.parse(savedA11y);
      if (parsed.language && SUPPORTED_LANGS.includes(parsed.language)) {
        return parsed.language;
      }
    } catch (e) {
      // ignore
    }
  }
  const savedLang = localStorage.getItem('language') || localStorage.getItem('finguard_lang');
  if (savedLang && SUPPORTED_LANGS.includes(savedLang)) {
    return savedLang;
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      gu: { translation: gu },
      mr: { translation: mr },
      te: { translation: te },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
