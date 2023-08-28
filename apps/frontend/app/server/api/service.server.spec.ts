import { vitest } from 'vitest';
import { type FetchMock } from 'vitest-fetch-mock';

import { ApiService } from './service.server';
import { APILogger } from '~/server/loggers.server';

vitest.mock('~/server/loggers.server', () => ({
  APILogger: {
    info: vitest.fn(),
  },
}));

// @ts-ignore
const mockedFetch: FetchMock = global.fetch;

describe('ApiService', () => {
  const apiService = new ApiService({ debug: false });

  describe('#handleRequest', () => {
    const cookieHeader = { Cookie: 'my-cookie' };
    const request = new Request('https://example.com', { headers: cookieHeader });
    const locale = 'es';
    const params = new URLSearchParams({ foo: 'bar' });

    afterEach(() => {
      mockedFetch.mockClear();
      // @ts-ignore
      APILogger.info.mockClear();
    });

    it('handles a successful request', async () => {
      mockedFetch.mockResponseOnce(JSON.stringify({ test: 'data' }));
      const [data, response, state] = await apiService.get('/some-path', {
        request,
        locale,
        params,
      });

      const requests = mockedFetch.requests();
      const firstRequest = requests[0];
      expect(requests).toHaveLength(1);
      expect(firstRequest.url).toEqual('http://frontend-api.kyero.test/v1/some-path?foo=bar');
      expect(firstRequest.method).toEqual('GET');

      expect(firstRequest.headers.get('accept-language')).toEqual(locale);
      expect(firstRequest.headers.get('authorization')).toEqual('Bearer AUTH_KEY');
      expect(firstRequest.headers.get('content-type')).toEqual('application/json');
      expect(firstRequest.headers.get('cookie')).toEqual('my-cookie');

      expect(APILogger.info).not.toHaveBeenCalled();
      expect(data).toEqual({ test: 'data' });
      expect(response.status).toEqual(200);
      expect(state).toEqual('ok');
    });

    it('throws 500 if unknown error occurs', async () => {
      try {
        mockedFetch.mockRejectOnce(new Error('Unknown Error'));
        expect(await apiService.get('/some-path', { request, locale, params }));
        // @ts-ignore
      } catch (error: Response) {
        expect(APILogger.info).not.toHaveBeenCalled();

        expect(error).toBeInstanceOf(Response);
        expect(error.status).toEqual(500);
      }
    });

    it('returns redirection response when 302 in a correct format', async () => {
      const redirectTo = '/some/other/path';
      mockedFetch.mockResponseOnce(JSON.stringify({ to: redirectTo }), { status: 302 });
      const [data, resp, state] = await apiService.get('/some-path', { request, locale, params });

      const requests = mockedFetch.requests();
      const firstRequest = requests[0];
      expect(requests).toHaveLength(1);
      expect(firstRequest.url).toEqual('http://frontend-api.kyero.test/v1/some-path?foo=bar');
      expect(firstRequest.method).toEqual('GET');

      expect(firstRequest.headers.get('accept-language')).toEqual(locale);
      expect(firstRequest.headers.get('authorization')).toEqual('Bearer AUTH_KEY');
      expect(firstRequest.headers.get('content-type')).toEqual('application/json');
      expect(firstRequest.headers.get('cookie')).toEqual('my-cookie');

      expect(APILogger.info).not.toHaveBeenCalled();
      expect(data).toEqual({ to: redirectTo });
      expect(resp.status).toEqual(302);
      expect(state).toEqual('ok');
    });

    it('rethrows error from API if the API responds with a specific error', async () => {
      try {
        mockedFetch.mockResponseOnce(JSON.stringify({}), {
          status: 422,
          statusText: 'Unprocessable Entity',
        });
        expect(await apiService.get('/some-path', { request, locale, params }));
        // @ts-ignore
      } catch (error: Response) {
        expect(APILogger.info).not.toHaveBeenCalled();

        expect(error).toBeInstanceOf(Response);
        expect(error.status).toEqual(422);
      }
    });

    describe('when debug is true', () => {
      it('shoud log the correct message once succeeded', async () => {
        apiService.debug = true;
        mockedFetch.mockResponseOnce(JSON.stringify({ test: 'data' }));
        const [resp] = await apiService.get('/some-path', { request, locale, params });

        expect(resp).toEqual({ test: 'data' });
        expect(APILogger.info).toHaveBeenCalledTimes(1);
        expect(APILogger.info).toHaveBeenCalledWith({
          level: 'info',
          message: '/v1/some-path',
          method: 'GET',
          timing: expect.any(String),
        });
      });

      it('shoud log the error message once error occurs', async () => {
        apiService.debug = true;
        try {
          mockedFetch.mockRejectOnce(new Error('Unknown Error'));
          expect(await apiService.get('/some-path', { request, locale, params }));
          // @ts-ignore
        } catch (error: Response) {
          expect(error).toBeInstanceOf(Response);

          expect(APILogger.info).toHaveBeenCalledTimes(1);
          expect(APILogger.info).toHaveBeenLastCalledWith({
            level: 'error',
            message: '/v1/some-path',
            method: 'GET',
            timing: expect.any(String),
          });
        }
      });
    });
  });
});
