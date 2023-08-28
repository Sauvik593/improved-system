import React from 'react';
import { HomePageHero } from '../HomePageHero';
import { GetStarted } from '../GetStarted';
import { Testimonials } from '../Testimonials';
import { TrustedAgents } from '../TrustedAgents';
import { VisitsLeadsRoi } from '../VisitsLeadsRoi';
import { InternationalBuyers } from '../InternationalBuyers';
import { WhyKyero } from '../WhyKyero';
import { Listings } from '../Listings';
import { GetAccess } from '../GetAccess';
import { Subscribe } from '../Subscribe';

import type { AgentsSeed } from '@components/TrustedAgents/AgentsSeed';
import type { TestimonialsSeed } from '@components/Testimonials/TestimonialsSeed';
import { CountryCarouselItem } from '@components/GetAccess/CountryCarouselSeed';

interface Props {
  agentsSeed: AgentsSeed;
  testimonialsSeed: TestimonialsSeed;
  countryCarousel: CountryCarouselItem[];
}

export const Main = ({ agentsSeed, testimonialsSeed, countryCarousel }: Props) => {
  return (
    <main>
      <HomePageHero />
      <VisitsLeadsRoi />
      <InternationalBuyers />
      <WhyKyero />
      <GetAccess countryCarousel={countryCarousel} />
      <Listings />
      <Testimonials testimonialsSeed={testimonialsSeed} />
      <section className="mt-10 flex flex-col-reverse">
        <GetStarted />
        <TrustedAgents agentsSeed={agentsSeed} />
      </section>
      <Subscribe className="-mt-20 w-full md:-mt-24" />
    </main>
  );
};
