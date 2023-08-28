import { useRouter } from 'next/router';
import { BasePageLayout } from './BasePageLayout';
import type { CountryTellUsAboutProps as Props } from '@lib/api/strapi/services/countryTellUsAboutService';
import { TellUsAboutForm } from '@components/TellUsAboutForm';
import { YourPackage } from '@components/YourPackage';
import type { PlanKey } from '@components/Pricing/PlansSeed';

export const TellUsAboutLayout = (props: Props) => {
  const router = useRouter();
  const listings = router.query.listings as string;
  const duration = router.query.duration as PlanKey;
  return (
    <BasePageLayout
      applicationSettings={props.applicationSettings}
      className="bg-auto"
      countries={props.countries}
      country={props.country}
      locale={props.locale}
      locales={props.locales}
      localizations={props.response.localizations}
      url={props.response.tell_us_about_url}
      seo={props.response.tell_us_about_seo}
    >
      <div className="container mx-auto py-5 lg:py-20">
        <div className="flex flex-col justify-center sm:flex-row">
          <TellUsAboutForm listings={listings} duration={duration} isLoading={router.isReady} />
          <div className="order-1 sm:order-2">
            <YourPackage listings={listings} duration={duration} />
          </div>
        </div>
      </div>
    </BasePageLayout>
  );
};
