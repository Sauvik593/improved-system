import { type LoaderFunction } from '@remix-run/node';

import { COUNTRIES } from './helpers';
import { CountryHomepageMeta } from './country.meta.server';
import { CountryDecorator } from './country.decorator.server';
import { CountryHomepageLoader } from './country.loader.server';

export class FranceHomepageMeta extends CountryHomepageMeta {
  protected get title(): string {
    return this.i18n.t('common.homepage.france.meta.title');
  }

  protected get description(): string {
    return this.i18n.t('common.homepage.france.meta.description');
  }
}

export class FranceHomepageDecorator extends CountryDecorator {
  protected get browseMore(): string {
    const firstCountry = this.getCountryDataForBrowseMore(COUNTRIES['SPAIN']);
    const secondCountry = this.getCountryDataForBrowseMore(COUNTRIES['PORTUGAL']);
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

export class FranceHomepageLoader extends CountryHomepageLoader {
  protected get country() {
    return COUNTRIES['FRANCE'];
  }

  protected get MetaClass() {
    return FranceHomepageMeta;
  }

  protected get DecoratorClass() {
    return FranceHomepageDecorator;
  }
}

export const loader: LoaderFunction = (args) => new FranceHomepageLoader(args).init();
