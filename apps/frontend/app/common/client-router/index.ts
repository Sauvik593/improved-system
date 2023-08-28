import { SPAIN_KEY } from '~/common/helpers/shared-constants';

const ABOUT_US_ROUTES = {
  de: 'uberuns',
  es: 'nosotros',
  fr: 'anotrepropos',
  nl: 'overons',
  default: 'aboutus',
};

export class ClientRouter {
  homepagePath(locale: string) {
    return locale === 'en' ? '/' : `/${locale}`;
  }

  countryHomepagePath(locale: string, countryTranslation: string, countryKey: string) {
    if (locale === 'en' && countryKey === SPAIN_KEY) {
      return '/';
    }

    if (countryKey === SPAIN_KEY) {
      return `/${locale}`;
    }

    return `/${locale}/${countryTranslation}`;
  }

  aboutUsPath(locale: string) {
    const path = ABOUT_US_ROUTES[locale as keyof typeof ABOUT_US_ROUTES] || ABOUT_US_ROUTES.default;

    if (locale === 'en') {
      return `/${path}`;
    }

    return `/${locale}/${path}`;
  }

  favouritesPath(locale: string) {
    return `/${locale}/favorites`;
  }

  savedSearchesPath(locale: string) {
    return `/${locale}/alerts`;
  }

  enquiriesPath(locale: string) {
    return `/${locale}/enquiries`;
  }

  logoutPath() {
    return '/kyero-api/auth/logout';
  }
}
