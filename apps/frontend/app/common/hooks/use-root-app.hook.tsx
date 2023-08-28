import { useLoaderData } from '@remix-run/react';
import { DEFAULT_LOCALE } from '~/i18n';

import { useCountryRoutes } from './user-country-routes.hook';
import { type ServerCountry } from '~/modules/homepage/country-specific/helpers';
import { type RootLoaderType } from '~/root.loader.server';
import { type RouteLinks } from '~/server/base-loader/base-loader.server';

// Use this component only in root.
export const useRootApp = () => {
  const { env, user } = useLoaderData<RootLoaderType>();
  const { rootMatch, routeMatch, routeLinksMatch, localizedRoutes } = useCountryRoutes();

  const country = routeMatch?.data?.data?.country as ServerCountry | null;
  const locale = routeMatch?.data?.locale || rootMatch?.data?.locale || DEFAULT_LOCALE;

  return {
    country,
    locale,
    env,
    user,
    localizedRoutes: localizedRoutes?.data?.localizedRoutes || [],
    routeLinks: routeLinksMatch?.data?.routeLinks as RouteLinks,
  };
};

export type RootAppTypeProps = ReturnType<typeof useRootApp>;
