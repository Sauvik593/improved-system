import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { type ResponsiveType, type ArrowProps } from 'react-multi-carousel';

import { AdviceArticleCard } from '../advice-article-card';

import { type Guide } from '~/modules/homepage/api/get-guides.server';
import { useHydrated } from 'remix-utils';
import { AdviceLocationCard } from '../advice-location-card';
import { BaseCarousel } from './base-carousel';

const CONFIG: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
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

interface Props {
  elements: Guide[];
}

export const GuidesCarousel = (props: Props) => {
  const isHydrated = useHydrated();
  const renderResults = () =>
    props.elements.map((result, index) => (
      <div className={cn('mr-5 h-full lg:mr-0')} key={index}>
        {result.type === 'article' && <AdviceArticleCard {...result} />}
        {result.type === 'location' && <AdviceLocationCard {...result} />}
      </div>
    ));

  return (
    <div className="relative">
      <BaseCarousel
        responsive={CONFIG}
        partialVisible
        sliderClass="flex lg:w-full lg:gap-5"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        itemClass={cn(
          'max-w-[calc(100%-40px)] sm:max-w-[calc(50%-30px)] lg:max-w-[calc(33%-10px)] py-2 h-auto',
          {
            '!max-w-[none]': isHydrated,
          },
        )}
        className="w-full"
        deviceType="mobile"
        ssr
      >
        {renderResults()}
      </BaseCarousel>
    </div>
  );
};

const CustomLeftArrow = ({ onClick }: ArrowProps) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-0 h-full w-[30px]"
      aria-label={t('common.ui.prev') as string}
      data-testid="location-recommendation.left-button"
    />
  );
};

const CustomRightArrow = ({ onClick }: ArrowProps) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-0 h-full w-[30px] sm:w-[60px]"
      aria-label={t('common.ui.next') as string}
      data-testid="location-recommendation.right-button"
    />
  );
};
