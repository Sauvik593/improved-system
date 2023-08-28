import {
  json,
  redirect,
  type SerializeFrom,
  type AppLoadContext,
  type DataFunctionArgs,
} from '@remix-run/node';
import { config } from '~/i18n';
import { type Params } from '@remix-run/react';

import { getCookies, getNonEssentialCookie } from './server/cookies.server';

import { getMe } from './modules/auth/get-me.server';
import { handleGenericError } from './modules/errors/helpers.server';

export class RootLoader {
  request: Request;
  context: AppLoadContext;
  params: Params;

  constructor({ request, context, params }: DataFunctionArgs) {
    this.request = request;
    this.context = context;
    this.params = params;
  }

  async handle() {
    try {
      this.checkEnRedirection();

      const locale = await this.checkValidLocale();
      const nonEssentialCookies = this.checkNonEssentialCookies();
      const user = await this.fetchMe(locale);

      return json({
        locale,
        env: this.context.CLIENT_ENV,
        nonEssentialCookies,
        user,
      });
    } catch (e: Error | Response | unknown) {
      return await handleGenericError(e)({
        context: this.context,
        params: this.params,
        request: this.request,
      });
    }
  }

  checkEnRedirection() {
    const { pathname } = new URL(this.request.url);
    if (pathname === '/en') {
      throw redirect('/', { status: 301 });
    }

    return;
  }

  async fetchMe(locale: string) {
    const { request } = this;

    const url = `/me`;
    try {
      return await getMe(url, request, locale);
    } catch (e) {
      return null;
    }
  }

  checkNonEssentialCookies() {
    const nonEssentialCookies = getNonEssentialCookie(getCookies(this.request));

    return nonEssentialCookies;
  }

  async checkValidLocale() {
    const { locale } = this.params;

    if (!locale) {
      return config.fallbackLang;
    }

    return Promise.resolve(locale);
  }
}

export type RootLoaderType = SerializeFrom<typeof RootLoader.prototype.handle>;
