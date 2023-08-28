import { redirect, Response as RemixResponse } from '@remix-run/node';

import { userData } from '~/server/cookies';

import { ApiError, UnauthenticatedError } from './errors';
import { TOKEN } from './env';

export const getFetchHeaders = (session: string | null, locale: string) => ({
  Authorization: `Bearer ${TOKEN}`,
  'X-K-Session': session || '',
  'Accept-Language': locale,
  'Content-Type': 'application/json',
});

export const handleBackendError = async (resp: Response) => {
  if (resp.status === 401) {
    const { error } = await resp.json();

    throw new UnauthenticatedError(error);
  }
  throw new ApiError(resp.statusText, resp.status);
};

export const handleCatch = async (e: Error | UnauthenticatedError | unknown) => {
  if (e instanceof UnauthenticatedError) {
    // Redirect to the route from the API and remove user cookie with it's data
    // for ui
    throw redirect(e.message as string, {
      headers: {
        'Set-Cookie': await userData.serialize(''),
      },
    });
  }

  if (e instanceof ApiError) {
    throw new RemixResponse(e.message, { status: e.status });
  }

  throw new RemixResponse('Unexpected Error', { status: 500 });
};
