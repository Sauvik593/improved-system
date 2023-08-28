import { BaseLinks } from '~/modules/base-loader/base-links';
import { type LinkDescriptor } from '@remix-run/node';

import { type CountryNeutralHomepageLoaderType } from './country-netural-homepage.loader.server';
import { KyeroRouterClient } from '~/common/kyero-router/kyero-router';

import { SUPPORTED_LOCALES, FALLBACK_LOCALE } from '~/i18n';

export class CountryNeutralHomepageLinks extends BaseLinks {
  public getDynamicLinks({ locale }: CountryNeutralHomepageLoaderType): LinkDescriptor[] {
    return [this.canonicalLink(locale), ...this.getAlternateLinks(), this.xDefaultLink(locale)];
  }

  private getAlternateLinks() {
    return [...SUPPORTED_LOCALES.map(this.alternateLink)];
  }

  private alternateLink = (locale: string) => ({
    rel: 'alternate' as const,
    href: KyeroRouterClient.getHomepageUrl(locale),
    hrefLang: locale,
  });

  private xDefaultLink = (locale: string) => ({
    ...this.alternateLink(FALLBACK_LOCALE),
    hrefLang: 'x-default',
  });

  private canonicalLink = (locale: string) => ({
    ...this.alternateLink(locale),
    rel: 'canonical' as const,
  });
}
