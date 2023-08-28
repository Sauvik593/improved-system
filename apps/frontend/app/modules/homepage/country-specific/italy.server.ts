import { type LoaderFunction } from '@remix-run/node';

import { COUNTRIES } from './helpers';
import { CountryHomepageMeta } from './country.meta.server';
import { CountryHomepageLoader } from './country.loader.server';
import { CountryDecorator } from './country.decorator.server';

export class ItalyHomepageMeta extends CountryHomepageMeta {
  protected get title(): string {
    return this.i18n.t('common.homepage.italy.meta.title');
  }

  protected get description(): string {
    return this.i18n.t('common.homepage.italy.meta.description');
  }
}

export class ItalyHomepageDecorator extends CountryDecorator {
  protected get browseMore(): string {
    const firstCountry = this.getCountryDataForBrowseMore(COUNTRIES['SPAIN']);
    const secondCountry = this.getCountryDataForBrowseMore(COUNTRIES['PORTUGAL']);
    const thirdCountry = this.getCountryDataForBrowseMore(COUNTRIES['FRANCE']);

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

export class ItalyHomepageLoader extends CountryHomepageLoader {
  protected get country() {
    return COUNTRIES['ITALY'];
  }

  protected get MetaClass() {
    return ItalyHomepageMeta;
  }

  protected get DecoratorClass() {
    return ItalyHomepageDecorator;
  }
}

export const loader: LoaderFunction = (args) => new ItalyHomepageLoader(args).init();
