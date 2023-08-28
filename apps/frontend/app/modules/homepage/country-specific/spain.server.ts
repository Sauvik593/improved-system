import { type LoaderFunction } from '@remix-run/node';

import { COUNTRIES } from './helpers';
import { CountryDecorator } from './country.decorator.server';
import { CountryHomepageMeta } from './country.meta.server';
import { CountryHomepageLoader } from './country.loader.server';

export class SpainHomepageDecorator extends CountryDecorator {
  protected get browseMore(): string {
    const firstCountry = this.getCountryDataForBrowseMore(COUNTRIES['PORTUGAL']);
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

export class SpainHomepageMeta extends CountryHomepageMeta {
  protected get title(): string {
    return this.i18n.t('common.homepage.spain.meta.title');
  }

  protected get description(): string {
    return this.i18n.t('common.homepage.spain.meta.description');
  }
}

export class SpainHomepageLoader extends CountryHomepageLoader {
  protected get country() {
    return COUNTRIES['SPAIN'];
  }

  protected get MetaClass() {
    return SpainHomepageMeta;
  }

  protected get DecoratorClass() {
    return SpainHomepageDecorator;
  }
}

export const loader: LoaderFunction = (args) => new SpainHomepageLoader(args).init();
