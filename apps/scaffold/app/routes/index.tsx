import { HomepageLayout } from '~/modules/homepage/ui/layout';

import { type LoaderFunction, type LinksFunction, type V2_MetaFunction } from '@remix-run/node';

import { CountryNeutralHomepageLoader } from '~/modules/homepage/country-netural-homepage.loader.server';
import { CountryNeutralHomepageLinks } from '~/modules/homepage/country-neutral-homepage-links';

import { type DynamicLinksFunction } from 'remix-utils';
import { type CountryNeutralHomepageLoaderType } from '~/modules/homepage/country-netural-homepage.loader.server';

export const loader: LoaderFunction = async (payload) =>
  await new CountryNeutralHomepageLoader(payload).init();

export const meta: V2_MetaFunction<CountryNeutralHomepageLoaderType> = ({ data }) => data.meta;

export const links: LinksFunction = () => new CountryNeutralHomepageLinks().links;

const dynamicLinks: DynamicLinksFunction<CountryNeutralHomepageLoaderType> = ({ data }) => {
  return new CountryNeutralHomepageLinks().getDynamicLinks(data, window.ENV);
};

export const handle = {
  dynamicLinks,
};

export default HomepageLayout;
