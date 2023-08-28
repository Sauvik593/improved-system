import { useLocation, useNavigation } from '@remix-run/react';
import { createContext, useContext, useEffect, useState } from 'react';

import { MOBILE_BREAKPOINT } from './constants';

import type { Context } from 'react';

export interface NavigationContextProps {
  mobileMenuActive: boolean;
  layoutExpanded: boolean;
  toggleState: () => void;
  closeMobile: () => void;
}

export const NavigationContext = createContext<NavigationContextProps | null>(null);

const isMobile = () => window.innerWidth < MOBILE_BREAKPOINT;

export const NavigationContextProvider = (props: { children: React.ReactNode }) => {
  const { location } = useNavigation();
  const { pathname } = useLocation();

  const [mobileMenuActive, setMobileMenu] = useState<boolean>(false);
  const [layoutExpanded, setLayout] = useState<boolean>(true);
  const closeMobile = () => setMobileMenu(false);

  // Close mobile menu when route changes
  useEffect(() => {
    if (location?.pathname !== pathname && isMobile()) {
      closeMobile();
    }
  }, [location, pathname]);

  const toggleState = () => {
    isMobile() ? setMobileMenu(!mobileMenuActive) : setLayout(!layoutExpanded);
  };

  return (
    <NavigationContext.Provider
      value={{ mobileMenuActive, layoutExpanded, toggleState, closeMobile }}
    >
      {props.children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () =>
  useContext(NavigationContext as Context<NavigationContextProps>);
