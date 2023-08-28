import {
  GUIDES_BUYERS_GUIDE_ROUTES,
  GUIDES_SPAIN_ROUTES,
  FRONTEND_URL,
  GUIDES_PDF_ROUTES,
  ASSETS_URL,
  GUIDES_PORTUGAL_ROUTES,
  GUIDES_ITALY_ROUTES,
  GUIDES_FRANCE_ROUTES,
} from './constants';

import { getURLWithPath, routeFromConst } from './helpers';

export const GuidesRoutes = {
  podcastsURL: () => getURLWithPath('/guides/en/podcasts', FRONTEND_URL),
  spainGuideURL: (locale: string) => {
    const route = routeFromConst(locale, GUIDES_SPAIN_ROUTES);

    return getURLWithPath(route, FRONTEND_URL);
  },

  portugalGuideURL: (locale: string) => {
    const route = routeFromConst(locale, GUIDES_PORTUGAL_ROUTES);

    return getURLWithPath(route, FRONTEND_URL);
  },

  italyGuideURL: (locale: string) => {
    const route = routeFromConst(locale, GUIDES_ITALY_ROUTES);

    return getURLWithPath(route, FRONTEND_URL);
  },

  franceGuideURL: (locale: string) => {
    const route = routeFromConst(locale, GUIDES_FRANCE_ROUTES);

    return getURLWithPath(route, FRONTEND_URL);
  },

  buyersGuideURL: (locale: string) => {
    const route = routeFromConst(locale, GUIDES_BUYERS_GUIDE_ROUTES);

    return getURLWithPath(route, FRONTEND_URL);
  },

  pdfGuideURL: (locale: string) => {
    const route = routeFromConst(locale, GUIDES_PDF_ROUTES);

    return getURLWithPath(route, ASSETS_URL);
  },
};
