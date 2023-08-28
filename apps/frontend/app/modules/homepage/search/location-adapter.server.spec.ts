import { LocationAdapter } from './location-adapter.server';

const mockedLocation = {
  id: 123,
  name: 'Some location',
  popularity: 2,
  parent_name: 'Other parent',
  nation_id: 55371,
  agent_list_path: '/agents/in/location',
  to_rent_path: '/rent/in/location',
  for_sale_path: '/buy/in/location',
};

describe('FallbackCountyrAdapter', () => {
  describe('getRedirectPath', () => {
    it('should return the correct path for buy', () => {
      const adapter = new LocationAdapter({} as any, mockedLocation);

      expect(adapter.getRedirectPath('es', 'buy')).toEqual('/buy/in/location');
      expect(adapter.getRedirectPath('es', 'rent')).toEqual('/rent/in/location');
      expect(adapter.getRedirectPath('es', 'agents')).toEqual('/agents/in/location');
    });
  });
});
