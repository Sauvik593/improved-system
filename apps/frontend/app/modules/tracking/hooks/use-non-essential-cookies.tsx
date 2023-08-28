import { useMemo } from 'react';
import { useMatches } from '@remix-run/react';

import type { RootLoaderType } from '~/root.loader.server';

export const useNonEssentialCookies = () => {
  const matches = useMatches();

  const nonEssentialCookies = useMemo(() => {
    const rootLoader = matches.find((route) => route.id === 'root');
    const loaderData = rootLoader?.data as RootLoaderType;

    if (!loaderData) {
      return null;
    }

    return loaderData.nonEssentialCookies;
  }, [matches]);

  const activeNonEssentialCookies = nonEssentialCookies === 'true';
  const showCookieBar = nonEssentialCookies === null || typeof nonEssentialCookies === 'undefined';

  const KY_CONFIG = {
    nonEssentialCookies: activeNonEssentialCookies,
    bodyScripts: false,
    headScripts: false,
  };

  return { activeNonEssentialCookies, showCookieBar, nonEssentialCookies, KY_CONFIG };
};
