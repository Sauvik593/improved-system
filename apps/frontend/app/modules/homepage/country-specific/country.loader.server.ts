import { type ServerCountry } from './helpers';
import {
  type BaseI18n,
  BaseLoader,
  type LoaderResponse,
} from '~/server/base-loader/base-loader.server';

import {
  FEATURED_AGENTS_DATA,
  type FeaturedAgent,
} from '~/modules/agents/featured-agents-data.server';

import { type CountryDecoratorData, type CountryDecorator } from './country.decorator.server';
import { type Region, getCountryRegions } from '../api/get-country-regions.server';
import { type TopPropertiesResponse, getTopProperties } from '../api/get-top-properties.server';
import { type GuidesResponse, getGuides } from '../api/get-guides.server';
import { type PropertyTypesResponse, getPropertyTypes } from '../api/get-property-types.server';
import { type NationTreeResponse, getNationTree } from '../api/get-nation-tree.server';

import { type FAQ, getFAQs } from '../api/get-faqs.server';
import { type Testimonial, getTestimonials } from '../api/get-testimonials.server';

export interface CountryLoaderData {
  country: ServerCountry;
  ui: CountryDecoratorData;
  regions: Region[];
  topProperties: TopPropertiesResponse;
  guides: GuidesResponse;
  propertyTypes: PropertyTypesResponse;
  nationTree: NationTreeResponse;
  featuredAgents: FeaturedAgent[];
  faqs: FAQ[];
  testimonials: Testimonial[];
}

export class CountryHomepageLoader extends BaseLoader<CountryLoaderData> {
  async data() {
    const { country, i18n } = this;
    const ui = new this.DecoratorClass(country, i18n as BaseI18n, this.context).decorate();
    const featuredAgents = FEATURED_AGENTS_DATA[country.id];
    const [regions, topProperties, guides, propertyTypes, nationTree, faqs, testimonials] =
      await this.getDataFromApi();

    return Promise.resolve({
      country,
      regions,
      topProperties,
      guides,
      propertyTypes,
      nationTree,
      ui,
      faqs,
      featuredAgents,
      testimonials,
    });
  }

  protected getDataFromApi() {
    return Promise.all([
      getCountryRegions(...this.serviceParams),
      getTopProperties(...this.serviceParams),
      getGuides(...this.serviceParams),
      getPropertyTypes(...this.serviceParams),
      getNationTree(...this.serviceParams),
      getFAQs(...this.serviceParams),
      getTestimonials(...this.serviceParams),
    ]);
  }
  getCacheKey(locale: string) {
    return [
      'FRONTEND',
      this.context.SERVER_ENV.KYERO_ENV,
      locale,
      this.country?.id,
      'homepage',
      'v',
      '0.8',
    ].join('.');
  }

  getCacheExpireAt(): number {
    const today = new Date();
    const tomorrowMidnight = today.setHours(24, 0, 0, 0);

    return tomorrowMidnight;
  }

  get serviceParams(): [Request, string, number] {
    return [this.request, this.i18n?.locale as string, this.country.id];
  }

  protected get ui(): CountryDecoratorData {
    throw new Error('Not implemented ui getter');
  }

  protected get DecoratorClass(): typeof CountryDecorator {
    throw new Error('Not implemented DecoratorClass getter');
  }

  protected get country(): ServerCountry {
    throw new Error('Not implemented country getter');
  }
}

export type CountryLoaderResponse = LoaderResponse<CountryLoaderData>;
