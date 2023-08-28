import { BaseStrapiService } from '../baseStrapiService';

import type { Country, Localization, SeoConfig } from '@lib/types';
import type { AgentsSeed } from '@components/TrustedAgents/AgentsSeed';
import type { TestimonialsSeed } from '@components/Testimonials/TestimonialsSeed';

export interface CountryFeaturesResponse {
  id: number;
  locale: string;
  country: Country | null;
  localizations: Localization[];
  features_url: string;
  features_seo: SeoConfig;
  agentsSeed: AgentsSeed;
  testimonialsSeed: TestimonialsSeed;
}

export type CountryFeaturesPropsPromise = ReturnType<CountryFeaturesService['getStaticProps']>;
export type CountryFeaturesProps = Awaited<CountryFeaturesPropsPromise>['props'];

export class CountryFeaturesService extends BaseStrapiService<CountryFeaturesResponse> {
  getResourceUrl(slug: string) {
    return `join-countries/features/${slug}`;
  }

  async fetchService(...params: unknown[]): Promise<CountryFeaturesResponse> {
    const data = await super.fetchService(params);

    return {
      ...data,
      localizations: data.localizations.map((localization) => ({
        ...localization,
        url: localization.features_url as string,
      })),
    };
  }

  getProperCountry(response: CountryFeaturesResponse, countries: Country[]): Country | null {
    return countries.find((element) => element.id === response.id) || null;
  }
}
