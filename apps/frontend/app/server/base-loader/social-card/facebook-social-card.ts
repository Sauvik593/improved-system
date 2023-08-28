import { BaseSocialCard, type SocialCard } from './base-social-card';
import { assetsPathTo, urlOf } from '~/common/client-router/helpers';

import { type SERVER_ENV_SCHEMA } from '~/../env.server';

type SERVER_ENV_TYPE = ReturnType<typeof SERVER_ENV_SCHEMA.parse>;

const KYERO_COM = 'Kyero.com';
const FACEBOOK_KYERO = 'https://www.facebook.com/kyero.co.uk';
const IMAGE_TYPE = 'image/jpeg';
const IMAGE_WIDTH = 1200;

// To Be used in a resizer
// const IMAGE_HEIGHT = 628;
const ORIGINAL_IMAGE_URL = assetsPathTo('/images/social_cards/facebook_social_image.jpg');
const OG_LOCALES = {
  ca: 'ca_ES',
  da: 'da_DK',
  de: 'de_DE',
  en: 'en_GB',
  es: 'es_ES',
  fi: 'fi_FI',
  fr: 'fr_FR',
  it: 'it_IT',
  nl: 'nl_NL',
  no: 'nb_NO',
  pt: 'pt_PT',
  ru: 'ru_RU',
  sv: 'sv_SE',
};

export class FacebookSocialCard extends BaseSocialCard {
  constructor(card: SocialCard, locale: string, SERVER_ENV: SERVER_ENV_TYPE) {
    super(card, locale, SERVER_ENV);

    this.setupDefault();
  }

  private setupDefault() {
    this.card.image = urlOf(ORIGINAL_IMAGE_URL);
  }

  get metaTags() {
    return [
      { property: 'og:site_name', content: KYERO_COM },
      { property: 'og:locale', content: this.ogLocale() },
      { property: 'article:author', content: FACEBOOK_KYERO },
      { property: 'article:publisher', content: FACEBOOK_KYERO },
      { property: 'fb:app_id', content: this.SERVER_ENV.FACEBOOK_APP_ID as string },
      { property: 'og:title', content: this.card.title },
      { property: 'og:description', content: this.card.description },
      { property: 'og:image', content: this.card.image as string },
      { property: 'og:image:url', content: this.card.image as string },
      { property: 'og:image:secure_url', content: this.card.image as string },
      { property: 'og:image:type', content: IMAGE_TYPE },
      { property: 'og:image:width', content: IMAGE_WIDTH },
      { property: 'og:type', content: this.card.type },
      { property: 'og:url', content: this.card.url },
    ];
  }

  private ogLocale(): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return OG_LOCALES[this.locale] as string;
  }
}
