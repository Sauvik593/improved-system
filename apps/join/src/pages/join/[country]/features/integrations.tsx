import { GetStaticProps, GetStaticPaths } from 'next';
import {
  CountryIntegrationsService,
  CountryIntegrationsProps as Props,
} from '@lib/api/strapi/services/countryIntegrationsService';

import { BasePageLayout } from '@layouts/BasePageLayout';
import { Partners } from '@components/Partners';
import { KyeroIntegrations } from '@components/Integrations/IntegrationSeed';
import { AGENTS_SEED } from '@components/TrustedAgents/AgentsSeed';

import { fetchBuilder } from '@helpers/fetchBuilder';
import { TESTIMONIALS_SEED } from '@components/Testimonials/TestimonialsSeed';

export default function integrations(props: Props) {
  return (
    <BasePageLayout
      applicationSettings={props.applicationSettings}
      seo={props.response.integrations_seo}
      className="bg-auto"
      locale={props.locale}
      locales={props.locales}
      country={props.country}
      countries={props.countries}
      localizations={props.response.localizations}
      url={props.response.integrations_url}
    >
      <Partners
        integrations={props.response.integrations}
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

  const service = new CountryIntegrationsService({ locale });
  const staticProps = await service.getStaticProps(country);

  return {
    ...staticProps,
    props: {
      ...staticProps.props,
      response: {
        ...staticProps.props.response,
        integrations: KyeroIntegrations,
        agentsSeed: AGENTS_SEED,
        testimonialsSeed: TESTIMONIALS_SEED,
      },
    },
  };
};
