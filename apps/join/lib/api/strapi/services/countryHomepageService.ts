import { BaseStrapiService } from '../baseStrapiService';

import type { Country, Localization, SeoConfig } from '@lib/types';
import type { AgentsSeed } from '@components/TrustedAgents/AgentsSeed';
import type { TestimonialsSeed } from '@components/Testimonials/TestimonialsSeed';
import type { CountryCarouselItem } from '@components/GetAccess/CountryCarouselSeed';

export interface CountryHomepageResponse {
  id: number;
  locale: string;
  country: Country | null;
  localizations: Localization[];
  url: string;
  seo: SeoConfig;
  agentsSeed: AgentsSeed;
  testimonialsSeed: TestimonialsSeed;
  countryCarousel: CountryCarouselItem[];
}

export type CountryHomepagePropsPromise = ReturnType<CountryHomepageService['getStaticProps']>;
export type CountryHomepageProps = Awaited<CountryHomepagePropsPromise>['props'];

export class CountryHomepageService extends BaseStrapiService<CountryHomepageResponse> {
  getResourceUrl(slug: string) {
    return `join-countries/${slug}`;
  }

  getProperCountry(response: CountryHomepageResponse, countries: Country[]): Country | null {
    return countries.find((element) => element.id === response.id) || null;
  }
}
