import { jest } from '@jest/globals';
import { DataRoutes } from './data-routes';
import { MARKET_DATA_ROUTES, AFFORDABILITY_DATA_ROUTES } from './constants';

const DATA_URL = process.env.DATA_URL || 'https://data.kyero.com';

describe('DataRoutes', () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env, GUIDES_URL: 'https://data.kyero.com' };
  });

  describe('#marketData', () => {
    Object.entries(MARKET_DATA_ROUTES).forEach(([locale, subPath]) => {
      it(`returns the ${locale} URL`, () => {
        expect(DataRoutes.marketData(locale)).toEqual(`${DATA_URL}/${locale}${subPath}`);
      });
    });
  });

  describe('#affordabilityCalculator', () => {
    Object.entries(AFFORDABILITY_DATA_ROUTES).forEach(([locale, subPath]) => {
      it(`returns the ${locale} URL`, () => {
        expect(DataRoutes.affordabilityCalculator(locale)).toEqual(
          `${DATA_URL}/${locale}${subPath}`,
        );
      });
    });
  });
});
