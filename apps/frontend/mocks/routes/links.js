const SUPPORTED_LOCALES = [
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

const COUNTRY_KEYS = ['spain', 'portugal', 'italy', 'france'];

const mockLocaleData = (routeName) =>
  SUPPORTED_LOCALES.reduce((localeAcc, locale) => {
    return {
      ...localeAcc,
      [locale]: `/${locale}/mocked-${routeName}`,
    };
  }, {});

const mockCountryRoute = (routeName) =>
  COUNTRY_KEYS.reduce((acc, countryKey) => {
    return {
      ...acc,
      [countryKey]: mockLocaleData(`${routeName}-${countryKey}`),
    };
  }, {});

const PRELOADED_ROUTES = {
  properties_for_sale: mockCountryRoute('properties_for_sale'),
  properties_to_rent: mockCountryRoute('properties_to_rent'),
  agents_search: mockCountryRoute('properties_for_sale'),
  cookie_preferences: mockLocaleData('cookie_preferences'),
  sitemap: mockLocaleData('sitemap'),
};

module.exports = [
  {
    id: 'get-links', // id of the route
    url: '/v1/links/navigation', // url in path-to-regexp format
    method: 'GET', // HTTP method
    variants: [
      {
        id: 'success', // id of the variant
        type: 'json', // variant type
        options: {
          status: 200,
          body: PRELOADED_ROUTES,
        },
      },
    ],
  },
];
