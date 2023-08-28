import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';

import { CountryContext } from '@contexts/CountryContext';

import { IntegrationCard } from './IntegrationCard';
import { IntegrationsProps } from './IntegrationSeed';

export const Integrations = ({ integrations }: { integrations: IntegrationsProps }) => {
  const { country } = useContext(CountryContext);
  const { t } = useTranslation('common');
  return (
    <div className="mb-14 mt-4">
      <div className="container mx-auto">
        <h3 className="text-h-5 md:text-h-3 text-sierra-night-100 mb-6 text-center  font-bold lg:text-center">
          {t('integrations.management_systems.title')}
        </h3>
      </div>
      <div className="container mx-auto">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {integrations[country?.translation_key as string].map((item, index) => (
            <li key={item.name} className="h-[145px] rounded-lg bg-white md:w-[170px] xl:w-[200px]">
              <IntegrationCard key={index} {...item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
