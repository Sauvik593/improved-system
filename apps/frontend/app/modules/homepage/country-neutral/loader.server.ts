import {
  BaseLoader,
  type BaseI18n,
  type LoaderResponse,
} from '~/server/base-loader/base-loader.server';
import { CountryNeutralHomepageMeta } from './meta.server';

export class CountryNeutralHomepageLoader extends BaseLoader<[]> {
  protected meta() {
    if (!this.i18n) {
      throw new Error('i18n not found');
    }

    return new CountryNeutralHomepageMeta(this.i18n as BaseI18n, this.context.SERVER_ENV).getAll();
  }
}

export type CountryNeutralHomepageLoaderType = LoaderResponse<{}>;
