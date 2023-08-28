import type { KyeroRouter } from '.';

export const SUPPORTED_LOCALES = [
  'ca',
  'da',
  'de',
  'en',
  'es',
  'fi',
  'fr',
  'it',
  'nl',
  'no',
  'pt',
  'ru',
  'sv',
] as const;

export const COUNTRY_KEYS = ['spain', 'france', 'italy', 'portugal'] as const;

export type Locales = typeof SUPPORTED_LOCALES[number];
export type Countries = typeof COUNTRY_KEYS[number];

export type TranslationRoute = {
  [key: string]: `/${string}`;
};

export interface RoutesFromFrontendAPI {
  properties_for_sale: CountryPreloadedRoute;
  properties_to_rent: CountryPreloadedRoute;
  agents_search: CountryPreloadedRoute;
  cookie_preferences: Record<Locales, string>;
  sitemap: Record<Locales, string>;
}

export type CountryPreloadedRoute = Record<Countries, Record<Locales, string>>;

export interface ExternalRoutes {
  properties_for_sale: Record<Countries, string>;
  properties_to_rent: Record<Countries, string>;
  agents_search: Record<Countries, string>;
  cookie_preferences: string;
  sitemap: string;
}

export type FrontendRoutes = ReturnType<typeof KyeroRouter.prototype.getFrontendRoutes>;
export type SocialRoutes = ReturnType<typeof KyeroRouter.prototype.getSocialRoutes>;
