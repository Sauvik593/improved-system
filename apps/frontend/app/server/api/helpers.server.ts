import { ApiError, type ApiErrorMessage } from './errors.server';

export const API_SUFFIX = '/v1';

export const BASE_ROUTE = process.env.FRONTEND_API_URL || 'http://frontend-api.kyero.test:5000';
const AUTH_TOKEN = process.env.FRONTEND_API_AUTH_TOKEN || '603d658419402c4b5d36687c9cd3875c';

export const handleBackendError = async (resp: Response) => {
  const errorResponse = await resp.json();

  if (errorResponse.errors) {
    return errorResponse as ApiErrorMessage;
  }

  throw new ApiError(resp.statusText, resp.status);
};

export const handleCatch = async (e: Error | unknown) => {
  if (e instanceof ApiError) {
    throw new Response(e.message, { status: e.status });
  }

  throw new Response('Unexpected Error', { status: 500 });
};

export const getCookie = (request: Request) => request.headers.get('Cookie');

export const getFetchHeaders = (locale: string, cookie: string) => ({
  Authorization: `Bearer ${AUTH_TOKEN}`,
  'Accept-Language': locale,
  'Content-Type': 'application/json',
  Cookie: cookie,
});
