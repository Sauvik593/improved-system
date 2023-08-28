import { LoaderFunction, redirect } from '@remix-run/node';

import { lngCookie } from '~/server/cookies';
import { getUrlFromRequest } from '~/server/helpers';

export const loader: LoaderFunction = async ({ request }) => {
  const url = getUrlFromRequest(request);
  const locale = url.searchParams.get('locale') as string;
  const redirectUrl = url.searchParams.get('redirect') as string;

  return redirect(redirectUrl, {
    headers: {
      'Set-Cookie': await lngCookie.serialize(locale),
    },
  });
};
