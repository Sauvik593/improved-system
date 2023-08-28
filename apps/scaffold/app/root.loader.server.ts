import { json, redirect, type SerializeFrom } from '@remix-run/node';
import { getCookies, getNonEssentialCookie } from './server/cookies.server';
import { type DataFunctionArgs } from '@remix-run/server-runtime';

import { config } from '~/i18n';

export class RootLoader {
  request: DataFunctionArgs['request'];
  params: DataFunctionArgs['params'];
  context: DataFunctionArgs['context'];

  constructor(payload: DataFunctionArgs) {
    this.request = payload.request;
    this.params = payload.params;
    this.context = payload.context;
  }

  async handle() {
    this.checkEnRedirection();
    const locale = this.checkValidLocale();
    const nonEssentialCookies = this.checkNonEssentialCookies();

    return json({ locale, env: this.context.CLIENT_ENV, nonEssentialCookies });
  }

  checkEnRedirection() {
    if (new URL(this.request.url).pathname === '/en') {
      throw redirect('/', { status: 301 });
    }

    return;
  }

  checkNonEssentialCookies() {
    const nonEssentialCookies = getNonEssentialCookie(getCookies(this.request));

    return nonEssentialCookies;
  }

  checkValidLocale() {
    const { locale } = this.params;

    if (!locale) {
      return config.fallbackLang;
    }

    if (!config.supportedLngs.includes(locale)) {
      throw new Response('Not found', { status: 404 });
    }

    return locale;
  }
}

export type RootLoaderType = SerializeFrom<typeof RootLoader.prototype.handle>;
