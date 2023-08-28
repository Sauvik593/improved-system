const config = {
  // This is the list of languages your application supports
  supportedLngs: ['en', 'es'],
  // The default namespace of i18next is "translation", but you can customize it here
  fallbackLang: 'en',
  defaultNS: 'common',
  // Disabling suspense is recommended
  react: { useSuspense: true },
};

export default config;
