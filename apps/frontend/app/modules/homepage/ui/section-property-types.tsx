import cn from 'classnames';
import { ArrowForward } from '@kyero/icons';

import { Trans } from 'react-i18next';
import { PropertyTypesCarousel } from '~/common/ui/carousels/property-types';

import { type PropertyType } from '../api/get-property-types.server';
import { CurvedSection } from '~/common/ui/curved-section';

interface Props {
  forSaleRoute: string;
  propertyTypes: PropertyType[];
  nextSectionColor?: string | undefined;
}

export const SectionPropertyTypes = ({ forSaleRoute, propertyTypes, nextSectionColor }: Props) => (
  <CurvedSection
    prevSectionColor="#FFF"
    nextSectionColor={nextSectionColor}
    sectionClassName="px-0"
    className={cn('bg-white px-0 pt-0 md:pt-8', {
      'pb-0': typeof nextSectionColor !== 'undefined',
      'pb-24 md:pb-0': typeof nextSectionColor === 'undefined',
    })}
  >
    <div className="mx-auto max-w-[1176px] overflow-hidden px-5 pb-4 ">
      <h2 className="text-h-2-sm md:text-h-3 text-sierra-night-100 font-bold">
        <Trans i18nKey="common.homepage.top_property_types.title" />
      </h2>
      <a
        href={forSaleRoute}
        className="text-h-5 text-ocean-100 focus:text-ocean-150 hover:text-ocean-150 mt-2 inline-flex items-center justify-between gap-2 font-bold"
      >
        <Trans i18nKey="common.homepage.top_property_types.cta" />
        <i>
          <ArrowForward />
        </i>
      </a>
      <div className="mt-4">
        <div className="flex min-h-[300px] w-[calc(100%+20px)] sm:w-full lg:min-h-[365px] lg:w-[calc(100%+16px)]">
          <PropertyTypesCarousel propertyTypes={propertyTypes} />
        </div>
      </div>
    </div>
  </CurvedSection>
);
