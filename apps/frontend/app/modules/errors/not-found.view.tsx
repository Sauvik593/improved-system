import { Scripts, ScrollRestoration } from '@remix-run/react';
import { SSRProvider } from 'react-aria';
import { AppContextProvider } from '~/common/contexts/app.context';
import { ModalsContextProvider } from '~/common/contexts/modals.context';

import { useNonEssentialCookies } from '../tracking/hooks/use-non-essential-cookies';
import { ErrorLayout } from './error.layout';
import { createHeadSSR } from './head-helper';

export const NotFoundView = ({ caught }: { caught: any }) => {
  const { data, status } = caught;
  const { KY_CONFIG } = useNonEssentialCookies();

  return (
    <AppContextProvider {...data}>
      <ModalsContextProvider>
        <SSRProvider>
          <NotFoundHead />
          <ErrorLayout status={status} message="common.errors.error_404" />
          <ScrollRestoration />
          <Scripts />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV=${JSON.stringify(data.env)};window.KY_CONFIG=${JSON.stringify(
                KY_CONFIG,
              )}`,
            }}
          />
        </SSRProvider>
      </ModalsContextProvider>
    </AppContextProvider>
  );
};

export const NotFoundHead = createHeadSSR('common.errors.error_404', 'not-found');
