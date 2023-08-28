import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useHydrated } from 'remix-utils';
import { type ResponsiveType, type ArrowProps } from 'react-multi-carousel';

import { Item } from './property-types.item';
import { type PropertyType } from '~/modules/homepage/api/get-property-types.server';
import { BaseCarousel } from './base-carousel';

const CONFIG: ResponsiveType = {
  desktop: {
    breakpoint: { max: 1024, min: 640 },
    partialVisibilityGutter: 0,
    items: 4,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    partialVisibilityGutter: 30,
    items: 1,
  },
};

interface Props {
  propertyTypes: PropertyType[];
}

export const PropertyTypesCarousel = ({ propertyTypes }: Props) => {
  const isHydrated = useHydrated();
  return (
    <BaseCarousel
      ssr
      responsive={CONFIG}
      partialVisible
      className="w-full py-4"
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
      sliderClass="flex sm:w-full sm:grid sm:grid-cols-2 sm:gap-4 lg:flex lg:w-full"
      itemClass={cn('sm:!w-full lg:!max-w-[calc(25%-16px)]', {
        'lg:!w-auto': isHydrated,
      })}
      deviceType="mobile"
    >
      {propertyTypes.map((el, index) => {
        return (
          <div className={'mr-4 h-full sm:mr-0'} key={el.key}>
            <Item {...el} type={el.key} />
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
