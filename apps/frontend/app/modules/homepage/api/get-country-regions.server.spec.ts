import { vitest, type Mocked } from 'vitest';

import { getCountryRegions, type Region } from './get-country-regions.server';
import { apiService } from '~/server/api/service.server';

vitest.mock('~/server/api/service.server', () => ({
  apiService: {
    get: vitest.fn(),
  },
}));

const MockedAPI = apiService as Mocked<typeof apiService>;

afterEach(() => {
  MockedAPI.get.mockClear();
});

const mockResponse = [
  [
    { id: 101, name: 'Region A', property_count: 10 },
    { id: 102, name: 'Region B', property_count: 5 },
    { id: 103, name: 'Region C', property_count: 15 },
  ] as Region[],
  new Response(),
  'ok',
];

it('getCountryRegions should fetch country regions and sort them by property_count in descending order', async () => {
  // @ts-ignore
  MockedAPI.get.mockResolvedValue(mockResponse);
  const request = new Request('/');

  // Call the getCountryRegions function
  const result = await getCountryRegions(request, 'en', 55731);

  // Assert the result
  expect(result).toEqual([
    { id: 103, name: 'Region C', property_count: 15 },
    { id: 101, name: 'Region A', property_count: 10 },
    { id: 102, name: 'Region B', property_count: 5 },
  ]);
});

it('getCountryRegions should throw an error if the provided nationId is not found in REGIONS_MAP', async () => {
  // Mock the request object
  const request = new Request('/');

  // Call the getCountryRegions function with an invalid nationId (not in REGIONS_MAP)
  await expect(getCountryRegions(request, 'en', 999)).rejects.toThrowError(
    'Nation 999 not found in REGIONS_MAP',
  );

  // Make sure apiService.get is not called in this case
  expect(MockedAPI.get).not.toHaveBeenCalled();
});

it('getCountryRegions should throw an error if the apiService.get call returns status "error"', async () => {
  // @ts-ignore
  MockedAPI.get.mockRejectedValue(new Error('HERE!'));
  const request = new Request('/');

  // Call the getCountryRegions function
  await expect(getCountryRegions(request, 'en', 55731)).rejects.toThrowError();
});
