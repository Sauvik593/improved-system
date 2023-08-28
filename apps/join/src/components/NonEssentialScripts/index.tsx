import { useContext, useEffect, useRef } from 'react';

import { CookieContext } from '@contexts/CookieContext';

const SCRIPTS = [
  {
    src: `https://www.clarity.ms/tag/_key_`,
    key: '123',
    active: true,
    beforeLoad: () => {
      // eslint-disable-next-line
      // @ts-ignore
      window['clarity'] =
        // eslint-disable-next-line
        // @ts-ignore
        window['clarity'] ||
        function () {
          // eslint-disable-next-line
          // @ts-ignore
          (window['clarity'].q = window['clarity'].q || []).push(args);
        };
    },
  },
  { src: `//js.hs-scripts.com/_key_.js`, key: '123', active: true },
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
  const { nonEssentialCookies } = useContext(CookieContext);
  const isDone = useRef(false);

  useEffect(() => {
    if (!nonEssentialCookies) {
      return;
    }

    if (isDone.current) {
      return;
    }

    if (!isDone.current && nonEssentialCookies) {
      loadScripts();
      isDone.current = true;
    }
  }, [isDone, nonEssentialCookies]);

  return null;
};
