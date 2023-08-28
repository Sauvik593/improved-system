import { type SerializeFrom } from '@remix-run/node';
import { type BaseI18n, BaseLoader } from '~/modules/base-loader/base-loader.server';
import { CountryNeutralHomepageMeta } from './country-neutral-homepage-meta.server';

export class CountryNeutralHomepageLoader extends BaseLoader {
  async data(): Promise<unknown[]> {
    return Promise.resolve([]);
  }

  protected meta() {
    if (!this.i18n) {
      throw new Error('i18n not found');
    }

    return new CountryNeutralHomepageMeta(this.i18n as BaseI18n).getAll();
  }
}

export type CountryNeutralHomepageLoaderType = SerializeFrom<
  typeof CountryNeutralHomepageLoader.prototype.init
>;
