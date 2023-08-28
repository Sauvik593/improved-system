import { DocsRoutes } from './docs-routes';
import { DOCS_LOCALES } from './constants';

const DOCS_URL = process.env.DOCS_URL || 'https://docs.kyero.com';

describe('DocsRoutes', () => {
  const env = process.env;

  beforeAll(() => {
    jest.resetModules();
    process.env = { ...env, DOCS_URL };
  });

  describe('termURL', () => {
    it('returns the docs URL for supported locales', () => {
      DOCS_LOCALES.forEach((locale) => {
        expect(DocsRoutes.termsURL(locale)).toEqual(`${DOCS_URL}/${locale}/terms`);
      });
    });
  });
  describe('privacyURL', () => {
    it('returns the docs URL for supported locales', () => {
      DOCS_LOCALES.forEach((locale) => {
        expect(DocsRoutes.privacyURL(locale)).toEqual(`${DOCS_URL}/${locale}/privacy`);
      });
    });
  });
  describe('cookiesURL', () => {
    it('returns the docs URL for supported locales', () => {
      DOCS_LOCALES.forEach((locale) => {
        expect(DocsRoutes.cookiesURL(locale)).toEqual(`${DOCS_URL}/${locale}/cookies`);
      });
    });
  });
});
