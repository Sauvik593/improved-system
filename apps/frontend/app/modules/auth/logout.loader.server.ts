import { type LoaderFunction, redirect } from '@remix-run/node';
import { LocaleFromPath } from '~/common/i18n/locale-from-path.server';
import { FALLBACK_LOCALE } from '~/i18n';
import { apiService } from '~/server/api/service.server';

export const loader: LoaderFunction = async ({ request, context }) => {
  const locale = (await LocaleFromPath.get(request)) || FALLBACK_LOCALE;
  const referer = request.headers.get('referer') || context.SERVER_ENV.BASE_URL;

  const redirectTo = new URL(referer).pathname;

  const [, response] = await apiService.delete(`/users/sign_out`, { request, locale });
  const cookie = response.headers.get('set-cookie');

  return redirect(redirectTo, { headers: { 'set-cookie': cookie || '' } });
};
