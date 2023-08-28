import { SSRProvider } from 'react-aria';
import { AppContextProvider } from '~/common/contexts/app.context';
import { ModalsContextProvider } from '~/common/contexts/modals.context';
import { type RootAppTypeProps } from '~/common/hooks/use-root-app.hook';

import { GoogleTagManager } from '../tracking/ui/google-tag-manager';
import { GoogleTagManagerNoScript } from '../tracking/ui/google-tag-manager-noscript';
import { Scripts, ScrollRestoration } from '@remix-run/react';
import { ErrorLayout } from './error.layout';
import { createHeadSSR } from './head-helper';

// Error boundary for client-side errors
export const ClientErrorView = (rootAppData: RootAppTypeProps) => {
  return (
    // @ts-ignore
    <AppContextProvider {...rootAppData}>
      <ModalsContextProvider>
        <SSRProvider>
          <ClientErrorHead />
          <GoogleTagManager />
          <GoogleTagManagerNoScript />
          <ErrorLayout message="common.errors.error_client" />
          <ScrollRestoration />
          <Scripts />
        </SSRProvider>
      </ModalsContextProvider>
    </AppContextProvider>
  );
};

export const ClientErrorHead = createHeadSSR('common.errors.error_client', 'client-error');
