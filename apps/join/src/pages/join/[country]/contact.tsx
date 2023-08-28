import { GetStaticProps, GetStaticPaths } from 'next';

import { BasePageLayout } from '@layouts/BasePageLayout';
import { ContactDetails } from '@components/Contact';
import { fetchBuilder } from '@helpers/fetchBuilder';
import {
  type CountryContactProps as Props,
  CountryContactService,
} from '@lib/api/strapi/services/countryContactService';
import { CountryStaticPathsResponse } from '@lib/types';
import { AGENTS_SEED } from '@components/TrustedAgents/AgentsSeed';
import { TESTIMONIALS_SEED } from '@components/Testimonials/TestimonialsSeed';

export default function Contact(props: Props) {
  return (
    <BasePageLayout
      applicationSettings={props.applicationSettings}
      seo={props.response.contact_seo}
      className="bg-auto"
      locale={props.locale}
      locales={props.locales}
      country={props.country}
      countries={props.countries}
      localizations={props.response.localizations}
      url={props.response.contact_url}
    >
      <ContactDetails
        agentsSeed={props.response.agentsSeed}
        testimonialsSeed={props.response.testimonialsSeed}
      />
    </BasePageLayout>
  );
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

  const service = new CountryContactService({ locale });
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
