import { ClientRouterServer } from '~/common/client-router/client-router.server';
import { type DataFunctionArgs } from '@remix-run/node';

import { type ServerCountry } from '~/modules/homepage/country-specific/helpers';
import { SPAIN_KEY } from '~/common/helpers/shared-constants';
import { SUPPORTED_LOCALES } from '~/i18n';

export const getAppRoutes = ({
  context,
  locale,
  country,
}: {
  context: DataFunctionArgs['context'];
  locale: string;
  country: ServerCountry;
}) => {
  const { KyeroRouter } = context;
  const countryTranslation = country?.translations[locale] || '';
  const countryKey = country?.key || SPAIN_KEY;

  return {
    external: KyeroRouter.getExternalRoutes(locale),
    social: KyeroRouter.getSocialRoutes(),
    internal: {
      ...KyeroRouter.getFrontendRoutes(locale),
      homepage: ClientRouterServer.homepagePath(locale),
      countryHomepage: ClientRouterServer.countryHomepagePath(
        locale,
        countryTranslation,
        countryKey,
      ),
      aboutUs: ClientRouterServer.aboutUsPath(locale),
      favourites: ClientRouterServer.favouritesPath(locale),
      enquiries: ClientRouterServer.enquiriesPath(locale),
      savedSearches: ClientRouterServer.savedSearchesPath(locale),
      logout: ClientRouterServer.logoutPath(),
    },
  };
};

export const getCountryLocalisedRoutes = (country: ServerCountry) => {
  return SUPPORTED_LOCALES.map((locale) => {
    const translation = country.translations[locale];
    const countryKey = country.key;

    return {
      locale,
      path: ClientRouterServer.countryHomepagePath(locale, translation, countryKey),
    };
  });
};
