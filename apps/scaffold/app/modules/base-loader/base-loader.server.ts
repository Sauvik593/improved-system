import i18next from '~/i18next.server';
import { BaseMeta } from './base-meta.server';
import { LocaleFromPath } from '~/common/i18n/locale-from-path.server';
import { FALLBACK_LOCALE } from '~/i18n';

import { type TFunction } from 'i18next';
import { type DataFunctionArgs } from '@remix-run/node';

export type BaseI18n = {
  locale: string;
  t: TFunction;
};

export class BaseLoader {
  request: DataFunctionArgs['request'];
  params: DataFunctionArgs['params'];
  context: DataFunctionArgs['context'];
  i18n: BaseI18n | undefined;

  constructor(payload: DataFunctionArgs) {
    this.request = payload.request;
    this.params = payload.params;
    this.context = payload.context;
  }

  async init() {
    const locale = (await LocaleFromPath.get(this.request)) || FALLBACK_LOCALE;
    const t = await i18next.getFixedT(locale);

    if (!t) {
      throw new Error('i18n not found');
    }

    this.i18n = {
      locale,
      t,
    };

    const response = {
      meta: this.meta(),
      data: await this.data(),
      locale,
    };

    return response;
  }

  async data(): Promise<any> {
    return [];
  }

  protected meta() {
    if (!this.i18n) {
      throw new Error('i18n not found');
    }

    return new BaseMeta(this.i18n as BaseI18n).getAll();
  }
}
