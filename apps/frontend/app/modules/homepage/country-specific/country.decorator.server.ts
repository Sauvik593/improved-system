import upperFirst from 'lodash/upperFirst';

import { assetsPathTo } from '~/common/client-router/helpers';
import { ClientRouterServer } from '~/common/client-router/client-router.server';

import { type BaseI18n } from '~/server/base-loader/base-loader.server';
import { type ServerCountry } from './helpers';
import { type DataFunctionArgs } from '@remix-run/node';

export class CountryDecorator {
  country: ServerCountry;
  i18n: BaseI18n;
  clientRouter: typeof ClientRouterServer;
  context: DataFunctionArgs['context'];

  constructor(country: ServerCountry, i18n: BaseI18n, context: DataFunctionArgs['context']) {
    this.country = country;
    this.i18n = i18n;
    this.clientRouter = ClientRouterServer;
    this.context = context;
  }

  decorate() {
    return {
      browseMore: this.browseMore,
      guidesFallback: {
        link: this.guidesFallbackLink(),
        title: this.i18n.t('common.homepage.advice_section.fallback.cta', {
          countryName: this.countryNameCapitalized(this.country),
        }) as string,
        img: assetsPathTo(`/images/locales/${this.country.code}@2x.png`),
      },
    };
  }

  guidesFallbackLink() {
    const externalLinks = this.context.KyeroRouter.getExternalRoutes(this.i18n.locale);

    switch (this.country.key) {
      case 'portugal':
        return externalLinks.portugalGuide;
      case 'france':
        return externalLinks.franceGuide;
      case 'italy':
        return externalLinks.italyGuide;
      case 'spain':
      default:
        return externalLinks.spainGuide;
    }
  }

  protected get browseMore(): string {
    throw new Error('ui.browseMore not implemented');
  }

  protected getCountryDataForBrowseMore(country: ServerCountry) {
    const locale = this.i18n.locale;
    const countryTranslation = country.translations[locale];
    const countryKey = country.key;

    return {
      name: this.countryNameCapitalized(country),
      path: this.clientRouter.countryHomepagePath(locale, countryTranslation, countryKey),
    };
  }

  protected countryNameCapitalized(country: ServerCountry) {
    const locale = this.i18n.locale;
    const countryTranslation = country.translations[locale];

    return upperFirst(countryTranslation);
  }
}

export type CountryDecoratorData = ReturnType<typeof CountryDecorator.prototype.decorate>;
