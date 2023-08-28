import { createCookieSessionStorage } from '@remix-run/node'; // or cloudflare/deno

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: '_remix_session',
    sameSite: 'lax',
    secure: process.env['NODE_ENV'] === 'production',
  },
});

export { getSession, commitSession, destroySession };
