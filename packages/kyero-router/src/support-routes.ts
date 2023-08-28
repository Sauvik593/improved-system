import {
  SUPPORT_AGENT_FAQ_ROUTES,
  SUPPORT_BUYERS_FAQ_ROUTES,
  SUPPORT_URL,
  SUPPORT_ROUTES,
} from './constants';
import { getURLWithPath, routeFromConst } from './helpers';

export const SupportRoutes = {
  url: () => SUPPORT_URL,
  buyersFAQURL: (locale: string) => {
    const route = routeFromConst(locale, SUPPORT_BUYERS_FAQ_ROUTES) as `/${string}`;

    return getURLWithPath(route, SUPPORT_URL);
  },
  agentFAQURL: (locale: string) => {
    const route = routeFromConst(locale, SUPPORT_AGENT_FAQ_ROUTES) as `/${string}`;

    return getURLWithPath(route, SUPPORT_URL);
  },

  generalFAQURL: (locale: string) => {
    const route = routeFromConst(locale, SUPPORT_ROUTES) as `/${string}`;

    return getURLWithPath(route, SUPPORT_URL);
  },
};
