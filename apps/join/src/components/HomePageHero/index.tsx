import React from 'react';

import { Hero } from '@components/common/Hero';
import NextImage from 'next/image';
import { useTranslation } from 'next-i18next';

import { HeroButtons } from './HeroButtons';
import { getAssetsUrl } from '@helpers/assetsUrl';

export const HomePageHero = () => {
  const { t } = useTranslation('common');

  return (
    <Hero
      title={t('homepage.hero.title')}
      description={t('homepage.hero.description')}
      paddingClassName="pt-12 lg:pb-12"
      type="left"
      imageComponent={
        <div className="h-auto w-auto lg:relative lg:top-20 xl:right-[-90px]">
          <NextImage
            src={getAssetsUrl('images/home-page/hero-banner/banner-figure.png')}
            alt={t('homepage.hero.image.alt')}
            priority
            width={650}
            height={567}
          />
        </div>
      }
    >
      <HeroButtons />
    </Hero>
  );
};
