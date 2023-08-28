import { type LinksFunction, type LinkDescriptor } from '@remix-run/node';
import { type DynamicLinksFunction } from 'remix-utils';

import { urlOf } from '~/common/client-router/helpers';
import { FALLBACK_LOCALE, SUPPORTED_LOCALES } from '~/i18n';
import { BaseLinks } from '~/server/base-loader/base-links';

import { type CountrySpecificLoaderType } from './loader.server';
import { type ServerCountry } from './helpers';
import { preloadHeroImage } from '../ui/hero-bg-picture';

export class CountryLinks extends BaseLinks {
  private localizedRoutes: { locale: string; path: string }[] | undefined;
  private country: ServerCountry | undefined;

  public getDynamicLinks({
    locale,
    localizedRoutes,
    data,
  }: CountrySpecificLoaderType): LinkDescriptor[] {
    this.localizedRoutes = localizedRoutes;
    this.country = data.country;

    return [
      this.canonicalLink(locale),
      ...this.getAlternateLinks(),
      ...this.preloadHeroImage(),
      this.xDefaultLink(),
    ];
  }

  private getAlternateLinks() {
    return [...SUPPORTED_LOCALES.map(this.alternateLink)];
  }

  private alternateLink = (locale: string) => {
    const routeLink = this.localizedRoutes?.find((route) => route.locale === locale);

    if (!routeLink) {
      throw new Error(`No localized route found for locale ${locale}`);
    }

    return {
      rel: 'alternate' as const,
      href: urlOf(routeLink.path),
      hrefLang: locale,
    };
  };

  private xDefaultLink = () => ({
    ...this.alternateLink(FALLBACK_LOCALE),
    hrefLang: 'x-default',
  });

  private canonicalLink = (locale: string) => ({
    ...this.alternateLink(locale),
    rel: 'canonical' as const,
  });

  private preloadHeroImage = (): LinkDescriptor[] => {
    if (!this.country) {
      return [];
    }

    return preloadHeroImage(this.country);
  };
}

export const links: LinksFunction = () => new CountryLinks().links;
export const dynamicLinks: DynamicLinksFunction<CountrySpecificLoaderType> = ({ data }) =>
  data ? new CountryLinks().getDynamicLinks(data) : [];
