import { ifElse, isNil } from 'ramda';

import { createCookie } from '@remix-run/node';

export const lngCookie = createCookie('lng', {
  maxAge: 31_536_000, // one year,
  sameSite: 'lax',
  httpOnly: true,
});

export const userData = createCookie('_u', {
  maxAge: 86_400, // one day
  sameSite: 'lax',
  httpOnly: true,
});

export const parseSingleCookie = (cookieName: string) => (cookieString: string) => {
  return cookieString
    .split(';')
    .find((cookie: string) => cookie.includes(cookieName))
    ?.split('=')[1];
};

export const getExternalCookie = (cookieName: string) => (cookieString: string | null) =>
  ifElse(isNil, () => '', parseSingleCookie(cookieName))(cookieString as string);

export const getSessionCookie = getExternalCookie('_k_new_session');
