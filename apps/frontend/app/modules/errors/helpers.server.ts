import { json, type DataFunctionArgs } from '@remix-run/node';
import { getAppRoutes, getCountryLocalisedRoutes } from '~/server/routes-helper.server';
import { COUNTRIES } from '../homepage/country-specific/helpers';
import { LocaleFromPath } from '~/common/i18n/locale-from-path.server';
import { FALLBACK_LOCALE } from '~/i18n';

interface Props {
  context: DataFunctionArgs['context'];
  params: DataFunctionArgs['params'];
  request: DataFunctionArgs['request'];
}

export const handleErrorView =
  (status: number, statusText: string) =>
  async ({ context, request }: Props) => {
    const locale = (await LocaleFromPath.get(request)) || FALLBACK_LOCALE;
    const country = COUNTRIES.SPAIN;
    throw json(
      {
        locale,
        localizedRoutes: getCountryLocalisedRoutes(country),
        country: country,
        routeLinks: getAppRoutes({
          context,
          country,
          locale,
        }),
        // @ts-ignore
        env: context.CLIENT_ENV,
        user: null,
      },
      { status, statusText },
    );
  };

export const handleNotFound = handleErrorView(404, 'Not found');
export const handleServerError = handleErrorView(500, 'Server error');
export const handleForbidden = handleErrorView(403, 'Forbidden');
export const handleUnauthorized = handleErrorView(401, 'Unauthorized');

export const handleGenericError = (e: Error | Response | unknown) => async (args: Props) => {
  if (e instanceof Error) {
    throw await handleServerError(args);
  }

  if (e instanceof Response && isRedirectionResponse(e)) {
    return e;
  }

  throw e;
};

const isRedirectionResponse = (request: Response) => request.status >= 300 && request.status < 400;
