import { type ActionFunction } from '@remix-run/node';

import { getCookieHeader } from '~/common/helpers/cookie-header.server';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const nonEssentialCookies = formData.get('non_essential_cookies');
  const yearInSeconds = 24 * 60 * 60 * 365;

  const cookie = {
    name: 'non_essential_cookies',
    value: !!nonEssentialCookies,
    maxAge: yearInSeconds,
    path: '/',
    ...(process.env.NODE_ENV === 'production' && { secure: true }),
  };

  return new Response('success', {
    status: 200,
    headers: {
      'Set-Cookie': getCookieHeader(cookie),
    },
  });
};
