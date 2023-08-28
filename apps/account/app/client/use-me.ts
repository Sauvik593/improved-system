import { useMemo } from 'react';
import { useMatches } from '@remix-run/react';

import type { RootLoaderData } from '~/root';

export const useMe = () => {
  const matches = useMatches();

  const me = useMemo(() => {
    const rootLoader = matches.find((route) => route.id === 'root');
    const loaderData = rootLoader?.data as RootLoaderData;

    if (!loaderData) {
      return null;
    }

    return loaderData.me;
  }, [matches]);

  return { me };
};
