import { runCountryLoaderSpec, runCountryMetaTest } from './country-specific-spec-helpers';
import {
  PortugalHomepageDecorator,
  PortugalHomepageLoader,
  PortugalHomepageMeta,
} from './portugal.server';
import { COUNTRIES } from './helpers';

runCountryLoaderSpec(
  'PortugalHomepageLoader',
  PortugalHomepageLoader,
  PortugalHomepageDecorator,
  COUNTRIES['PORTUGAL'],
);

runCountryMetaTest('PortugalHomepageMeta', 'portugal', PortugalHomepageMeta);
