import React from 'react';
import { useTranslation } from 'next-i18next';

import { Testimonials } from '../Testimonials';
import { TrustedAgents } from '../TrustedAgents';
import { PlansComesWith } from './PlansComesWith';
import { Hero } from '@components/common/Hero';
import { Subscribe } from '@components/Subscribe';
import { Plans } from './Plans';
import { PlansSeed, type PlanTile } from './PlansSeed';
import type { AgentsSeed } from '@components/TrustedAgents/AgentsSeed';
import type { TestimonialsSeed } from '@components/Testimonials/TestimonialsSeed';

interface Props {
  plansSeed: PlansSeed;
  planTiles: PlanTile[];
  agentsSeed: AgentsSeed;
  testimonialsSeed: TestimonialsSeed;
}

export const PricingDetails = (props: Props) => {
  const { t } = useTranslation('common');
  return (
    <section className="bg-sierra-night-5 relative pb-5">
      <Hero
        title={t('pricing.kyero_prime.title')}
        description={t('pricing.kyero_prime.description')}
        paddingClassName="pt-24 pb-32 md:pb-64"
      />
      <Plans plansSeed={props.plansSeed} />
      <div className="container relative mx-auto">
        <PlansComesWith planTiles={props.planTiles} />
        <Testimonials testimonialsSeed={props.testimonialsSeed} />
      </div>
      <div className="pt-10 pb-16">
        <TrustedAgents agentsSeed={props.agentsSeed} />
      </div>
      <Subscribe className="-mb-8" />
    </section>
  );
};
