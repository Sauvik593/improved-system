import { SSRProvider } from 'react-aria';

import { AppContextProvider } from '~/common/contexts/app.context';
import { useNonEssentialCookies } from '../tracking/hooks/use-non-essential-cookies';
import { ModalsContextProvider } from '~/common/contexts/modals.context';
import { ErrorLayout } from './error.layout';
import { Scripts, ScrollRestoration } from '@remix-run/react';
import { createHeadSSR } from './head-helper';

export const ForbiddenErrorView = ({ caught }: { caught: any }) => {
  const { data, status } = caught;
  const { KY_CONFIG } = useNonEssentialCookies();

  return (
    <AppContextProvider {...data}>
      <ModalsContextProvider>
        <SSRProvider>
          <ForbiddenErrorHead />
          <ErrorLayout status={status as number} message="common.errors.error_403" />
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

export const ForbiddenErrorHead = createHeadSSR('common.errors.error_403', 'forbidden');
