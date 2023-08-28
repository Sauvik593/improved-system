import React from 'react';
import { useTranslation } from 'next-i18next';

import { GreenTickIcon } from '@images/icons/GreenTick';

const AdvantagesList = [
  {
    description: 'homepage.why_kyero.advantages.prime_portal',
  },
  {
    description: 'homepage.why_kyero.advantages.international_team',
  },
  {
    description: 'homepage.why_kyero.advantages.established_in',
  },
  {
    description: 'homepage.why_kyero.advantages.fast_and_easy',
  },
  {
    description: 'homepage.why_kyero.advantages.guides_and_advice',
  },
  {
    description: 'homepage.why_kyero.advantages.b_corp',
  },
  {
    description: 'homepage.why_kyero.advantages.languages',
  },
];

export const WhyKyero = () => {
  const { t } = useTranslation('common');
  return (
    <section className="bg-sierra-night-5 py-5 lg:py-10">
      <div className="container mx-auto">
        <div className="rounded-md bg-white px-6 py-6 md:py-10">
          <h3 className="text-h-4 md:text-h-3 text-sierra-night-100 mb-5 font-bold lg:text-center">
            {t('homepage.why_kyero.title')}
          </h3>
          <ul className=" md:grid lg:grid-cols-2">
            {AdvantagesList.map((advantage, index) => (
              <li key={index} className="mb-5 flex items-start  gap-2">
                <i className="h-5 w-5">
                  <GreenTickIcon />
                </i>
                <span>{t(advantage.description)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
