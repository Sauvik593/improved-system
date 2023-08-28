import { DATA_URL, MARKET_DATA_ROUTES, AFFORDABILITY_DATA_ROUTES } from './constants';
import { getURLWithPath, routeFromConst } from './helpers';

export const DataRoutes = {
  marketData: (locale: string) => {
    const route = routeFromConst(locale, MARKET_DATA_ROUTES);

    return getURLWithPath(`/${locale}${route}`, DATA_URL);
  },
  affordabilityCalculator: (locale: string) => {
    const route = routeFromConst(locale, AFFORDABILITY_DATA_ROUTES);

    return getURLWithPath(`/${locale}${route}`, DATA_URL);
  },
};
