import type { PlansSeed, PlanTile } from '@components/Pricing/PlansSeed';
import { BaseStrapiService } from '../baseStrapiService';

import type { Country, Localization, SeoConfig } from '@lib/types';
import type { AgentsSeed } from '@components/TrustedAgents/AgentsSeed';
import type { TestimonialsSeed } from '@components/Testimonials/TestimonialsSeed';

export interface CountryPricingResponse {
  id: number;
  locale: string;
  country: Country | null;
  localizations: Localization[];
  pricing_url: string;
  pricing_seo: SeoConfig;
  plansSeed: PlansSeed;
  planTiles: PlanTile[];
  agentsSeed: AgentsSeed;
  testimonialsSeed: TestimonialsSeed;
}

export type CountryPricingPropsPromise = ReturnType<CountryPricingService['getStaticProps']>;
export type CountryPricingProps = Awaited<CountryPricingPropsPromise>['props'];

export class CountryPricingService extends BaseStrapiService<CountryPricingResponse> {
  getResourceUrl(slug: string) {
    return `join-countries/pricing/${slug}`;
  }

  async fetchService(...params: unknown[]): Promise<CountryPricingResponse> {
    const data = await super.fetchService(params);

    return {
      ...data,
      localizations: data.localizations.map((localization) => ({
        ...localization,
        url: localization.pricing_url as string,
      })),
    };
  }

  getProperCountry(response: CountryPricingResponse, countries: Country[]): Country | null {
    return countries.find((element) => element.id === response.id) || null;
  }
}
