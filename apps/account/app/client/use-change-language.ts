import { useEffect } from 'react';
import { useChangeLanguage as useChangeLanguageRemix } from 'remix-i18next';

export const useChangeLanguage = (locale: string) => {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useChangeLanguageRemix(locale);
};
