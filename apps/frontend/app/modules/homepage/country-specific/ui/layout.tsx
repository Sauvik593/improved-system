import { useLoaderData } from '@remix-run/react';

import { useAppContext } from '~/common/contexts/app.context';
import { SectionRecommendedLocation } from '~/modules/homepage/ui/section-recommended-location';
import { SectionHero } from '~/modules/homepage/ui/section-hero';
import { SectionTopRegions } from '~/modules/homepage/ui/section-top-regions';
import { SectionTopProperties } from '~/modules/homepage/ui/section-top-properties';
import { SectionPropertyTypes } from '~/modules/homepage/ui/section-property-types';
import { SectionBuyersGuide } from '~/modules/homepage/ui/section-buyers-guide';
import { SectionGuides } from '~/modules/homepage/ui/section-guides';
import { SectionAgentDirectory } from '~/modules/homepage/ui/section-agent-directory';
import { SectionJoinBanner } from '~/modules/homepage/ui/section-join-banner';
import { SectionTestimonials } from '~/modules/homepage/ui/section-testimonials';
import { SectionFAQ } from '~/modules/homepage/ui/section-faq';
import { SectionNewsletter } from '~/modules/homepage/ui/section-newsletter';
import { SectionLocationTree } from '~/modules/homepage/ui/section-location-tree';

import { type CountrySpecificLoaderType } from '../loader.server';

export const CountrySpecificLayout = () => {
  const {
    data: {
      country,
      ui,
      regions,
      topProperties,
      guides,
      propertyTypes,
      nationTree,
      faqs,
      featuredAgents,
      testimonials,
    },
  } = useLoaderData() as unknown as CountrySpecificLoaderType;
  const { countryName, forSaleRoute, buyersGuideAvailable } = useAppContext();

  return (
    <>
      <SectionHero country={country} ui={ui} />
      <SectionRecommendedLocation />
      <SectionTopRegions regions={regions} country={country} countryName={countryName as string} />
      <SectionTopProperties topProperties={topProperties} countryName={countryName as string} />
      <SectionPropertyTypes
        forSaleRoute={forSaleRoute as string}
        propertyTypes={propertyTypes}
        key={`${country.id}-property-types`}
        nextSectionColor={buyersGuideAvailable ? undefined : '#F4F4F7'}
      />
      {buyersGuideAvailable ? <SectionBuyersGuide /> : null}
      <SectionGuides guides={guides} fallbackSection={ui.guidesFallback} />
      <SectionAgentDirectory featuredAgents={featuredAgents} />
      <SectionJoinBanner />
      <SectionTestimonials testimonials={testimonials} />
      <SectionFAQ faqs={faqs} />
      <SectionNewsletter key={`${countryName}-newsletter`} />
      <SectionLocationTree
        tabs={nationTree}
        location={countryName}
        key={`${countryName}-location-tree`}
      />
    </>
  );
};
