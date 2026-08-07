import React from 'react';
import { LanguageSwitcher, LanguageSwitcherProps } from './LanguageSwitcher';

export { LanguageSwitcher } from './LanguageSwitcher';

export const LanguageSelector: React.FC<LanguageSwitcherProps> = (props) => {
  return <LanguageSwitcher {...props} />;
};

