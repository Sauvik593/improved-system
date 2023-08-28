import { runCountryLoaderSpec, runCountryMetaTest } from './country-specific-spec-helpers';
import { ItalyHomepageDecorator, ItalyHomepageLoader, ItalyHomepageMeta } from './italy.server';
import { COUNTRIES } from './helpers';

runCountryLoaderSpec(
  'ItalyHomepageLoader',
  ItalyHomepageLoader,
  ItalyHomepageDecorator,
  COUNTRIES['ITALY'],
);

runCountryMetaTest('ItalyHomepageMeta', 'italy', ItalyHomepageMeta);
