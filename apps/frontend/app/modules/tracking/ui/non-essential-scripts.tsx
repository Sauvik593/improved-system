import { useEffect } from 'react';
import { useHydrated } from 'remix-utils';
import { useNonEssentialCookies } from '../hooks/use-non-essential-cookies';
import { useAppContext } from '~/common/contexts/app.context';

interface ScriptPayload {
  src: string;
  key?: string;
  active: boolean;
  beforeLoad?: () => void;
}

export function loadScripts(scripts: ScriptPayload[]) {
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
  const {
    env: { CLARITY_ID, HUBSPOT_ID },
  } = useAppContext();

  useEffect(() => {
    const SCRIPTS: ScriptPayload[] = [
      {
        src: `https://www.clarity.ms/tag/_key_`,
        key: CLARITY_ID,
        active: !!CLARITY_ID,
        beforeLoad: () => {
          if (typeof window === 'undefined') {
            return;
          }
          // @ts-ignore
          window['clarity'] =
            window['clarity'] ||
            function () {
              // @ts-ignore
              (window['clarity'].q = window['clarity'].q || []).push(arguments);
            };
        },
      },
      { src: `//js.hs-scripts.com/_key_.js`, key: HUBSPOT_ID, active: !!HUBSPOT_ID },
      { src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', key: null, active: true },
    ];

    if (!isHydrated || !activeNonEssentialCookies) {
      return;
    }

    if (!window.KY_CONFIG?.bodyScripts) {
      loadScripts(SCRIPTS);
      window.KY_CONFIG.bodyScripts = true;
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.KY_CONFIG.bodyScripts = true;
      }
    };
  }, [isHydrated, activeNonEssentialCookies, CLARITY_ID, HUBSPOT_ID]);

  return null;
};
