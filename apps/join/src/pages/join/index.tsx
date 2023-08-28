import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { BaseLayoutProps } from '@lib/types/general';
import { HomepageLayout } from '@layouts/HomepageLayout';
import { fetchBuilder } from '@helpers/fetchBuilder';
import { BaseStrapiService } from '@lib/api/strapi/baseStrapiService';
import {
  TESTIMONIALS_SEED,
  type TestimonialsSeed,
} from '@components/Testimonials/TestimonialsSeed';

export interface CountryNeutralProps extends BaseLayoutProps {
  testimonialsSeed: TestimonialsSeed;
}

export default function Home(props: CountryNeutralProps) {
  return <HomepageLayout {...props} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale as string;
  const countriesRes = await fetchBuilder(`join-countries?locale=${locale}`);

  const service = new BaseStrapiService({ locale });
  const applicationSettings = await service.fetchApplicationSettings();
  const countries = await countriesRes.json();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      country: null,
      countries,
      testimonialsSeed: TESTIMONIALS_SEED,
      applicationSettings,
      locale: context.locale,
      locales: context.locales,
    },
  };
};
