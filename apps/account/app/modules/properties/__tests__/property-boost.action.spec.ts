import 'test/__mocks__/i18next.server.mock';

import { action } from '~/modules/properties/property-boost.action.server';
import { getSession } from '~/server/session';
import { addBoostToCart } from '~/modules/properties/api/boost';

import { type MockedFunction } from 'vitest';

vi.mock('~/modules/properties/api/boost');

const mockedBoostToCart = addBoostToCart as MockedFunction<typeof addBoostToCart>;
const createRequest = (formData: FormData) => {
  return new Request('http://account.kyero.test/properties/123/boost', {
    method: 'POST',
    body: formData,
  });
};

const makeRequest = (request: Request, params: Record<string, string>) =>
  action({ request, params, context: {} });

describe('action', () => {
  const propertyId = '1111';

  let params: Record<string, string> = { id: propertyId };
  let request: Request;
  let response: Response;
  let formData: FormData = new FormData();

  async function startTest() {
    request = createRequest(formData);
    response = await makeRequest(request, params);
  }

  afterEach(() => {
    formData = new FormData();
  });

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

  describe('when prime_boost is not present', () => {
    beforeAll(async () => {
      await startTest();
    });

    it('should return 422 status', () => {
      expect(response.status).toEqual(422);
    });

    it('should return valid error', async () => {
      expect(await response.json()).toEqual({
        fieldErrors: {
          prime_boosts: 'validation.primeBoosts.addToCart.minLocationType',
        },
      });
    });
  });

  describe('when api responds ok', () => {
    const cityId = '123';
    const provinceId = '345';

    beforeAll(async () => {
      // eslint-disable-next-line
      mockedBoostToCart.mockResolvedValue({} as unknown as any);

      formData.append('prime_boosts[city][location_id]', cityId);
      formData.append('prime_boosts[province][location_id]', provinceId);
      await startTest();
    });

    it('should return 302', async () => {
      expect(response.status).toEqual(302);
    });

    it('should set flash', async () => {
      const cookie = response.headers.get('Set-Cookie');
      const session = await getSession(cookie);

      expect(session.get('flash')).toEqual(
        expect.objectContaining({
          id: expect.anything(),
          message: 'primeBoosts.addToCart.successFlash.message',
          type: 'success',
          link: { to: '/cart', message: 'primeBoosts.addToCart.successFlash.linkTo' },
        }),
      );
    });
  });

  describe('when api responds with error', () => {
    const cityId = '123';
    const provinceId = '345';

    beforeAll(async () => {
      mockedBoostToCart.mockRejectedValue({ message: 'Something went wrong' });

      formData.append('prime_boosts[city][location_id]', cityId);
      formData.append('prime_boosts[province][location_id]', provinceId);
      await startTest();
    });

    it('should return 200', async () => {
      expect(response.status).toEqual(200);
    });

    it('should set flash with error message', async () => {
      const cookie = response.headers.get('Set-Cookie');
      const session = await getSession(cookie);

      expect(session.get('flash')).toEqual(
        expect.objectContaining({
          id: expect.anything(),
          message: 'primeBoosts.addToCart.errorFlash.message',
          type: 'info',
        }),
      );
    });
  });
});
