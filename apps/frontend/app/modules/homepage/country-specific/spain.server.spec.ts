import { runCountryLoaderSpec, runCountryMetaTest } from './country-specific-spec-helpers';
import { SpainHomepageDecorator, SpainHomepageLoader, SpainHomepageMeta } from './spain.server';
import { COUNTRIES } from './helpers';

runCountryLoaderSpec(
  'SpainHomepageLoader',
  SpainHomepageLoader,
  SpainHomepageDecorator,
  COUNTRIES['SPAIN'],
);

runCountryMetaTest('SpainHomepageMeta', 'spain', SpainHomepageMeta);
