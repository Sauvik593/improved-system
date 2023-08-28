import { JOIN_CONTACT_ROUTES, JOIN_LOCALES, JOIN_URL } from './constants';
import { getURLWithPath, routeFromConst, localeOrEmptyFor } from './helpers';

export const JoinRoutes = {
  joinURL: (locale: string) => getURLWithPath(localeOrEmptyFor(locale, JOIN_LOCALES), JOIN_URL),
  contactURL: (locale: string) => {
    const baseUrl = JoinRoutes.joinURL(locale);
    const route = routeFromConst(locale, JOIN_CONTACT_ROUTES);

    return getURLWithPath(route, baseUrl);
  },
};
