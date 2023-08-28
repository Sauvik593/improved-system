import { CountrySpecificLayout } from '~/modules/homepage/country-specific/ui/layout';

import { loader, type SpainHomepageLoader } from '~/modules/homepage/country-specific/spain.server';
import { links, dynamicLinks } from '~/modules/homepage/country-specific/country.links';
import { type V2_MetaFunction } from '@remix-run/node';

export const handle = {
  dynamicLinks,
};

export const meta: V2_MetaFunction<SpainHomepageLoader> = ({ data }) => (data ? data.meta : []);

export { loader, links };
export default CountrySpecificLayout;
