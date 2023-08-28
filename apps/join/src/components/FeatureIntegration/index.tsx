import React from 'react';

import BannerFigure from '/public/images/integrations/banner-figure.png';

import NextImage from 'next/image';
import { useTranslation } from 'next-i18next';
import { Hero } from '@components/common/Hero';

export const FeatureIntegration = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <Hero title={t('integrations.hero.title')} description={t('integrations.hero.description')} />
      <div className="-mt-32 flex justify-center md:-mt-48">
        <NextImage
          src={BannerFigure}
          alt={t('integrations.hero.image.alt')}
          width={700}
          height={320}
          placeholder="blur"
        />
      </div>
    </>
  );
};
