import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react';

import { captureRemixErrorBoundaryError } from '@sentry/remix';
import { createHead } from 'remix-island';
import { SSRProvider } from 'react-aria';
import { Provider } from 'react-wrap-balancer';
import { DynamicLinks } from 'remix-utils';

import { type LoaderFunction } from '@remix-run/node';

import { AppContextProvider } from './common/contexts/app.context';

import { BaseLayout } from '~/common/ui/base-layout';
import { RootLoader } from '~/root.loader.server';
import { NonEssentialScripts } from './modules/tracking/ui/non-essential-scripts';

import { GoogleTagManager } from './modules/tracking/ui/google-tag-manager';
import { GoogleTagManagerNoScript } from './modules/tracking/ui/google-tag-manager-noscript';
import { ModalsContextProvider } from './common/contexts/modals.context';

import { useRootApp } from './common/hooks/use-root-app.hook';
import { useNonEssentialCookies } from './modules/tracking/hooks/use-non-essential-cookies';

import { ClientErrorView } from './modules/errors/unexpected.view';
import { ErrorViews } from './modules/errors';
import { usePageView } from './modules/tracking/hooks/use-pageview';

export const loader: LoaderFunction = async (args) => {
  const root = new RootLoader(args);
  return await root.handle();
};

export const Head = createHead(
  () => {
    return (
      <>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <DynamicLinks />
      </>
    );
  },
  { id: 'base' },
);

export const App = () => {
  const { country, locale, localizedRoutes, env, user, routeLinks } = useRootApp();
  const { KY_CONFIG } = useNonEssentialCookies();

  usePageView();

  return (
    <AppContextProvider
      country={country}
      locale={locale}
      localizedRoutes={localizedRoutes}
      env={env}
      user={user}
      routeLinks={routeLinks}
    >
      <ModalsContextProvider>
        <SSRProvider>
          <Provider>
            <Head />
            <GoogleTagManager />
            <GoogleTagManagerNoScript />
            <BaseLayout />
            <ScrollRestoration />
            <Scripts />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.ENV=${JSON.stringify(env)};window.KY_CONFIG=${JSON.stringify(
                  KY_CONFIG,
                )};window.KY_ROOT_DATA=${JSON.stringify(useRootApp())};`,
              }}
            />
            <NonEssentialScripts />
            {process.env.NODE_ENV === 'development' && <LiveReload />}
          </Provider>
        </SSRProvider>
      </ModalsContextProvider>
    </AppContextProvider>
  );
};

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status !== 404) {
      captureRemixErrorBoundaryError(error);
    }

    const View = ErrorViews[error.status as keyof typeof ErrorViews] || ErrorViews['DEFAULT'];

    return <View caught={error} />;
  }

  if (typeof window !== 'undefined') {
    captureRemixErrorBoundaryError(error);
    return <ClientErrorView {...window.KY_ROOT_DATA} />;
  }
}

export default App;

export const handle = {
  i18n: 'common',
};
