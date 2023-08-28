import { LoaderFunction, type V2_MetaFunction, json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from '@remix-run/react';
import { useChangeLanguage } from './client/use-change-language';
import { withSentry } from '@sentry/remix';

import { BaseLayout } from './components/base-layout';
import { NavigationContextProvider } from './components/base-layout/navigation.context';
import { getLocale } from './server/helpers';
import { userData } from './server/cookies';

import { fetchMe } from './modules/me/api';
import { type Me } from './modules/me/types';
import { getFlashMessage } from './modules/flash/helpers.server';
import { ENV } from './config.server';
import { createHead } from 'remix-island';

export type Flash = {
  id: string;
  message: string;
  type: 'success' | 'info';
  link?: {
    to: string;
    message: string;
  };
};

export type RootLoaderData = {
  locale: string;
  me: Me;
  flash: Flash | null;
  env: string;
};

export function links() {
  return [
    {
      rel: 'icon',
      href: 'favicons/favicon-16x16.png',
      type: 'image/png',
    },
    {
      rel: 'icon',
      href: 'favicons/favicon-32x32.png',
      type: 'image/png',
    },
  ];
}

export const meta: V2_MetaFunction = () => [
  {
    title: 'Agent Admin',
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  const me = await fetchMe(request);
  const locale = await getLocale(request);
  const { flash, commitedSession } = await getFlashMessage(request);

  const headers = new Headers();
  headers.append('Set-Cookie', commitedSession);
  headers.append('Set-Cookie', await userData.serialize(me));

  return json(
    { locale, me, flash, env: JSON.stringify(ENV) },
    {
      headers,
    },
  );
};

export const Head = createHead(() => (
  <>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <Meta />
    <Links />
  </>
));

function App() {
  const { locale, env } = useLoaderData<RootLoaderData>();

  useChangeLanguage(locale);

  return (
    <>
      <Head />
      <NavigationContextProvider>
        <BaseLayout />
      </NavigationContextProvider>
      <ScrollRestoration />
      <Scripts />
      <script dangerouslySetInnerHTML={{ __html: `window.ENV=${env};` }}></script>
      {process.env.NODE_ENV === 'development' && <LiveReload />}
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>Error!</h1>
      <p>{error.message}</p>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div>
      <h1>Oh no!</h1>
      <p>{caught.status}</p>
    </div>
  );
}

export const handle = {
  i18n: 'common',
};

export default withSentry(App, { wrapWithErrorBoundary: true });
