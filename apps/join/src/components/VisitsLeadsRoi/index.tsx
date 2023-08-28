import React from 'react';

import { useTranslation } from 'next-i18next';

import { Buyers } from '@images/icons/VisitsLeadsRoiIcons/Buyers';
import { Enquiries } from '@images/icons/VisitsLeadsRoiIcons/Enquiries';
import { Language } from '@images/icons/VisitsLeadsRoiIcons/Language';
import { LiveListings } from '@images/icons/VisitsLeadsRoiIcons/LiveListings';

export const VisitsLeadsRoi = () => {
  const { t } = useTranslation('common');
  const VisitsLeadsRoiContent = [
    {
      Element: Buyers,
      title: t('homepage.advantage_cards.buyers.title'),
      description: t('homepage.advantage_cards.buyers.description'),
    },
    {
      Element: Enquiries,
      title: t('homepage.advantage_cards.enquiries.title', { enquiries: '70000' }),
      description: t('homepage.advantage_cards.enquiries.description', { enquiries: '70000' }),
    },
    {
      Element: Language,
      title: t('homepage.advantage_cards.languages.title'),
      description: t('homepage.advantage_cards.languages.description', { countries: '13' }),
    },
    {
      Element: LiveListings,
      title: t('homepage.advantage_cards.live_listings.title'),
      description: t('homepage.advantage_cards.live_listings.description'),
    },
  ];
  return (
    <section className="bg-sierra-night-5 py-8 lg:pb-10 lg:pt-16">
      <div className="container mx-auto">
        <div className="flex w-full  flex-wrap  lg:grid lg:grid-cols-4 lg:gap-6">
          {VisitsLeadsRoiContent.map((item, index) => (
            <div className="mb-3 w-full rounded-lg bg-white py-6 px-8 lg:mb-0  lg:py-9" key={index}>
              <item.Element />
              <div
                className="text-h-2-sm text-sierra-night-100 my-3 font-bold"
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              <p className="text-sierra-night-100">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
