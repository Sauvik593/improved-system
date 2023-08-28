'use strict';

class RoutesHandler {
  constructor({ baseSource, baseDestination, sources, subRoutes = [] }) {
    this.BASE_SOURCE = baseSource; // NO SLASHES
    this.BASE_DESTINATION = baseDestination; // NO SLASHES

    this.sources = sources;
    this.subRoutes = subRoutes;
  }

  getRewrites() {
    return this.sources.reduce((acc, [lang, route]) => {
      const mainRewrite = this.buildRewrite(lang, route);
      const subroutesRewrites = this.subRoutes.map((subroute) =>
        this.buildRewrite(lang, route, subroute),
      );

      return [...acc, mainRewrite, ...subroutesRewrites];
    }, []);
  }

  buildRewrite(lang, route, subroute = null) {
    return {
      source: this.getRoute(lang, this.BASE_SOURCE, route, subroute),
      destination: this.getRoute(lang, this.BASE_DESTINATION, null, subroute),
      locale: false, // we need to pass it in order for next to not process locale on their own but be explicit
    };
  }

  // We need to get routes that has invalid structure for us and then return 404
  // For example routes like es/advice/spain/places-to-live because 'places-to-live' should
  // only exist in en route
  // Route key is a path part that is recognized by the middleware like 'places-to-live'
  hasRouteFor404({ locale, pathname, routeKey }) {
    return this.sources.some(([sourceLocale]) => {
      return sourceLocale === locale && pathname.includes(routeKey);
    });
  }

  getRoute(lang, baseRoute, route = null, subroute = null) {
    return [`/${lang}`, baseRoute, route, subroute].filter((part) => !!part).join('/');
  }
}

const FEATURES_REWRITE_DATA = {
  baseSource: 'join/:country',
  baseDestination: 'join/:country/features',
  sources: [
    ['es', 'caracteristicas'],
    ['it', 'caratteristiche'],
    ['fr', 'caracteristiques'],
    ['pt', 'funcionalidades'],
  ],
};

const PRICING_REWRITE_DATA = {
  baseSource: 'join/:country',
  baseDestination: 'join/:country/pricing',
  sources: [
    ['es', 'precios'],
    ['it', 'prezzi'],
    ['fr', 'tarification'],
    ['pt', 'precos'],
  ],
};

const TELL_US_ABOUT_REWRITE_DATA = {
  baseSource: 'join/:country',
  baseDestination: 'join/:country/tell-us-about',
  sources: [
    ['es', 'cuentanos-sobre'],
    ['it', 'raccontaci-di-te'],
    ['fr', 'parlez-nou'],
    ['pt', 'fale-nos-sobre'],
  ],
};

const INTEGRATIONS_REWRITE_DATA = {
  baseSource: 'join/:country',
  baseDestination: 'join/:country/features/integrations',
  sources: [
    ['es', 'caracteristicas/integraciones'],
    ['it', 'caratteristiche/integrazioni'],
    ['fr', 'caracteristiques/integrations'],
    ['pt', 'funcionalidades/integracoes'],
  ],
};

const CONTACT_REWRITE_DATA = {
  baseSource: 'join/:country',
  baseDestination: 'join/:country/contact',
  sources: [
    ['es', 'contactar'],
    ['pt', 'contactar'],
    ['it', 'contatta'],
    ['fr', 'contacter'],
  ],
};

const featuresRoutesHandler = new RoutesHandler(FEATURES_REWRITE_DATA);
const pricingRoutesHandler = new RoutesHandler(PRICING_REWRITE_DATA);
const tellUsAboutRoutesHandler = new RoutesHandler(TELL_US_ABOUT_REWRITE_DATA);
const integrationsRoutesHandler = new RoutesHandler(INTEGRATIONS_REWRITE_DATA);
const contactRoutesHandler = new RoutesHandler(CONTACT_REWRITE_DATA);

module.exports = {
  featuresRoutesHandler,
  integrationsRoutesHandler,
  tellUsAboutRoutesHandler,
  pricingRoutesHandler,
  contactRoutesHandler,
  RoutesHandler,
};
