import React from 'react';

import { Testimonials } from '../Testimonials';
import { FeaturesList } from './FeaturesList';
import { FindOutMore } from './FindOutMore';
import { Hero } from '@components/common/Hero';
import { useTranslation } from 'next-i18next';
import type { TestimonialsSeed } from '@components/Testimonials/TestimonialsSeed';

interface Props {
  testimonialSeeds: TestimonialsSeed;
}

export const FeaturesLayout = ({ testimonialSeeds }: Props) => {
  const { t } = useTranslation('common');
  return (
    <section className="bg-sierra-night-5 relative pb-5">
      <Hero
        title={t('features.hero.title')}
        description={t('features.hero.description')}
        type="center"
      />
      <section className="container mx-auto">
        <div className="relative -mt-32 md:-mt-40">
          <FeaturesList />
        </div>
        <FindOutMore />
        <Testimonials testimonialsSeed={testimonialSeeds} />
      </section>
    </section>
  );
};
