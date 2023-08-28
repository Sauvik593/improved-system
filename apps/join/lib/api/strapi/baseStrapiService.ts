import { GetStaticPropsResult } from 'next';
import queryString from 'query-string';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Env } from '@lib/env';

import type { Country, GeneralConfig } from '@lib/types';

interface BaseStrapiServiceArgs {
  locale?: string;
  preview?: boolean | undefined;
  additionalParams?: Record<string, unknown>;
}

export type BaseResponseType = {
  id: number;
  country?: Country | number | null;
};

interface StaticPropsResponse<T> {
  props: T & {
    response?: {
      id?: string | number;
    };
  };
}

export const LOCALES = ['en', 'fr', 'pt', 'it', 'es'];

export const REQUEST_AUTH_SETTINGS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Env.strapiToken}`,
  },
};

export class BaseStrapiService<T extends BaseResponseType> {
  Env: typeof Env;
  locale: string;
  preview: boolean;
  additionalParams?: Record<string, unknown>;

  constructor({ locale, preview, additionalParams }: BaseStrapiServiceArgs) {
    this.Env = Env;

    this.locale = locale || 'en';
    this.preview = preview || false;
    this.additionalParams = additionalParams || {};
  }

  async getStaticProps(...args: unknown[]) {
    const response = await this.fetchService(...args);
    const countries = await this.fetchCountries();
    const applicationSettings = await this.fetchApplicationSettings();
    return {
      props: {
        response: response as T,
        countries,
        applicationSettings,
        locale: this.locale,
        locales: LOCALES,
        preview: this.preview,
        ...this.countryProp(response, countries),
        ...(await this.getTranslations()),
      },
      revalidate: this.Env.revalidate,
    };
  }

  async getServerSideProps(...args: unknown[]) {
    const response = await this.fetchService(...args);
    const countries = await this.fetchCountries();
    const applicationSettings = await this.fetchApplicationSettings();

    return {
      props: {
        response: response as T,
        applicationSettings,
        locale: this.locale,
        locales: LOCALES,
        preview: this.preview,
        ...this.countryProp(response, countries),
        ...(await this.getTranslations()),
      },
    };
  }

  countryProp(response: T, countries: Country[]) {
    return {
      country: this.getProperCountry(response, countries),
    };
  }

  getProperCountry(response: T, countries: Country[]): Country | null {
    if (!response.country) {
      return null;
    }

    if (typeof response.country === 'number') {
      const country = countries.find((element) => element.id === response.country);

      return country || null;
    }

    return response.country;
  }

  getTranslations() {
    return serverSideTranslations(this.locale, ['common']);
  }

  // eslint-disable-next-line
  // @ts-ignore
  async fetchService(...params: unknown[]): Promise<T> {
    const route = this.buildRoute(this.getResourceUrl(params), this.additionalParams);
    const response = await fetch(route, REQUEST_AUTH_SETTINGS);

    return response.json();
  }

  // eslint-disable-next-line
  getResourceUrl(..._: unknown[]): string {
    throw new Error('unknown string');
  }

  async fetchCountries(): Promise<Country[]> {
    const route = this.buildRoute('join-countries', {});
    const response = await fetch(route, REQUEST_AUTH_SETTINGS);
    return response.json();
  }

  async fetchApplicationSettings(): Promise<GeneralConfig> {
    const route = this.buildRoute('application-settings/site/Kyero', { locale: this.locale });
    const response = await fetch(route, REQUEST_AUTH_SETTINGS);

    return response.json();
  }

  get baseParams() {
    return {
      locale: this.locale,
    };
  }

  validateStaticProps<T>(staticProps: StaticPropsResponse<T>): GetStaticPropsResult<T> {
    if (!staticProps.props.response?.id) {
      return {
        notFound: true,
      };
    }
    return staticProps as GetStaticPropsResult<T>;
  }

  buildRoute(route: string, params: Record<string, unknown> = {}) {
    const stringifiedParams = queryString.stringify({ ...params, ...this.baseParams });
    return `${this.Env.strapiUrl}/api/${route}?${stringifiedParams}`;
  }
}
