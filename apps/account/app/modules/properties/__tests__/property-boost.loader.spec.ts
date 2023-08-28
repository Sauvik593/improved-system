import 'test/__mocks__/i18next.server.mock';

import { loader } from '~/modules/properties/property-boost.loader.server';
import { fetchBoostPropertyData, type PropertyBoostDTO } from '~/modules/properties/api/boost';

import { type MockedFunction } from 'vitest';

vi.mock('~/modules/properties/api/boost');

const mockedFetchBoostPropertyData = fetchBoostPropertyData as MockedFunction<
  typeof fetchBoostPropertyData
>;
const createRequest = () => {
  return new Request('http://account.kyero.test/properties/123/boost', {
    method: 'GET',
  });
};

const makeRequest = (request: Request, params: Record<string, string>) =>
  loader({ request, params, context: {} });

describe('loader', () => {
  const propertyId = '1111';

  let params: Record<string, string> = { id: propertyId };
  let request: Request;
  let response: Response;

  async function startTest() {
    request = createRequest();
    response = await makeRequest(request, params);
  }

  describe('when params are invalid', () => {
    afterAll(() => {
      params = { id: propertyId };
    });

    it('should return 400 status', async () => {
      try {
        params = {};
        await startTest();
      } catch (e) {
        const ERROR = e as Response;
        expect(ERROR.status).toEqual(400);
      }
    });
  });

  describe('when response is correct', () => {
    beforeAll(async () => {
      mockedFetchBoostPropertyData.mockResolvedValueOnce('property' as unknown as PropertyBoostDTO);
      await startTest();
    });

    it('should return 200 status', () => {
      expect(response.status).toEqual(200);
    });

    it('should return correct payload', async () => {
      expect(await response.json()).toEqual({
        title: 'properties.boost.title',
        property: 'property',
      });
    });
  });
});
