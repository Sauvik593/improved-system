import { type RootAppTypeProps } from '~/common/hooks/use-root-app.hook';
import { type SERVER_ENV_SCHEMA, type CLIENT_ENV_SCHEMA } from './env.server';
import { type KyeroRouter } from '@kyero/router';

declare module '@remix-run/server-runtime' {
  export interface AppLoadContext {
    SERVER_ENV: ReturnType<typeof SERVER_ENV_SCHEMA.parse>;
    CLIENT_ENV: ReturnType<typeof CLIENT_ENV_SCHEMA.parse>;
    KyeroRouter: KyeroRouter;
  }
}

declare global {
  interface Window {
    ENV: ReturnType<typeof CLIENT_ENV_SCHEMA.parse>;
    dataLayer: unknown[] | undefined;
    clarity?: () => {
      q: any[];
    };
    KY_CONFIG: {
      nonEssentialCookies: boolean;
      bodyScripts: boolean;
      headScripts: boolean;
    };
    KY_ROOT_DATA: RootAppTypeProps;
    Trustpilot:
      | {
          loadFromElement: (element: HTMLElement, predicate: boolean) => void;
        }
      | undefined;
  }
}

/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />
