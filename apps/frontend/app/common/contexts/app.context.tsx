import upperFirst from 'lodash/upperFirst';
import { createContext, useContext, type Context, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { type ServerCountry } from '~/modules/homepage/country-specific/helpers';
import { type RootLoaderType } from '~/root.loader.server';

import { type User } from '~/modules/auth/types';
import { type LoaderResponse } from '~/server/base-loader/base-loader.server';
import { type CountryKey, SPAIN_KEY } from '../helpers/shared-constants';

export interface AppContextProps {
  country: ServerCountry | null;
  forSaleRoute: string | null;
  countryName: string;
  locale: string;
  localizedRoutes: { locale: string; path: string }[];
  env: RootLoaderType['env'];
  user: User | null;
  routeLinks: LoaderResponse<{}>['routeLinks'];
  countryKey: CountryKey;
  adviceLink: string | null;
  buyersGuideAvailable: boolean;
}

export interface AppContextProviderProps {
  children: React.ReactNode;
  country: ServerCountry | null;
  locale: string;
  localizedRoutes: { locale: string; path: string }[];
  env: RootLoaderType['env'];
  user: User | null;
  routeLinks: LoaderResponse<{}>['routeLinks'];
}

// @ts-ignore
export const AppContext = createContext<AppContextProps | null>({ env: {}, country: null });

export function useChangeLanguage(locale: string) {
  let { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);
}

export const AppContextProvider = ({
  localizedRoutes,
  locale,
  country,
  env,
  user,
  children,
  routeLinks,
}: AppContextProviderProps) => {
  const forSaleRoute = country?.localizedForSaleRoutes[locale] || null;
  const countryName = upperFirst(country?.translations[locale] || '');
  const countryKey = country?.key || SPAIN_KEY;
  const adviceLink = country?.adviceLinks[locale] || null;
  const buyersGuideLanguages = country?.buyersGuideLanguages || [];
  const buyersGuideAvailable = !!buyersGuideLanguages.find((l) => l === locale) || false;

  useChangeLanguage(locale);

  return (
    <AppContext.Provider
      value={{
        country,
        locale,
        forSaleRoute,
        countryName,
        localizedRoutes,
        routeLinks,
        adviceLink,
        env: env || {},
        user: user || null,
        countryKey: countryKey as CountryKey,
        buyersGuideAvailable,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext as Context<AppContextProps>);
