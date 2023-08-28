import { GetStaticProps, GetStaticPaths } from 'next';

import { fetchBuilder } from '@helpers/fetchBuilder';
import { CountryHomepageLayout } from '@layouts/CountryHomepageLayout';
import {
  CountryHomepageService,
  CountryHomepageProps as Props,
} from '@lib/api/strapi/services/countryHomepageService';
import { AGENTS_SEED } from '@components/TrustedAgents/AgentsSeed';
import { TESTIMONIALS_SEED } from '@components/Testimonials/TestimonialsSeed';
import { COUNTRY_CAROUSEL_SEED } from '@components/GetAccess/CountryCarouselSeed';

import type { CountryStaticPathsResponse } from '@lib/types';

export default function CountryHomepage(props: Props) {
  return <CountryHomepageLayout {...props} />;
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
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale as string;
  const country = context?.params?.country as string;

  const service = new CountryHomepageService({ locale });
  const staticProps = await service.getStaticProps(country);

  const strapiResponse = {
    ...staticProps,
    props: {
      ...staticProps.props,
      response: {
        ...staticProps.props.response,
        agentsSeed: AGENTS_SEED,
        testimonialsSeed: TESTIMONIALS_SEED,
        countryCarousel: COUNTRY_CAROUSEL_SEED,
      },
    },
  };

  return service.validateStaticProps(strapiResponse);
};
