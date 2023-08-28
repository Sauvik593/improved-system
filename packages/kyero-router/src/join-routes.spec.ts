import { jest } from '@jest/globals';
import { JoinRoutes } from './join-routes';

import { JOIN_LOCALES, JOIN_CONTACT_ROUTES } from './constants';

const JOIN_URL = process.env.JOIN_URL || 'https://www.kyero.com/join';

describe('JoinRoutes', () => {
  const env = process.env;

  beforeAll(() => {
    jest.resetModules();
    process.env = { ...env, JOIN_URL: 'https://www.kyero.com/join' };
  });

  describe('joinURL', () => {
    describe('returns a locale in url when locale is supported', () => {
      JOIN_LOCALES.forEach((locale) => {
        it(`returns the ${locale} URL`, () => {
          expect(JoinRoutes.joinURL(locale)).toEqual(`${JOIN_URL}/${locale}`);
        });
      });
    });

    it('returns the default URL when locale is not prefixed', () => {
      expect(JoinRoutes.joinURL('en')).toEqual(`${JOIN_URL}`);
      expect(JoinRoutes.joinURL('pl')).toEqual(`${JOIN_URL}`);
    });
  });

  describe('contactURL', () => {
    describe('returns a locale in url when locale is supported', () => {
      JOIN_LOCALES.forEach((locale) => {
        it(`returns the ${locale} URL`, () => {
          const subPath = JOIN_CONTACT_ROUTES[locale as keyof typeof JOIN_CONTACT_ROUTES];
          expect(JoinRoutes.contactURL(locale)).toEqual(`${JOIN_URL}/${locale}${subPath}`);
        });
      });
    });

    it('returns the default URL when locale is not prefixed', () => {
      expect(JoinRoutes.contactURL('en')).toEqual(`${JOIN_URL}/en/get-in-touch`);
      expect(JoinRoutes.contactURL('pl')).toEqual(`${JOIN_URL}/en/get-in-touch`);
    });
  });
});
