import ENV from '~/common/env';

import { FacebookSocialCard } from './social-card/facebook-social-card';
import { TwitterSocialCard } from './social-card/twitter-social-card';

import { type BaseI18n } from './base-loader.server';
import { type V2_HtmlMetaDescriptor } from '@remix-run/node';

export class BaseMeta {
  i18n: BaseI18n;

  constructor(i18n: BaseI18n) {
    this.i18n = i18n;
  }

  getAll() {
    return [
      ...this.titleMeta,
      ...this.descriptionMeta,
      ...this.robots,
      ...this.owner,
      ...this.copyright,
      ...this.noTranslate,
      ...this.socialMeta,
      ...this.applicationMeta,
      ...this.schema,
    ];
  }

  private get titleMeta() {
    return [{ title: `Kyero.com | ${this.title}` }];
  }

  protected get schema(): V2_HtmlMetaDescriptor[] {
    return [];
  }

  private get descriptionMeta() {
    return [
      {
        name: 'description',
        content: this.description,
      },
    ];
  }

  private get owner() {
    return [
      {
        name: 'owner',
        content: 'Kyero.com',
      },
    ];
  }

  private get copyright() {
    return [
      {
        name: 'copyright',
        content: this.i18n.t('common.meta.copyright', { year: new Date().getFullYear() }),
      },
    ];
  }

  private get noTranslate() {
    return [
      {
        name: 'google',
        content: 'notranslate',
      },
    ];
  }

  private get title() {
    return this.i18n.t('common.homepage.meta.title.neutral');
  }

  private get robots() {
    return [
      {
        name: 'robots',
        content: ENV.KYERO_ENV === 'production' ? 'index, follow' : 'noindex, nofollow',
      },
    ];
  }

  private get description() {
    return this.i18n.t('common.homepage.spain.meta.description');
  }

  private get applicationMeta() {
    return [
      { name: 'apple-mobile-web-app-title', content: 'Kyero' },
      { name: 'application-name', content: 'Kyero' },
      { name: 'msapplication-config', content: 'favicon/browserconfig.xml' },
      { name: 'theme-color', content: '#1F4DEF' },
    ];
  }

  private get socialMeta() {
    return [
      ...new FacebookSocialCard(this.card, this.i18n.locale).metaTags,
      ...new TwitterSocialCard(this.card, this.i18n.locale).metaTags,
    ];
  }

  private get card() {
    return {
      title: this.title,
      description: this.description,
      url: ENV.BASE_URL,
      type: 'article' as const,
      image: undefined,
    };
  }
}
