import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { type ResponsiveType, type ArrowProps } from 'react-multi-carousel';
import { ArrowForward, ArrowBackward } from '@kyero/icons';

import { PropertyCard } from '../property-card';
import { type Property } from '~/modules/homepage/api/get-top-properties.server';
import { BaseCarousel } from './base-carousel';

const CONFIG: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    partialVisibilityGutter: 61,
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    partialVisibilityGutter: 38,
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    partialVisibilityGutter: 48,
    items: 1,
  },
};

interface Props {
  elements: Property[];
}

export const PropertiesCarousel = (props: Props) => {
  const renderResults = () =>
    props.elements.map((result, index) => (
      <div
        className={cn('mr-6 h-full', {
          'lg:mr-8': index !== props.elements.length - 1,
        })}
        key={result.id}
      >
        <PropertyCard {...result} />
      </div>
    ));

  return (
    <div>
      <BaseCarousel
        responsive={CONFIG}
        partialVisible
        sliderClass="flex"
        containerClass="md:-mx-4 md:px-4"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        className="w-full"
        itemClass="max-w-[calc(100%-48px)] sm:!max-w-[calc(50%-38px)] py-4 lg:!max-w-[calc(33%-53px)]"
        renderButtonGroupOutside
        renderArrowsWhenDisabled
        ssr
        deviceType="mobile"
      >
        {renderResults()}
      </BaseCarousel>
    </div>
  );
};

const CustomLeftArrow = ({ onClick, carouselState }: ArrowProps) => {
  const { t } = useTranslation();

  const isPrevVisible = carouselState
    ? carouselState?.currentSlide > 0 && carouselState?.totalItems > carouselState?.slidesToShow
    : false;

  return (
    <div
      className={cn(
        'absolute left-0 top-0 h-full w-[30px] transition-all duration-300 lg:flex lg:w-[45px] lg:items-center lg:justify-center',
        'lg:before:z-1 before:absolute before:-left-1 before:top-0 before:hidden before:h-full before:w-full before:bg-white lg:before:block',
        'after:bg-carousel after:absolute  after:-right-[13px] after:top-0 after:hidden after:h-full after:w-[26px] lg:after:z-0 lg:after:block',
        {
          'translate-x-0': isPrevVisible,
          '-translate-x-20': !isPrevVisible,
        },
      )}
    >
      <button
        onClick={onClick}
        className={cn(
          'lg:bg-sunshine-100 z-1 absolute right-0 top-0 h-full w-full lg:static lg:ml-[50px] lg:flex lg:h-[56px] lg:w-[56px] lg:rounded-full',
        )}
        aria-label={t('common.ui.next') as string}
        data-testid="location-recommendation.right-button"
      >
        <i className="hidden w-[56px] items-center lg:flex lg:h-[56px] ">
          <ArrowBackward className="text-sierra-night-100 m-auto" size="w-[20px]" />
        </i>
      </button>
    </div>
  );
};

const CustomRightArrow = ({ onClick, carouselState }: ArrowProps) => {
  const { t } = useTranslation();

  const isNextVisible = carouselState
    ? carouselState?.totalItems - carouselState?.currentSlide > carouselState?.slidesToShow
    : false;

  return (
    <div
      className={cn(
        'absolute right-0 top-0 h-full w-[40px] transition-all duration-300 lg:flex lg:w-[50px] lg:items-center lg:justify-center ',
        'after:absolute after:-right-1 after:top-0  after:hidden after:h-full after:w-full after:bg-white lg:after:block',
        'before:bg-carousel before:absolute  before:-left-[13px] before:top-0 before:hidden before:h-full before:w-[26px] lg:before:z-0 lg:before:block',
        {
          'translate-x-0': isNextVisible,
          'translate-x-20': !isNextVisible,
        },
      )}
    >
      <button
        onClick={onClick}
        className={cn(
          'lg:bg-sunshine-100 z-1 absolute right-0 top-0 h-full w-full lg:static lg:mr-[50px] lg:flex lg:h-[56px] lg:w-[56px] lg:rounded-full',
        )}
        aria-label={t('common.ui.next') as string}
        data-testid="location-recommendation.right-button"
      >
        <i className="hidden w-full items-center lg:flex lg:h-[56px] lg:w-[56px] ">
          <ArrowForward className="text-sierra-night-100 m-auto" size="w-[32px]" />
        </i>
      </button>
    </div>
  );
};
