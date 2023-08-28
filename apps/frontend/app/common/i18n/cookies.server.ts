import { createCookie } from '@remix-run/node';

export const lngCookie = createCookie('lng', {
  maxAge: 31_536_000, // one year,
  sameSite: 'lax',
  httpOnly: true,
});
