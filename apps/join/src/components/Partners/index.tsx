import React from 'react';
import { Integrations } from '../Integrations';
import { LearnMore } from '../LearnMore';
import { Testimonials } from '../Testimonials';
import { GetStarted } from '../GetStarted';
import { TrustedAgents } from '../TrustedAgents';
import { FeatureIntegration } from '../FeatureIntegration';
import { Subscribe } from '@components/Subscribe';
import type { IntegrationsProps } from '@components/Integrations/IntegrationSeed';
import type { AgentsSeed } from '@components/TrustedAgents/AgentsSeed';
import type { TestimonialsSeed } from '@components/Testimonials/TestimonialsSeed';

interface Props {
  integrations: IntegrationsProps;
  agentsSeed: AgentsSeed;
  testimonialsSeed: TestimonialsSeed;
}

export const Partners = ({ agentsSeed, integrations, testimonialsSeed }: Props) => {
  return (
    <section className="bg-sierra-night-5">
      <FeatureIntegration />
      <Integrations integrations={integrations} />
      <LearnMore />
      <Testimonials testimonialsSeed={testimonialsSeed} />
      <section className="mt-10 flex flex-col-reverse">
        <GetStarted />
        <TrustedAgents agentsSeed={agentsSeed} />
      </section>
      <Subscribe className="-mt-20 w-full md:-mt-24" />
    </section>
  );
};
