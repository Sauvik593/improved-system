import { CountryPreloadedRoute, KyeroRouter } from '@kyero/router';

import { COUNTRY_KEYS } from '~/common/helpers/shared-constants';
import { SUPPORTED_LOCALES } from '~/i18n';
import { RouteLinks } from '~/server/base-loader/base-loader.server';
import { type SERVER_ENV_SCHEMA } from 'env.server';

export const SERVER_ENV: ReturnType<typeof SERVER_ENV_SCHEMA.parse> = {
  BASE_URL: 'https://kyero.test',
  FRONTEND_API_URL: 'https://api.kyero.test',
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || 'test_facebook_app_id',
  FRONTEND_API_AUTH_TOKEN: 'TOKEN',
  KYERO_ENV: 'development' as const,
  NODE_ENV: 'test' as const,
};

const mockLocaleData = (routeName: string) => (
  SUPPORTED_LOCALES.reduce((localeAcc, locale) => {
    return {
      ...localeAcc,
      [locale]: `/${locale}/mocked-${routeName}`,
    };
  }, {}),
)

const mockCountryRoute = (routeName: string) => (
  COUNTRY_KEYS.reduce((acc, countryKey) => {
    return {
      ...acc,
      [countryKey]: mockLocaleData(`${routeName}-${countryKey}`)
    };
  }, {})
)

export const PRELOADED_ROUTES = {
  properties_for_sale: mockCountryRoute('properties_for_sale') as CountryPreloadedRoute,
  properties_to_rent: mockCountryRoute('properties_to_rent') as CountryPreloadedRoute,
  agents_search: mockCountryRoute('properties_for_sale') as CountryPreloadedRoute,
  cookie_preferences: mockLocaleData('cookie_preferences'),
  sitemap: mockLocaleData('sitemap'),
};

const KyeroRouterMock = new KyeroRouter();
KyeroRouterMock.preloadedRoutes = PRELOADED_ROUTES;

export const createContext = (serverEnv: Partial<typeof SERVER_ENV> = {}) => {
  const MERGED_SERVER_ENV = { ...SERVER_ENV, ...serverEnv };
  return {
    SERVER_ENV: MERGED_SERVER_ENV,
    CLIENT_ENV: {
      BASE_URL: MERGED_SERVER_ENV.BASE_URL,
      KYERO_ENV: MERGED_SERVER_ENV.KYERO_ENV,
      NODE_ENV: MERGED_SERVER_ENV.NODE_ENV,
    },
    KyeroRouter: KyeroRouterMock,
  };
};


export const createRoutesMock = (locale?: string = 'en'): RouteLinks => ({
  external: {
    privacy: `https://docs.kyero.com/${locale}/privacy`,
    terms: `https://docs.kyero.com/${locale}/terms`,
    cookies: `https://docs.kyero.com/${locale}/cookies`,
    buyersGuide: `https://yero.com/${locale}/join/buyers-guide`,
    pdfGuide: `https://kyero.com/${locale}/join/pdf-guide`,
    italyGuide: `https://kyero.com/${locale}/join/italy-guide`,
    portugalGuide: `https://kyero.com/${locale}/join/portugal-guide`,
    franceGuide: `https://kyero.com/${locale}/join/france-guide`,
    spainGuide: `https://kyero.com/${locale}/join/spain-guide`,
    podcasts: `https://kyero.com/${locale}/join/podcasts`,
    support: `https://kyero.com/${locale}/join/support`,
    agentsFAQ: `https://info.kyero.com/${locale}/agents-faq`,
    generalFAQ: `https://info.kyero.com/${locale}`,
    buyersFAQ: `https://info.kyero.com/${locale}/buyers-faq`,
    join: `https://kyero.com/${locale}/join`,
    joinContact: `https://kyero.com/${locale}/join/contact`,
    marketData: `https://data.kyero.com/${locale}`,
    affordability: `https://data.kyero.com/${locale}/affordability`,
    jobs: `https://jobs.kyero.com/${locale}`,
    account: `https://id.kyero.com/account`,
  },
  social: {
    facebook: `https://facebook.com/kyero.com`,
    instagram: `https://instagram.com/kyero.com`,
    twitter: `https://twitter.com/kyero`,
    linkedin: `https://linkedin.com/company/kyero`,
    pinterest: `https://pinterest.com/kyero`,
    youtube:  `https://youtube.com/channel/kyero-com`,
  },
  internal: {
    agents_search: {
      spain: `/${locale}/spain-agents-search`,
      portugal: `/${locale}/portugal-agents-search`,
      france: `/${locale}/france-agents-search`,
      italy: `/${locale}/italy-agents-search`,
    },
    properties_for_sale: {
      spain: `/${locale}/spain-sale-search`,
      portugal: `/${locale}/portugal-sale-search`,
      france: `/${locale}/france-sale-search`,
      italy: `/${locale}/italy-sale-search`,
    },
    properties_to_rent: {
      spain: `/${locale}/spain-rent-search`,
      portugal: `/${locale}/portugal-rent-search`,
      france: `/${locale}/france-rent-search`,
      italy: `/${locale}/italy-rent-search`,
    },
    aboutUs: `/${locale}/about-us`,
    cookie_preferences: `/${locale}/cookie-preferences`,
    sitemap: `/${locale}/sitemap`,
    countryHomepage: `/${locale}/portugal`,
    homepage: `/${locale}`,
    enquiries: `/${locale}/${locale}quiries`,
    favourites: `/${locale}/favourites`,
    savedSearches: `/${locale}/saved-searches`,
    logout: `/${locale}/logout`,
  }
})