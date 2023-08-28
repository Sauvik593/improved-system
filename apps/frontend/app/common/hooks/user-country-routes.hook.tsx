import { useMatches } from '@remix-run/react';

export const useCountryRoutes = () => {
  const matches = useMatches();
  const rootMatch = matches.find((match) => match.id === 'root');
  const routeMatch = matches.find((match) => match.data?.data?.country);
  const routeLinksMatch = matches.find((match) => !!match.data?.routeLinks);
  const localizedRoutes = matches.find((match) => !!match.data?.localizedRoutes);

  return {
    rootMatch,
    routeMatch,
    routeLinksMatch,
    localizedRoutes,
  };
};
