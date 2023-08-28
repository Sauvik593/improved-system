import { GetStaticProps, GetStaticPaths } from 'next';
import { TellUsAboutLayout } from '@layouts/TellUsAboutLayout';
import { fetchBuilder } from '@helpers/fetchBuilder';
import {
  type CountryTellUsAboutProps as Props,
  CountryTellUsAboutService,
} from '@lib/api/strapi/services/countryTellUsAboutService';
import { CountryStaticPathsResponse } from '@lib/types';

export default function TellUsAbout(props: Props) {
  return <TellUsAboutLayout {...props} />;
}

const getBasePaths = (page: CountryStaticPathsResponse) => ({
  params: {
    country: page.slug,
  },
  locale: page.locale,
});

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetchBuilder(`join-countries/static-paths`);
  const countries: CountryStaticPathsResponse[] = await res.json();

  const paths = countries.map(getBasePaths);
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale as string;
  const country = context?.params?.country as string;

  const service = new CountryTellUsAboutService({ locale });
  const staticProps = await service.getStaticProps(country);

  return staticProps;
};
