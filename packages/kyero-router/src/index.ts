import { DocsRoutes } from './docs-routes';
import { GuidesRoutes } from './guides-routes';
import { IDRoutes } from './id-routes';
import { JoinRoutes } from './join-routes';
import { SupportRoutes } from './support-routes';
import { DataRoutes } from './data-routes';
import { returnCountryRouteForLocale } from './helpers';

import { preloadRoutesFromAPI } from './preload-routes-from-api';

import type {
  RoutesFromFrontendAPI,
  Countries,
  Locales,
  CountryPreloadedRoute,
  ExternalRoutes,
  FrontendRoutes,
  SocialRoutes,
} from './types';

export const Routes = {
  id: IDRoutes,
  join: JoinRoutes,
  guides: GuidesRoutes,
  docs: DocsRoutes,
  data: DataRoutes,
  support: SupportRoutes,
};

export class KyeroRouter {
  preloadedRoutes: RoutesFromFrontendAPI | null;

  constructor() {
    this.preloadedRoutes = null;
  }

  async preloadRoutes() {
    this.preloadedRoutes = await preloadRoutesFromAPI();
  }

  getExternalRoutes(locale: string) {
    return {
      privacy: Routes.docs.privacyURL(locale),
      terms: Routes.docs.termsURL(locale),
      cookies: Routes.docs.cookiesURL(locale),
      buyersGuide: Routes.guides.buyersGuideURL(locale),
      spainGuide: Routes.guides.spainGuideURL(locale),
      portugalGuide: Routes.guides.portugalGuideURL(locale),
      franceGuide: Routes.guides.franceGuideURL(locale),
      italyGuide: Routes.guides.italyGuideURL(locale),
      pdfGuide: Routes.guides.pdfGuideURL(locale),
      podcasts: Routes.guides.podcastsURL(),
      support: Routes.support.url(),
      agentsFAQ: Routes.support.agentFAQURL(locale),
      generalFAQ: Routes.support.generalFAQURL(locale),
      buyersFAQ: Routes.support.buyersFAQURL(locale),
      join: Routes.join.joinURL(locale),
      joinContact: Routes.join.contactURL(locale),
      marketData: Routes.data.marketData(locale),
      affordability: Routes.data.affordabilityCalculator(locale),
      jobs: 'https://jobs.kyero.com',
      account: Routes.id.settingsURL(locale),
      forgotPassword: Routes.id.passwordResetURL(locale),
    };
  }

  getSocialRoutes() {
    return {
      facebook: 'https://www.facebook.com/kyero.co.uk/',
      twitter: 'https://twitter.com/kyero',
      instagram: 'https://www.instagram.com/kyero_property/',
      linkedin: 'https://www.linkedin.com/company/kyero-com/',
      youtube: 'https://www.youtube.com/channel/UCmgKXDJ0fvVzMAAp4YlMYxA',
      pinterest: 'https://www.pinterest.co.uk/kyeroproperty/',
    };
  }

  getFrontendRoutes(locale: string) {
    const { preloadedRoutes } = this;

    if (!preloadedRoutes) {
      throw new Error('Routes not preloaded');
    }

    return {
      properties_for_sale: returnCountryRouteForLocale(preloadedRoutes.properties_for_sale, locale),
      agents_search: returnCountryRouteForLocale(preloadedRoutes.agents_search, locale),
      properties_to_rent: returnCountryRouteForLocale(preloadedRoutes.properties_to_rent, locale),
      cookie_preferences: preloadedRoutes.cookie_preferences[locale as Locales],
      sitemap: preloadedRoutes.sitemap[locale as Locales],
    };
  }
}

export type {
  Countries,
  Locales,
  CountryPreloadedRoute,
  ExternalRoutes,
  FrontendRoutes,
  SocialRoutes,
};
