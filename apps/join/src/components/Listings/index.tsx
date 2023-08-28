import React from 'react';

import { useTranslation } from 'next-i18next';

import { GreenTickIcon } from '../../images/icons/GreenTick';

export const Listings = () => {
  const { t } = useTranslation('common');

  const KyeroListings = [
    {
      description: t('homepage.listings_exposure.international_buyers'),
    },
    {
      description: t('homepage.listings_exposure.mailing'),
    },
    {
      description: t('homepage.listings_exposure.prime_listings'),
    },
    {
      description: t('homepage.listings_exposure.social_media'),
    },
    {
      description: t('homepage.listings_exposure.prime_boost'),
    },
    {
      description: t('homepage.listings_exposure.publications'),
    },
  ];
  return (
    <section className="bg-sierra-night-5 py-5 lg:py-10">
      <div className="container mx-auto">
        <div className="rounded-md bg-white px-6 py-6 md:py-10">
          <h3 className="text-h-4 md:text-h-3 text-sierra-night-100 mb-5 font-bold lg:text-center">
            {t('homepage.listings_exposure.title') as string}
          </h3>
          <ul className="items-center md:grid lg:grid-cols-2">
            {KyeroListings.map((data, index) => (
              <li key={index} className="mb-5 flex items-start gap-2">
                <i className="h-5 w-5">
                  <GreenTickIcon />
                </i>
                <span>{data.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
