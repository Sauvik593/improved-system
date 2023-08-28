import { BaseLinks } from '~/server/base-loader/base-links';
import { type LinkDescriptor } from '@remix-run/node';

import { SUPPORTED_LOCALES, FALLBACK_LOCALE } from '~/i18n';
import { type CountryNeutralHomepageLoaderType } from './loader.server';
import { type RouteLinks } from '~/server/base-loader/base-loader.server';
import { urlOf } from '~/common/client-router/helpers';

export class CountryNeutralHomepageLinks extends BaseLinks {
  private routeLinks: RouteLinks | undefined;

  public getDynamicLinks({
    locale,
    routeLinks,
  }: CountryNeutralHomepageLoaderType): LinkDescriptor[] {
    this.routeLinks = routeLinks;

    return [this.canonicalLink(locale), ...this.getAlternateLinks(), this.xDefaultLink(locale)];
  }

  private getAlternateLinks() {
    return [...SUPPORTED_LOCALES.map(this.alternateLink)];
  }

  private alternateLink = (locale: string) => {
    const routeLinks = this.routeLinks as RouteLinks;

    return {
      rel: 'alternate' as const,
      href: urlOf(routeLinks.internal.homepage),
      hrefLang: locale,
    };
  };

  private xDefaultLink = (locale: string) => ({
    ...this.alternateLink(FALLBACK_LOCALE),
    hrefLang: 'x-default',
  });

  private canonicalLink = (locale: string) => ({
    ...this.alternateLink(locale),
    rel: 'canonical' as const,
  });
}
