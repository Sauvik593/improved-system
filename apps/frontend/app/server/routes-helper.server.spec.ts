import { createContext } from 'test/__mocks__/server-env.mock';
import { getAppRoutes, getCountryLocalisedRoutes } from './routes-helper.server';
import { SPAIN_KEY } from '~/common/helpers/shared-constants';
import { SUPPORTED_LOCALES } from '~/i18n';
import { type ServerCountry } from '~/modules/homepage/country-specific/helpers';

describe('getAppRoutes', () => {
  it('should return app routes', () => {
    const context = createContext();
    const locale = 'en';
    const country = {
      key: SPAIN_KEY,
      translations: {
        en: 'Spain',
      },
    } as unknown as ServerCountry;

    const result = getAppRoutes({ context, locale, country });

    expect(result).toEqual(
      expect.objectContaining({
        external: {
          account: expect.any(String),
          affordability: expect.any(String),
          agentsFAQ: expect.any(String),
          generalFAQ: expect.any(String),
          buyersFAQ: expect.any(String),
          buyersGuide: expect.any(String),
          cookies: expect.any(String),
          franceGuide: expect.any(String),
          italyGuide: expect.any(String),
          jobs: expect.any(String),
          join: expect.any(String),
          joinContact: expect.any(String),
          marketData: expect.any(String),
          pdfGuide: expect.any(String),
          podcasts: expect.any(String),
          portugalGuide: expect.any(String),
          privacy: expect.any(String),
          spainGuide: expect.any(String),
          support: expect.any(String),
          terms: expect.any(String),
          forgotPassword: expect.any(String),
        },
        internal: {
          aboutUs: expect.any(String),
          agents_search: {
            france: expect.any(String),
            italy: expect.any(String),
            portugal: expect.any(String),
            spain: expect.any(String),
          },
          cookie_preferences: expect.any(String),
          countryHomepage: expect.any(String),
          enquiries: expect.any(String),
          favourites: expect.any(String),
          homepage: expect.any(String),
          logout: expect.any(String),
          properties_for_sale: {
            france: expect.any(String),
            italy: expect.any(String),
            portugal: expect.any(String),
            spain: expect.any(String),
          },
          properties_to_rent: {
            france: expect.any(String),
            italy: expect.any(String),
            portugal: expect.any(String),
            spain: expect.any(String),
          },
          savedSearches: expect.any(String),
          sitemap: expect.any(String),
        },
        social: {
          facebook: expect.any(String),
          instagram: expect.any(String),
          linkedin: expect.any(String),
          pinterest: expect.any(String),
          twitter: expect.any(String),
          youtube: expect.any(String),
        },
      }),
    );
  });
});

describe('getCountryLocalisedRoutes', () => {
  it('should return localised routes for each supported locale', () => {
    const country = {
      key: 'countryKey',
      translations: {
        en: 'CountryName',
      },
    } as unknown as ServerCountry;

    const result = getCountryLocalisedRoutes(country);
    expect(result.length).toBe(SUPPORTED_LOCALES.length);
  });
});
