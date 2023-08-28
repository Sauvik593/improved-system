import { join } from 'path';

import { getLocale, getCookies } from '~/server/helpers';
import { getSessionCookie } from '~/server/cookies';

import { getFetchHeaders, handleBackendError, handleCatch } from './helpers';
import { BASE_ROUTE } from './env';

const API_SUFFIX = '/v1';

export const makeApiCall =
  <T>(route: string, config: RequestInit | undefined = {}) =>
  async (request: Request) => {
    const locale = await getLocale(request);
    const sessionCookie = getSessionCookie(getCookies(request)) as string;
    const url = new URL(join(API_SUFFIX, route), BASE_ROUTE);

    try {
      const resp = await fetch(new URL(url), {
        ...config,
        headers: getFetchHeaders(sessionCookie, locale),
      });

      if (!resp.ok) {
        await handleBackendError(resp);
      }

      const data = await resp.json();

      return data as T;
    } catch (e) {
      return handleCatch(e);
    }
  };
