import { type LoaderFunction } from '@remix-run/node';

import { COUNTRIES } from './helpers';
import { CountryDecorator } from './country.decorator.server';
import { CountryHomepageMeta } from './country.meta.server';
import { CountryHomepageLoader } from './country.loader.server';

export class PortugalHomepageDecorator extends CountryDecorator {
  protected get browseMore(): string {
    const firstCountry = this.getCountryDataForBrowseMore(COUNTRIES['SPAIN']);
    const secondCountry = this.getCountryDataForBrowseMore(COUNTRIES['FRANCE']);
    const thirdCountry = this.getCountryDataForBrowseMore(COUNTRIES['ITALY']);

    return this.i18n.t('common.homepage.searchbox.browse_in', {
      first_location: firstCountry.name,
      first_href: firstCountry.path,
      second_location: secondCountry.name,
      second_href: secondCountry.path,
      third_location: thirdCountry.name,
      third_href: thirdCountry.path,
    });
  }
}

export class PortugalHomepageMeta extends CountryHomepageMeta {
  protected get title(): string {
    return this.i18n.t('common.homepage.portugal.meta.title');
  }

  protected get description(): string {
    return this.i18n.t('common.homepage.portugal.meta.description');
  }
}

export class PortugalHomepageLoader extends CountryHomepageLoader {
  protected get country() {
    return COUNTRIES['PORTUGAL'];
  }

  protected get MetaClass() {
    return PortugalHomepageMeta;
  }

  protected get DecoratorClass() {
    return PortugalHomepageDecorator;
  }
}

export const loader: LoaderFunction = async (args) => new PortugalHomepageLoader(args).init();
