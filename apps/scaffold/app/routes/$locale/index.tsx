import { HomepageLayout } from '~/modules/homepage/ui/layout';

import {
  type LoaderFunction,
  type LinksFunction,
  type V2_MetaFunction,
  type SerializeFrom,
} from '@remix-run/node';

import {
  CountryNeutralHomepageLoader,
  type CountryNeutralHomepageLoaderType,
} from '~/modules/homepage/country-netural-homepage.loader.server';
import { CountryNeutralHomepageLinks } from '~/modules/homepage/country-neutral-homepage-links';
import { type DynamicLinksFunction } from 'remix-utils';

export const loader: LoaderFunction = async (payload) => {
  const loader = new CountryNeutralHomepageLoader(payload);

  return await loader.init();
};

export const meta: V2_MetaFunction<SerializeFrom<typeof loader>> = ({ data }) => data.meta;
export const links: LinksFunction = () => new CountryNeutralHomepageLinks().links;
const dynamicLinks: DynamicLinksFunction<CountryNeutralHomepageLoaderType> = ({ data }) => {
  return new CountryNeutralHomepageLinks().getDynamicLinks(data);
};

export const handle = {
  dynamicLinks,
};

export default HomepageLayout;
