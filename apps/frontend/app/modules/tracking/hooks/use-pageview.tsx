import { useEffect } from 'react';
import { useNonEssentialCookies } from './use-non-essential-cookies';
import { pageView } from '../instrument';
import { useLocation } from '@remix-run/react';

export const usePageView = () => {
  const location = useLocation();
  const { nonEssentialCookies } = useNonEssentialCookies();

  useEffect(() => {
    if (nonEssentialCookies) {
      pageView(location.pathname);
    }
  }, [location, nonEssentialCookies]);
};
