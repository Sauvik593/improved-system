import { useLoaderData } from '@remix-run/react';

import { useAppContext } from '~/common/contexts/app.context';
import { SectionRecommendedLocation } from './section-recommended-location';
import { SectionHero } from './section-hero';
import { SectionTopRegions } from './section-top-regions';
import { SectionTopProperties } from './section-top-properties';
import { SectionPropertyTypes } from './section-property-types';
import { SectionBuyersGuide } from './section-buyers-guide';
import { SectionGuides } from './section-guides';
import { SectionAgentDirectory } from './section-agent-directory';
import { SectionJoinBanner } from './section-join-banner';
import { SectionTestimonials } from './section-testimonials';
import { SectionFAQ } from './section-faq';
import { SectionNewsletter } from './section-newsletter';
import { SectionLocationTree } from './section-location-tree';

import { type CountrySpecificLoaderType } from '../country-specific/loader.server';

export const HomepageLayout = () => {
  const {
    data: { country, ui, regions, topProperties, guides, locationTabs },
  } = useLoaderData() as unknown as CountrySpecificLoaderType;
  const { countryName, forSaleRoute } = useAppContext();

  return (
    <>
      <SectionHero country={country} ui={ui} />
      <SectionRecommendedLocation />
      <SectionTopRegions regions={regions} country={country} countryName={countryName as string} />
      <SectionTopProperties topProperties={topProperties} countryName={countryName as string} />
      <SectionPropertyTypes forSaleRoute={forSaleRoute as string} />
      <SectionBuyersGuide />
      <SectionGuides {...guides} />
      <SectionAgentDirectory />
      <SectionJoinBanner />
      <SectionTestimonials />
      <SectionFAQ />
      <SectionNewsletter />
      <SectionLocationTree tabs={locationTabs.tabs} />
    </>
  );
};
