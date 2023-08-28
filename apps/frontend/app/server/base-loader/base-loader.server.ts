import i18next from '~/i18next.server';
import { BaseMeta } from './base-meta.server';
import { LocaleFromPath } from '~/common/i18n/locale-from-path.server';
import { FALLBACK_LOCALE, config } from '~/i18n';

import { type DataFunctionArgs } from '@remix-run/server-runtime';
import { type TFunction } from 'i18next';
import { type V2_HtmlMetaDescriptor, json, type TypedResponse } from '@remix-run/node';

import { RedisCache } from '../redis-cache.server';
import { ClientRouterServer } from '~/common/client-router/client-router.server';

import { COUNTRIES, type ServerCountry } from '~/modules/homepage/country-specific/helpers';
import { handleGenericError, handleNotFound } from '~/modules/errors/helpers.server';
import { getAppRoutes, getCountryLocalisedRoutes } from '../routes-helper.server';

export type BaseI18n = {
  locale: string;
  t: TFunction;
};

export type RouteLinks = ReturnType<typeof BaseLoader.prototype.getRoutes>;

export interface LoaderResponse<T> {
  locale: string;
  localizedRoutes: { locale: string; path: string }[];
  meta: V2_HtmlMetaDescriptor[];
  data: T;
  routeLinks: RouteLinks;
}

export class BaseLoader<T> {
  request: DataFunctionArgs['request'];
  params: DataFunctionArgs['params'];
  context: DataFunctionArgs['context'];
  clientRouter: typeof ClientRouterServer;
  i18n: BaseI18n | undefined;

  constructor(payload: DataFunctionArgs) {
    this.request = payload.request;
    this.params = payload.params;
    this.context = payload.context;
    this.clientRouter = ClientRouterServer;
  }

  async init(status: number | undefined = 200): Promise<TypedResponse<LoaderResponse<T>>> {
    try {
      await this.checkConstraint();

      const locale = (await LocaleFromPath.get(this.request)) || FALLBACK_LOCALE;
      const t = await i18next.getFixedT(locale);

      if (!t) {
        throw new Error('i18n not found');
      }

      this.i18n = {
        locale,
        t,
      };

      const CACHE_KEY = this.getCacheKey(locale);
      const data = CACHE_KEY
        ? await RedisCache.get(CACHE_KEY as string, () => this.getData(), this.getCacheExpireAt())
        : await this.getData();

      return json(data as LoaderResponse<T>, { status });
    } catch (e: Error | Response | unknown) {
      return await handleGenericError(e)({
        context: this.context,
        params: this.params,
        request: this.request,
      });
    }
  }

  async getData() {
    const locale = this.i18n?.locale as string;
    const data = await this.data();

    return {
      locale,
      localizedRoutes: this.localizedRoutes(),
      data: data,
      meta: this.meta(),
      routeLinks: this.getRoutes(locale),
    };
  }

  getCacheKey(locale: string): string | undefined {
    return undefined;
  }

  getCacheExpireAt(): number | undefined {
    return undefined;
  }

  protected async checkConstraint() {
    if (
      !!this.params.locale &&
      !config.supportedLngs.includes(this.params.locale as unknown as any)
    ) {
      return await handleNotFound({
        params: this.params,
        context: this.context,
        request: this.request,
      });
    }

    Promise.resolve();
  }

  async data(): Promise<T> {
    return [] as T;
  }

  protected get country(): ServerCountry {
    return COUNTRIES.SPAIN;
  }

  protected localizedRoutes(): { locale: string; path: string }[] {
    return getCountryLocalisedRoutes(this.country);
  }

  getRoutes(locale: string) {
    return getAppRoutes({ context: this.context, locale, country: this.country });
  }

  protected meta() {
    if (!this.i18n) {
      throw new Error('i18n not found');
    }

    return new this.MetaClass(this.i18n as BaseI18n, this.context.SERVER_ENV).getAll();
  }

  protected get MetaClass() {
    return BaseMeta;
  }
}
