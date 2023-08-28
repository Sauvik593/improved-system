import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { BaseStrapiService } from '@lib/api/strapi/baseStrapiService';
import { fetchBuilder } from '@helpers/fetchBuilder';

import { ErrorLayout } from '@layouts/ErrorLayout';

import type { BaseLayoutProps as Props } from '@lib/types';

export default function Custom404(props: Props) {
  return <ErrorLayout {...props} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale as string;
  const countriesRes = await fetchBuilder(`join-countries?locale=${locale}`);

  const service = new BaseStrapiService({ locale });
  const applicationSettings = await service.fetchApplicationSettings();
  const countries = await countriesRes.json();
  return {
    props: {
      applicationSettings,
      country: null,
      countries,
      ...(await serverSideTranslations(locale, ['common'])),
      locale: context.locale,
      locales: context.locales,
    },
  };
};
