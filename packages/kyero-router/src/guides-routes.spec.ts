import { jest } from '@jest/globals';
import { GuidesRoutes } from './guides-routes';
import {
  ASSETS_URL,
  GUIDES_BUYERS_GUIDE_ROUTES,
  GUIDES_FRANCE_ROUTES,
  GUIDES_ITALY_ROUTES,
  GUIDES_PDF_ROUTES,
  GUIDES_PORTUGAL_ROUTES,
  GUIDES_SPAIN_ROUTES,
} from './constants';
import { getURLWithPath, routeFromConst } from './helpers';

const GUIDES_URL = process.env.GUIDES_URL || 'https://www.kyero.com/guides';

describe('GuidesRoutes', () => {
  const env = process.env;

  beforeAll(() => {
    jest.resetModules();
    process.env = { ...env, GUIDES_URL: 'https://www.kyero.com/guides' };
  });
  describe('#podcastsURL', () => {
    it('should return the URL for podcasts with the correct path', () => {
      expect(GuidesRoutes.podcastsURL()).toBe(getURLWithPath('/guides/en/podcasts', GUIDES_URL));
    });
  });

  describe('#pdfGuideURL', () => {
    it('should return the URL for Spain guide based on the given locale', () => {
      const locales = ['de', 'fr', ' nl'];
      locales.forEach((locale) => {
        const route = routeFromConst(locale, GUIDES_PDF_ROUTES);
        const expectedURL = getURLWithPath(route, ASSETS_URL);
        expect(GuidesRoutes.pdfGuideURL(locale)).toBe(expectedURL);
      });
    });

    it('should return the default URL for unknown locales', () => {
      const unknownLocale = 'ja';
      expect(GuidesRoutes.pdfGuideURL(unknownLocale)).toBe(
        'https://data-assets.kyero.com/guides/Kyero-Spain-Guide.pdf',
      );
    });
  });

  describe('#spainGuideURL', () => {
    it('should return the URL for Spain guide based on the given locale', () => {
      const locales = ['de', 'fr', 'nl', 'it', 'sv'];
      locales.forEach((locale) => {
        const route = routeFromConst(locale, GUIDES_SPAIN_ROUTES);
        const expectedURL = getURLWithPath(route, GUIDES_URL);
        expect(GuidesRoutes.spainGuideURL(locale)).toBe(expectedURL);
      });
    });

    it('should return the default URL for unknown locales', () => {
      const unknownLocale = 'ja';
      const route = routeFromConst(unknownLocale, GUIDES_SPAIN_ROUTES);
      const expectedURL = getURLWithPath(route, GUIDES_URL);
      expect(GuidesRoutes.spainGuideURL(unknownLocale)).toBe(expectedURL);
    });
  });

  describe('#portugalGuidesURL', () => {
    it('should return the URL for Spain guide based on the given locale', () => {
      const locales = ['de', 'fr', 'nl'];
      locales.forEach((locale) => {
        const route = routeFromConst(locale, GUIDES_PORTUGAL_ROUTES);
        const expectedURL = getURLWithPath(route, GUIDES_URL);
        expect(GuidesRoutes.portugalGuideURL(locale)).toBe(expectedURL);
      });
    });

    it('should return the default URL for unknown locales', () => {
      const unknownLocale = 'it';
      const route = routeFromConst(unknownLocale, GUIDES_PORTUGAL_ROUTES);
      const expectedURL = getURLWithPath(route, GUIDES_URL);
      expect(GuidesRoutes.portugalGuideURL(unknownLocale)).toBe(expectedURL);
    });
  });

  describe('#franceGuidesURL', () => {
    it('should return the URL for Spain guide based on the given locale', () => {
      const locales = ['de', 'nl'];
      locales.forEach((locale) => {
        const route = routeFromConst(locale, GUIDES_FRANCE_ROUTES);
        const expectedURL = getURLWithPath(route, GUIDES_URL);
        expect(GuidesRoutes.franceGuideURL(locale)).toBe(expectedURL);
      });
    });

    it('should return the default URL for unknown locales', () => {
      const unknownLocale = 'fr';
      const route = routeFromConst(unknownLocale, GUIDES_FRANCE_ROUTES);
      const expectedURL = getURLWithPath(route, GUIDES_URL);
      expect(GuidesRoutes.franceGuideURL(unknownLocale)).toBe(expectedURL);
    });
  });

  describe('#italyGuidesURL', () => {
    it('should return the URL for Spain guide based on the given locale', () => {
      const locales = ['de', 'nl'];
      locales.forEach((locale) => {
        const route = routeFromConst(locale, GUIDES_ITALY_ROUTES);
        const expectedURL = getURLWithPath(route, GUIDES_URL);
        expect(GuidesRoutes.franceGuideURL(locale)).toBe(expectedURL);
      });
    });

    it('should return the default URL for unknown locales', () => {
      const unknownLocale = 'fr';
      const route = routeFromConst(unknownLocale, GUIDES_ITALY_ROUTES);
      const expectedURL = getURLWithPath(route, GUIDES_URL);
      expect(GuidesRoutes.franceGuideURL(unknownLocale)).toBe(expectedURL);
    });
  });

  describe('#buyersGuideURL', () => {
    it("should return the URL for the buyer's guide based on the given locale", () => {
      const locales = ['de', 'fr', 'nl'];
      locales.forEach((locale) => {
        const route = routeFromConst(locale, GUIDES_BUYERS_GUIDE_ROUTES);
        const expectedURL = getURLWithPath(route, GUIDES_URL);
        expect(GuidesRoutes.buyersGuideURL(locale)).toBe(expectedURL);
      });
    });

    it('should return the default URL for unknown locales', () => {
      const unknownLocale = 'ja';
      const route = routeFromConst(unknownLocale, GUIDES_BUYERS_GUIDE_ROUTES);
      const expectedURL = getURLWithPath(route, GUIDES_URL);
      expect(GuidesRoutes.buyersGuideURL(unknownLocale)).toBe(expectedURL);
    });
  });
});
