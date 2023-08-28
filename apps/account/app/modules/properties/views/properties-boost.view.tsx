import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { PropertyCard } from '~/modules/properties/components/property-card';
import { SectionHeader } from '~/components/base-layout/section-header';
import { BoostForm } from '@properties/components/boost/boost-form';

import { Breadcrumbs } from '~/components/breadcrumbs';

import { type PropertyboostLoader } from '../property-boost.loader.server';

export const BoostView = () => {
  const { property } = useLoaderData<PropertyboostLoader>();
  const { t } = useTranslation();

  return (
    <div className="relative ">
      <Breadcrumbs
        breadcrumbs={[
          { value: t('navigation.properties'), link: '/properties' },
          { value: property.name },
        ]}
      />
      <SectionHeader
        className="max-w-screen-md"
        description={t('properties.boost.description') as string}
      />
      <div className="flex flex-col gap-8 md:grid md:grid-cols-[1fr,230px] xl:grid-cols-[1fr,330px]">
        <section className="-mx-4 md:order-1 md:mx-0">
          <PropertyCard
            imageCoverUrl={property.coverImageUrl}
            name={property.name}
            price={property.priceFormatted}
            referenceNumber={property.refNumber}
            url={property.url}
          />
        </section>
        <section className="-mx-4 lg:mx-0">
          <div className="rounded-md bg-white">
            <header className="border-b-1 border-sierra-night-10 p-4">
              <h2 className="text-h-4-sm font-semibold text-sierra-night-100 lg:text-h-4">
                {t('properties.boost.form.title')}
              </h2>
            </header>

            <BoostForm slots={property.primeBoostSlots} />
          </div>
        </section>
      </div>
    </div>
  );
};
