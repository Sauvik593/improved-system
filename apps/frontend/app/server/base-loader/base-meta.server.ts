import { FacebookSocialCard } from './social-card/facebook-social-card';
import { TwitterSocialCard } from './social-card/twitter-social-card';

import { type BaseI18n } from './base-loader.server';
import { type V2_HtmlMetaDescriptor } from '@remix-run/node';

import { type SERVER_ENV_SCHEMA } from '~/../env.server';
import { assetsPathTo } from '~/common/client-router/helpers';

type SERVER_ENV_TYPE = ReturnType<typeof SERVER_ENV_SCHEMA.parse>;

export class BaseMeta {
  i18n: BaseI18n;
  SERVER_ENV: SERVER_ENV_TYPE;

  constructor(i18n: BaseI18n, SERVER_ENV: SERVER_ENV_TYPE) {
    this.i18n = i18n;
    this.SERVER_ENV = SERVER_ENV;
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
    return [{ title: `${this.title} | Kyero` }];
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

  protected get title() {
    return this.i18n.t('common.homepage.spain.meta.title');
  }

  private get robots() {
    return [
      {
        name: 'robots',
        content: this.SERVER_ENV.KYERO_ENV === 'production' ? 'index, follow' : 'noindex, nofollow',
      },
    ];
  }

  protected get description() {
    return this.i18n.t('common.homepage.spain.meta.description');
  }

  private get applicationMeta() {
    return [
      { name: 'apple-mobile-web-app-title', content: 'Kyero' },
      { name: 'application-name', content: 'Kyero' },
      { name: 'msapplication-config', content: assetsPathTo('/favicon/browserconfig.xml') },
      { name: 'theme-color', content: '#1F4DEF' },
    ];
  }

  private get socialMeta() {
    return [
      ...new FacebookSocialCard(this.card, this.i18n.locale, this.SERVER_ENV).metaTags,
      ...new TwitterSocialCard(this.card, this.i18n.locale, this.SERVER_ENV).metaTags,
    ];
  }

  protected get card() {
    return {
      title: this.title,
      description: this.description,
      url: this.SERVER_ENV.BASE_URL,
      type: 'article' as const,
      image: undefined,
    };
  }
}
