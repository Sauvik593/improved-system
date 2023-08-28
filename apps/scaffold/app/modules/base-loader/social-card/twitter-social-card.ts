import { BaseSocialCard, type SocialCard } from './base-social-card';

import { KyeroRouterServer } from '~/common/kyero-router/kyero-router.server';

const DOMAIN = 'kyero.com';
const SITE = '@kyero';
const CARD = 'summary_large_image';
const ORIGINAL_IMAGE_URL = '/images/social_cards/twitter_social_image.jpg';

export class TwitterSocialCard extends BaseSocialCard {
  constructor(card: SocialCard, locale: string) {
    super(card, locale);

    this.setupDefault();
  }

  private setupDefault() {
    this.card.image = KyeroRouterServer.urlOf(ORIGINAL_IMAGE_URL);
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
