import { BaseStrapiService } from '../baseStrapiService';

import type { Country, Localization, SeoConfig } from '@lib/types';
import type { AgentsSeed } from '@components/TrustedAgents/AgentsSeed';
import type { TestimonialsSeed } from '@components/Testimonials/TestimonialsSeed';

export interface CountryContactResponse {
  id: number;
  locale: string;
  localizations: Localization[];
  contact_url: string;
  contact_seo: SeoConfig;
  agentsSeed: AgentsSeed;
  testimonialsSeed: TestimonialsSeed;
}

export type CountryContactPropsPromise = ReturnType<CountryContactService['getStaticProps']>;
export type CountryContactProps = Awaited<CountryContactPropsPromise>['props'];

export class CountryContactService extends BaseStrapiService<CountryContactResponse> {
  getResourceUrl(slug: string) {
    return `join-countries/contact/${slug}`;
  }

  async fetchService(...params: unknown[]): Promise<CountryContactResponse> {
    const data = await super.fetchService(params);

    return {
      ...data,
      localizations: data.localizations.map((localization) => ({
        ...localization,
        url: localization.contact_url as string,
      })),
    };
  }

  getProperCountry(response: CountryContactResponse, countries: Country[]): Country | null {
    return countries.find((element) => element.id === response.id) || null;
  }
}
