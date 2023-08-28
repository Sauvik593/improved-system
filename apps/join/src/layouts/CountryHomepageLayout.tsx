import { BasePageLayout } from '@layouts/BasePageLayout';
import { Main } from '@components/Main';
import type { CountryHomepageProps as Props } from '@lib/api/strapi/services/countryHomepageService';

export const CountryHomepageLayout = (props: Props) => {
  return (
    <BasePageLayout
      className="bg-auto"
      locale={props.locale}
      locales={props.locales}
      country={props.country}
      countries={props.countries}
      localizations={props.response.localizations}
      url={props.response.url}
      seo={props.response.seo}
      applicationSettings={props.applicationSettings}
    >
      <Main
        agentsSeed={props.response.agentsSeed}
        testimonialsSeed={props.response.testimonialsSeed}
        countryCarousel={props.response.countryCarousel}
      />
    </BasePageLayout>
  );
};
