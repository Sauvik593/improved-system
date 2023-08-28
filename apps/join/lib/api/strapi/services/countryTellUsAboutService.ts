import { BaseStrapiService } from '../baseStrapiService';

import type { Country, Localization, SeoConfig } from '@lib/types';

export interface CountryTellUsAboutResponse {
  id: number;
  locale: string;
  localizations: Localization[];
  tell_us_about_url: string;
  tell_us_about_seo: SeoConfig;
}

export type CountryTellUsAboutPropsPromise = ReturnType<
  CountryTellUsAboutService['getStaticProps']
>;
export type CountryTellUsAboutProps = Awaited<CountryTellUsAboutPropsPromise>['props'];

export class CountryTellUsAboutService extends BaseStrapiService<CountryTellUsAboutResponse> {
  getResourceUrl(slug: string) {
    return `join-countries/tell-us-about/${slug}`;
  }

  async fetchService(...params: unknown[]): Promise<CountryTellUsAboutResponse> {
    const data = await super.fetchService(params);
    return {
      ...data,
      localizations: data.localizations.map((localization) => ({
        ...localization,
        url: localization.tell_us_about_url as string,
      })),
    };
  }

  getProperCountry(response: CountryTellUsAboutResponse, countries: Country[]): Country | null {
    return countries.find((element) => element.id === response.id) || null;
  }
}
