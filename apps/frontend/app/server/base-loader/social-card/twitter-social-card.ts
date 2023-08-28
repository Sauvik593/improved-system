import { BaseSocialCard, type SocialCard } from './base-social-card';
import { assetsPathTo, urlOf } from '~/common/client-router/helpers';

import { type SERVER_ENV_SCHEMA } from '~/../env.server';

type SERVER_ENV_TYPE = ReturnType<typeof SERVER_ENV_SCHEMA.parse>;

const DOMAIN = 'kyero.com';
const SITE = '@kyero';
const CARD = 'summary_large_image';
const ORIGINAL_IMAGE_URL = assetsPathTo('/images/social_cards/twitter_social_image.jpg');

export class TwitterSocialCard extends BaseSocialCard {
  constructor(card: SocialCard, locale: string, SERVER_ENV: SERVER_ENV_TYPE) {
    super(card, locale, SERVER_ENV);

    this.setupDefault();
  }

  private setupDefault() {
    this.card.image = urlOf(ORIGINAL_IMAGE_URL);
  }

  get metaTags() {
    return [
      { name: 'twitter:site', content: SITE },
      { name: 'twitter:domain', content: DOMAIN },
      { name: 'twitter:card', content: CARD },
      { name: 'twitter:title', content: this.card.title },
      { name: 'twitter:description', content: this.card.description },
      { name: 'twitter:image', content: this.card.image as string },
      { name: 'twitter:url', content: this.card.url },
    ];
  }
}
