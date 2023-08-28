import { GetStaticProps, GetStaticPaths } from 'next';

import { BasePageLayout } from '@layouts/BasePageLayout';
import { PricingDetails } from '@components/Pricing';

import { fetchBuilder } from 'src/helpers/fetchBuilder';
import {
  type CountryPricingProps as Props,
  CountryPricingService,
} from '@lib/api/strapi/services/countryPricingService';
import { PLANS_SEED, PLAN_TILES } from '@components/Pricing/PlansSeed';
import { AGENTS_SEED } from '@components/TrustedAgents/AgentsSeed';
import { TESTIMONIALS_SEED } from '@components/Testimonials/TestimonialsSeed';

export default function Pricing(props: Props) {
  return (
    <BasePageLayout
      applicationSettings={props.applicationSettings}
      seo={props.response.pricing_seo}
      className="bg-auto"
      locale={props.locale}
      locales={props.locales}
      country={props.country}
      countries={props.countries}
      localizations={props.response.localizations}
      url={props.response.pricing_url}
    >
      <PricingDetails
        plansSeed={props.response.plansSeed}
        planTiles={props.response.planTiles}
        agentsSeed={props.response.agentsSeed}
        testimonialsSeed={props.response.testimonialsSeed}
      />
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

  const service = new CountryPricingService({ locale });
  const staticProps = await service.getStaticProps(country);

  return {
    ...staticProps,
    props: {
      ...staticProps.props,
      response: {
        ...staticProps.props.response,
        plansSeed: PLANS_SEED,
        planTiles: PLAN_TILES,
        agentsSeed: AGENTS_SEED,
        testimonialsSeed: TESTIMONIALS_SEED,
      },
    },
  };
};
