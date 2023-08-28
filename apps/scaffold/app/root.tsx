import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from '@remix-run/react';
import { createHead } from 'remix-island';
import { SSRProvider } from 'react-aria';
import { DynamicLinks } from 'remix-utils';
import { type V2_MetaFunction, type LoaderFunction } from '@remix-run/node';

import { BaseLayout } from '~/common/ui/base-layout';
import { RootLoader, type RootLoaderType } from '~/root.loader.server';
import { NonEssentialScripts } from './modules/tracking/ui/non-essential-scripts';

import { GoogleTagManager } from './modules/tracking/ui/google-tag-manager';
import { GoogleTagManagerNoScript } from './modules/tracking/ui/google-tag-manager-noscript';

export const loader: LoaderFunction = async (args) => new RootLoader(args).handle();
export const meta: V2_MetaFunction<{}> = ({ data }) => [];

export const Head = createHead(() => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <GoogleTagManager />
      <Meta />
      <Links />
      <DynamicLinks />
    </>
  );
});

export const App = () => {
  const { env } = useLoaderData<RootLoaderType>();
  return (
    <SSRProvider>
      <Head />
      <GoogleTagManagerNoScript />
      <BaseLayout />
      <ScrollRestoration />
      <Scripts />
      <script dangerouslySetInnerHTML={{ __html: `window.ENV=${JSON.stringify(env)};` }}></script>
      <NonEssentialScripts />
      {process.env.NODE_ENV === 'development' && <LiveReload />}
    </SSRProvider>
  );
};

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

export default App;

export const handle = {
  i18n: 'common',
};
