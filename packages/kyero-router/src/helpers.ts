import { URL } from 'node:url';

import type { Countries, CountryPreloadedRoute, Locales, TranslationRoute } from './types';

export function returnCountryRouteForLocale(
  route: CountryPreloadedRoute,
  locale: string,
): Record<Countries, string> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Object.entries(route).reduce((acc, [country, localeRecords]) => {
    return {
      ...acc,
      [country]: localeRecords[locale as Locales],
    };
  }, {});
}

export const routeFromConst = (locale: string, routes: TranslationRoute) =>
  routes[locale] || (routes['default'] as `/${string}`);

export const getURLWithPath = (path: `/${string}` | '', baseUrl: string) => {
  const url = new URL(baseUrl);

  if (url.pathname === '/') {
    url.pathname = path;
  } else {
    url.pathname += path;
  }

  return url.toString();
};

export const localeOrEmptyFor = (locale: string, routes: string[]): `/${string}` | '' =>
  routes.includes(locale) ? `/${locale}` : '';
