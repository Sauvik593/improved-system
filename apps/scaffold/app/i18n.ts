export const SUPPORTED_LOCALES = [
  'ca',
  'da',
  'de',
  'en',
  'es',
  'fi',
  'fr',
  'it',
  'nl',
  'no',
  'pt',
  'ru',
  'sv',
];

export const FALLBACK_LOCALE = 'en';

export const config = {
  // This is the list of languages your application supports
  supportedLngs: SUPPORTED_LOCALES,
  // The default namespace of i18next is "translation", but you can customize it here
  fallbackLang: FALLBACK_LOCALE,
  defaultNS: 'common',
  react: { useSuspense: false },
};

export default config;
