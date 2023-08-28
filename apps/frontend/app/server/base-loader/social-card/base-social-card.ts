import { type SERVER_ENV_SCHEMA } from '~/../env.server';

import { ClientRouterServer } from '~/common/client-router/client-router.server';
export interface SocialCard {
  title: string;
  description: string;
  image?: string;
  url: string;
  type: 'article' | 'company';
}

type SERVER_ENV_TYPE = ReturnType<typeof SERVER_ENV_SCHEMA.parse>;

export class BaseSocialCard {
  card: SocialCard;
  locale: string;
  SERVER_ENV: SERVER_ENV_TYPE;
  clientRouter: typeof ClientRouterServer;

  constructor(card: SocialCard, locale: string, SERVER_ENV: SERVER_ENV_TYPE) {
    this.card = card;
    this.locale = locale;
    this.SERVER_ENV = SERVER_ENV;
    this.clientRouter = ClientRouterServer;
  }

  get metaTags(): { property?: string; name?: string; content: string | number }[] {
    return [];
  }
}
