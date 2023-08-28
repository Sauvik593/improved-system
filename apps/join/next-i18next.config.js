const path = require('path');

const i18n = {
  locales: ['en', 'fr', 'pt', 'it', 'es'],
  defaultLocale: 'en',
  localeDetection: false,
};

const nexti18nextConfig = {
  i18n,
  fallbackLng: 'en',
  localePath: path.resolve('./i18n'),
  localeStructure: '{{lng}}/{{ns}}',
  trailingSlash: true,
  localeDetection: false,
  ignoreRoutes: ['/new-join/api', '/new-join-assets'],
};

module.exports = nexti18nextConfig;
