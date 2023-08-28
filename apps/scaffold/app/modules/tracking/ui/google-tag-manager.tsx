import { useEffect, useRef } from 'react';
import { useHydrated } from 'remix-utils';

import ENV from '~/common/env';
import { useNonEssentialCookies } from '../hooks/use-non-essential-cookies';

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
  const { activeNonEssentialCookies } = useNonEssentialCookies();
  const isHydrated = useHydrated();
  const isDone = useRef(false);

  const shouldSkipScripts =
    !ENV.GTM_ID || !isHydrated || !activeNonEssentialCookies || isDone.current;

  useEffect(() => {
    if (shouldSkipScripts) {
      return;
    }

    loadGTMScript(ENV.GTM_ID as string);
    isDone.current = true;
  }, [shouldSkipScripts]);

  return null;
};
