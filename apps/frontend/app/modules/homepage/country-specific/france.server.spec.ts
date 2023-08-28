import { runCountryLoaderSpec, runCountryMetaTest } from './country-specific-spec-helpers';
import { FranceHomepageDecorator, FranceHomepageLoader, FranceHomepageMeta } from './france.server';
import { COUNTRIES } from './helpers';

runCountryLoaderSpec(
  'FranceHomepageLoader',
  FranceHomepageLoader,
  FranceHomepageDecorator,
  COUNTRIES['FRANCE'],
);

runCountryMetaTest('FranceHomepageMeta', 'france', FranceHomepageMeta);
