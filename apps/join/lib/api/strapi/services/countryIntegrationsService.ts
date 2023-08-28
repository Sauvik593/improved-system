import { BaseStrapiService } from '../baseStrapiService';

import type { Country, Localization, SeoConfig } from '@lib/types';
import type { IntegrationsProps } from '@components/Integrations/IntegrationSeed';
import type { AgentsSeed } from '@components/TrustedAgents/AgentsSeed';
import type { TestimonialsSeed } from '@components/Testimonials/TestimonialsSeed';

export interface CountryIntegrationsResponse {
  id: number;
  locale: string;
  country: Country | null;
  localizations: Localization[];
  integrations_url: string;
  integrations_seo: SeoConfig;
  integrations: IntegrationsProps;
  agentsSeed: AgentsSeed;
  testimonialsSeed: TestimonialsSeed;
}

export type CountryIntegrationsPropsPromise = ReturnType<
  CountryIntegrationsService['getStaticProps']
>;
export type CountryIntegrationsProps = Awaited<CountryIntegrationsPropsPromise>['props'];

export class CountryIntegrationsService extends BaseStrapiService<CountryIntegrationsResponse> {
  getResourceUrl(slug: string) {
    return `join-countries/integrations/${slug}`;
  }

  async fetchService(...params: unknown[]): Promise<CountryIntegrationsResponse> {
    const data = await super.fetchService(params);

    return {
      ...data,
      localizations: data.localizations.map((localization) => ({
        ...localization,
        url: localization.integrations_url as string,
      })),
    };
  }

  getProperCountry(response: CountryIntegrationsResponse, countries: Country[]): Country | null {
    return countries.find((element) => element.id === response.id) || null;
  }
}
