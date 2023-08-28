import { type V2_MetaFunction } from '@remix-run/node';
import { CountrySpecificLayout } from '~/modules/homepage/country-specific/ui/layout';

import { links, dynamicLinks } from '~/modules/homepage/country-specific/country.links';
import {
  loader,
  type CountrySpecificLoaderType,
} from '~/modules/homepage/country-specific/loader.server';

export const meta: V2_MetaFunction<CountrySpecificLoaderType> = ({ data }) =>
  data ? data.meta : [];

export const handle = {
  dynamicLinks,
};

export { loader, links };
export default CountrySpecificLayout;
