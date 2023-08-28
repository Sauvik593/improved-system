import 'test/__mocks__/i18next.server.mock';
import { Response as RemixResponse } from '@remix-run/node';

import { action } from '~/modules/cart/server/cart-index.action';
import { getSession } from '~/server/session';
import { checkoutCart, clearCheckout, removePrimeBoostFromCart } from '~/modules/cart/api';

import { type MockedFunction } from 'vitest';

vi.mock('~/modules/cart/api');

const mockedCheckoutCart = checkoutCart as MockedFunction<typeof checkoutCart>;
const mockedClearCheckout = clearCheckout as MockedFunction<typeof clearCheckout>;
const mockedRemovePrimeBoostFromCart = removePrimeBoostFromCart as MockedFunction<
  typeof removePrimeBoostFromCart
>;
const createRequest = (formData: FormData, method: 'POST' | 'DELETE' = 'POST') => {
  return new Request('http://account.kyero.test/cart', {
    method,
    body: formData,
  });
};

const makeRequest = (request: Request, params: Record<string, string>) =>
  action({ request, params, context: {} });

describe('action', () => {
  let request: Request;
  let response: Response;
  let formData: FormData = new FormData();

  async function startTest(method = 'POST') {
    request = createRequest(formData, method);
    response = await makeRequest(request, {});
  }

  afterEach(() => {
    formData = new FormData();
  });

  describe('invalid action', () => {
    beforeAll(() => {
      formData.append('action', 'wrong');
      startTest();
    });

    it('should return 422 status', () => {
      expect(response.status).toEqual(422);
    });

    it('should return error flash message', async () => {
      const cookie = response.headers.get('Set-Cookie');
      const session = await getSession(cookie);

      expect(session.get('flash')).toEqual(
        expect.objectContaining({
          id: expect.anything(),
          message: `Invalid enum value. Expected 'remove' | 'checkout' | 'clear', received 'wrong'`,
          type: 'info',
        }),
      );
    });
  });

  describe('checkout', () => {
    describe('when success', () => {
      beforeAll(async () => {
        formData.append('action', 'checkout');
        mockedCheckoutCart.mockResolvedValueOnce({ message: 'ok' });
        await startTest();
      });

      it('should return 200 status', () => {
        expect(response.status).toEqual(200);
      });

      it('should return success flash message', async () => {
        const cookie = response.headers.get('Set-Cookie');
        const session = await getSession(cookie);

        expect(session.get('flash')).toEqual(
          expect.objectContaining({
            id: expect.anything(),
            message: 'ui.cart.checkoutAction.success',
            type: 'success',
          }),
        );
      });
    });

    describe('when 404 returned from API', () => {
      beforeAll(async () => {
        formData.append('action', 'checkout');
        mockedCheckoutCart.mockRejectedValueOnce(new RemixResponse('', { status: 404 }));
        await startTest();
      });

      it('should return 404 status', () => {
        expect(response.status).toEqual(404);
      });

      it('should return error flash message for not found', async () => {
        const cookie = response.headers.get('Set-Cookie');
        const session = await getSession(cookie);

        expect(session.get('flash')).toEqual(
          expect.objectContaining({
            id: expect.anything(),
            message: 'ui.cart.checkoutAction.notFound',
            type: 'info',
          }),
        );
      });
    });
    describe('when unknown error from API', () => {
      beforeAll(async () => {
        formData.append('action', 'checkout');
        mockedCheckoutCart.mockRejectedValueOnce(new RemixResponse('', { status: 500 }));
        await startTest();
      });

      it('should return 422 status', () => {
        expect(response.status).toEqual(422);
      });

      it('should return generic error flash message', async () => {
        const cookie = response.headers.get('Set-Cookie');
        const session = await getSession(cookie);

        expect(session.get('flash')).toEqual(
          expect.objectContaining({
            id: expect.anything(),
            message: 'ui.cart.checkoutAction.error',
            type: 'info',
          }),
        );
      });
    });
  });
  describe('clear checkout', () => {
    describe('when success', () => {
      beforeAll(async () => {
        formData.append('action', 'clear');
        mockedClearCheckout.mockResolvedValueOnce({ message: 'ok' });
        await startTest('DELETE');
      });

      it('should return 200 status', () => {
        expect(response.status).toEqual(200);
      });

      it('should return success flash message', async () => {
        const cookie = response.headers.get('Set-Cookie');
        const session = await getSession(cookie);

        expect(session.get('flash')).toEqual(
          expect.objectContaining({
            id: expect.anything(),
            message: 'ui.cart.clearAction.success',
            type: 'success',
          }),
        );
      });
    });
    describe('when error', () => {
      beforeAll(async () => {
        formData.append('action', 'clear');
        mockedClearCheckout.mockRejectedValueOnce(new RemixResponse('', { status: 500 }));
        await startTest();
      });

      it('should return 422 status', () => {
        expect(response.status).toEqual(422);
      });

      it('should return generic error flash message', async () => {
        const cookie = response.headers.get('Set-Cookie');
        const session = await getSession(cookie);

        expect(session.get('flash')).toEqual(
          expect.objectContaining({
            id: expect.anything(),
            message: 'ui.cart.clearAction.error',
            type: 'info',
          }),
        );
      });
    });
  });

  describe('remove prime boost', () => {
    describe('when success', () => {
      beforeAll(async () => {
        formData.append('id', '123');
        formData.append('action', 'remove');
        mockedClearCheckout.mockResolvedValueOnce({ message: 'ok' });
        await startTest();
      });

      it('should return 200 status', () => {
        expect(response.status).toEqual(200);
      });

      it('should return success flash message', async () => {
        const cookie = response.headers.get('Set-Cookie');
        const session = await getSession(cookie);

        expect(session.get('flash')).toEqual(
          expect.objectContaining({
            id: expect.anything(),
            message: 'ui.cart.removeAction.success',
            type: 'success',
          }),
        );
      });
    });

    describe('when there are missing params', () => {
      beforeAll(async () => {
        formData.append('id', '');
        formData.append('action', 'remove');
        mockedClearCheckout.mockResolvedValueOnce({ message: 'ok' });
        await startTest();
      });

      it('should return 422 status', () => {
        expect(response.status).toEqual(422);
      });

      it('should return error validation flash message', async () => {
        const cookie = response.headers.get('Set-Cookie');
        const session = await getSession(cookie);

        expect(session.get('flash')).toEqual(
          expect.objectContaining({
            id: expect.anything(),
            message: 'validation.primeBoosts.removeFromCart.id',
            type: 'info',
          }),
        );
      });
    });

    describe('when error is 404', () => {
      beforeAll(async () => {
        formData.append('id', '123');
        formData.append('action', 'remove');
        mockedRemovePrimeBoostFromCart.mockRejectedValueOnce(
          new RemixResponse('', { status: 404 }),
        );
        await startTest();
      });

      it('should return 404 status', () => {
        expect(response.status).toEqual(404);
      });

      it('should return success flash message', async () => {
        const cookie = response.headers.get('Set-Cookie');
        const session = await getSession(cookie);

        expect(session.get('flash')).toEqual(
          expect.objectContaining({
            id: expect.anything(),
            message: 'ui.cart.checkoutAction.notFound',
            type: 'info',
          }),
        );
      });
    });
    describe('when error comes from API', () => {
      beforeAll(async () => {
        formData.append('id', '123');
        formData.append('action', 'remove');
        mockedRemovePrimeBoostFromCart.mockRejectedValueOnce(
          new RemixResponse('', { status: 422 }),
        );
        await startTest();
      });

      it('should return api status', () => {
        expect(response.status).toEqual(422);
      });

      it('should return generic error flash message', async () => {
        const cookie = response.headers.get('Set-Cookie');
        const session = await getSession(cookie);

        expect(session.get('flash')).toEqual(
          expect.objectContaining({
            id: expect.anything(),
            message: 'ui.cart.removeAction.error',
            type: 'info',
          }),
        );
      });
    });
  });
});
