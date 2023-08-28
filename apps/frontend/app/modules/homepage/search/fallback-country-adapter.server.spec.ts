import { vi } from 'vitest';
import { FallbackCountryAdapter } from './fallback-country-adapter.server';
import { COUNTRIES } from '../country-specific/helpers';

const mockedContext = {
  KyeroRouter: {
    getFrontendRoutes: vi.fn(() => ({
      properties_for_sale: {
        portugal: '/buy/in/portugal',
      },
      properties_to_rent: {
        portugal: '/rent/in/portugal',
      },
      agents_search: {
        portugal: '/agents/in/portugal',
      },
    })),
  },
};

describe('FallbackCountyrAdapter', () => {
  describe('getRedirectPath', () => {
    it('should return the correct path for buy', () => {
      const adapter = new FallbackCountryAdapter(mockedContext as any, COUNTRIES.PORTUGAL);

      expect(adapter.getRedirectPath('es', 'buy')).toEqual('/buy/in/portugal');
      expect(adapter.getRedirectPath('es', 'rent')).toEqual('/rent/in/portugal');
      expect(adapter.getRedirectPath('es', 'agents')).toEqual('/agents/in/portugal');
      expect(mockedContext.KyeroRouter.getFrontendRoutes).toHaveBeenCalledWith('es');
    });
  });
});
