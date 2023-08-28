import React from 'react';
import { useTranslation } from 'next-i18next';

export const IntegrationHeroBanner = () => {
  const { t } = useTranslation('common');
  return (
    <div className="flex flex-col items-center">
      <h1 className="lg:line-clamp-5 lg:text-h-1 text-h-1-sm mb-4 text-center leading-none text-white md:w-4/5 md:text-center lg:text-center">
        {t('integrations.hero.title')}
      </h1>
      <p className="md:text-p-1 text-p-1-sm text-center leading-tight text-white md:w-4/5">
        {t('integrations.hero.description')}
      </p>
    </div>
  );
};
