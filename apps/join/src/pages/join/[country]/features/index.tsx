import { GetStaticProps, GetStaticPaths } from 'next';

import { BasePageLayout } from '@layouts/BasePageLayout';
import { FeaturesLayout } from '@components/FeaturesLayout';
import { TrustedAgents } from '@components/TrustedAgents';
import { GetStarted } from '@components/GetStarted';
import { Subscribe } from '@components/Subscribe';
import { fetchBuilder } from 'src/helpers/fetchBuilder';

import {
  CountryFeaturesService,
  type CountryFeaturesProps as Props,
} from '@lib/api/strapi/services/countryFeaturesService';
import { AGENTS_SEED } from '@components/TrustedAgents/AgentsSeed';
import { TESTIMONIALS_SEED } from '@components/Testimonials/TestimonialsSeed';

export default function Features(props: Props) {
  return (
    <BasePageLayout
      applicationSettings={props.applicationSettings}
      seo={props.response.features_seo}
      className="bg-auto"
      locale={props.locale}
      locales={props.locales}
      country={props.country}
      countries={props.countries}
      localizations={props.response.localizations}
      url={props.response.features_url}
    >
      <>
        <FeaturesLayout testimonialSeeds={props.response.testimonialsSeed} />
        <section className="mt-10 flex flex-col-reverse">
          <GetStarted />
          <TrustedAgents agentsSeed={props.response.agentsSeed} />
        </section>
        <Subscribe className="-mt-20 w-full md:-mt-24" />
      </>
    </BasePageLayout>
  );
}

interface CountryStaticPathsResponse {
  slug: string;
  locale: string;
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

  const service = new CountryFeaturesService({ locale });
  const staticProps = await service.getStaticProps(country);

  return {
    ...staticProps,
    props: {
      ...staticProps.props,
      response: {
        ...staticProps.props.response,
        agentsSeed: AGENTS_SEED,
        testimonialsSeed: TESTIMONIALS_SEED,
      },
    },
  };
};
