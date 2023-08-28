import { useEffect, useRef } from 'react';
import { useHydrated } from 'remix-utils';

import ENV from '~/common/env';
import { useNonEssentialCookies } from '../hooks/use-non-essential-cookies';

const SCRIPTS = [
  {
    src: `https://www.clarity.ms/tag/_key_`,
    key: ENV.CLARITY_ID,
    active: !!ENV.CLARITY_ID,
    beforeLoad: () => {
      // @ts-ignore
      window['clarity'] =
        window['clarity'] ||
        function () {
          // @ts-ignore
          (window['clarity'].q = window['clarity'].q || []).push(arguments);
        };
    },
  },
  { src: `//js.hs-scripts.com/_key_.js`, key: ENV.HUBSPOT_ID, active: !!ENV.HUBSPOT_ID },
  {
    src: `//_key_.cloudfront.net/entudkwe.js`,
    key: ENV.FRESHRELEVANCE_ID,
    active: !!ENV.FRESHRELEVANCE_ID,
  },
  { src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', key: null, active: true },
];

export function loadScripts(scripts = SCRIPTS) {
  scripts.forEach((script) => {
    if (!script.active) {
      return;
    }

    if (script.beforeLoad) {
      script.beforeLoad();
    }

    const src = script.key ? script.src.replace('_key_', script.key) : script.src;
    const scriptEl = document.createElement('script');
    scriptEl.src = src;
    scriptEl.async = true;
    scriptEl.defer = true;
    document.body.appendChild(scriptEl);
  });
}

export const NonEssentialScripts = () => {
  const { activeNonEssentialCookies } = useNonEssentialCookies();
  const isHydrated = useHydrated();
  const isDone = useRef(false);

  useEffect(() => {
    if (isDone.current) {
      return;
    }

    if (isHydrated && activeNonEssentialCookies) {
      loadScripts();
      isDone.current = true;
    }
  }, [isHydrated, activeNonEssentialCookies]);

  return null;
};
