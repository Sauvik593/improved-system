import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useHydrated } from 'remix-utils';
import { type ResponsiveType, type ArrowProps } from 'react-multi-carousel';

import { TestimonialCard } from './testimonials.item';
import { type Testimonial } from '~/modules/homepage/api/get-testimonials.server';
import { BaseCarousel } from './base-carousel';

interface Props {
  testimonials: Testimonial[];
}

const CONFIG: ResponsiveType = {
  desktop: {
    breakpoint: { min: 1024, max: 3000 },
    partialVisibilityGutter: 0,
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    partialVisibilityGutter: 30,
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    partialVisibilityGutter: 40,
    items: 1,
  },
};

export const TestimonialsCarousel = ({ testimonials }: Props) => {
  const isHydrated = useHydrated();
  return (
    <BaseCarousel
      ssr
      responsive={CONFIG}
      partialVisible
      className="w-full"
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
      sliderClass="flex lg:w-full lg:gap-5"
      itemClass={cn(
        'max-w-[calc(100%-40px)] sm:max-w-[calc(50%-30px)] lg:max-w-[calc(33%-10px)] py-2 h-auto',
        {
          '!max-w-[none]': isHydrated,
        },
      )}
      deviceType="mobile"
    >
      {testimonials.map((el) => {
        return (
          <div className={cn('mr-5 h-full lg:mr-0')} key={el.title}>
            <TestimonialCard {...el} />
          </div>
        );
      })}
    </BaseCarousel>
  );
};

const CustomLeftArrow = ({ onClick }: ArrowProps) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-0 h-full w-[30px] lg:hidden"
      aria-label={t('common.ui.prev') as string}
      data-testid="property-types-carousel.left-button"
    />
  );
};

const CustomRightArrow = ({ onClick }: ArrowProps) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-0 h-full w-[30px] sm:w-[60px] lg:hidden"
      aria-label={t('common.ui.next') as string}
      data-testid="property-types-carousel.right-button"
    />
  );
};
