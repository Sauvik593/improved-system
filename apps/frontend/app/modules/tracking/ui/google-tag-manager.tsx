import { useEffect } from 'react';
import { useHydrated } from 'remix-utils';

import { useNonEssentialCookies } from '../hooks/use-non-essential-cookies';
import { useAppContext } from '~/common/contexts/app.context';

function loadGTMScript(gtmId: string) {
  const gtmScriptElement = document.createElement('script');
  gtmScriptElement.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  gtmScriptElement.async = true;

  window['dataLayer'] = window['dataLayer'] || [];

  // @ts-ignore
  window['dataLayer'].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  document.head.appendChild(gtmScriptElement);
}

export const GoogleTagManager = () => {
  const {
    env: { GTM_ID },
  } = useAppContext();
  const { activeNonEssentialCookies } = useNonEssentialCookies();
  const isHydrated = useHydrated();

  useEffect(() => {
    const shouldSkipScripts = !GTM_ID || !isHydrated || !activeNonEssentialCookies;

    if (shouldSkipScripts) {
      return;
    }

    if (!window.KY_CONFIG?.headScripts) {
      loadGTMScript(GTM_ID as string);
      window.KY_CONFIG.headScripts = true;
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.KY_CONFIG.headScripts = true;
      }
    };
  }, [GTM_ID, isHydrated, activeNonEssentialCookies]);

  return null;
};
