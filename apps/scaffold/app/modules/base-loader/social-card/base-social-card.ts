export interface SocialCard {
  title: string;
  description: string;
  image?: string;
  url: string;
  type: 'article' | 'company';
}

export class BaseSocialCard {
  card: SocialCard;
  locale: string;

  constructor(card: SocialCard, locale: string) {
    this.card = card;
    this.locale = locale;
  }

  get metaTags(): { property?: string; name?: string; content: string | number }[] {
    return [];
  }
}
