import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMachine } from '@xstate/react';
import { type ResponsiveType, type ArrowProps } from 'react-multi-carousel';

import { useAppContext } from '~/common/contexts/app.context';
import { locationRecommendationMachine } from './location-recommendations.state';
import { LoaderItem, MIN_LOADERS_SIZE } from './location-recommendations.loader';
import { Item } from './location-recommendations.item';
import { Error } from './location-recommendations.error';

import { type LocationRecommendation } from './location-recommendations.types';
import { BaseCarousel } from './base-carousel';

const CONFIG: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    partialVisibilityGutter: 30,
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    partialVisibilityGutter: 30,
    items: 1,
  },
};

export const LocationRecommendationCarousel = () => {
  const [state, SEND] = useMachine(locationRecommendationMachine);
  const { locale, country } = useAppContext();
  const [, setIsMoving] = useState(false);

  const isSuccess = state.matches('success') && state.context.results.length > 0;
  const isFailure = state.matches('failure');

  const renderResults = () =>
    state.context.results.map((result: LocationRecommendation, index) => (
      <div className={cn({ 'mr-2': index !== state.context.results.length - 1 })} key={result.id}>
        <Item {...result} />
      </div>
    ));

  const renderLoading = () =>
    Array.from({ length: MIN_LOADERS_SIZE }).map((_, index) => (
      <div className={cn({ 'mr-2': index !== MIN_LOADERS_SIZE - 1 })} key={index}>
        <LoaderItem />
      </div>
    ));

  useEffect(() => {
    if (state.matches('idle')) {
      SEND('FETCH', { nationId: country?.id, locale });
    }
  }, [state, country, locale, SEND]);

  if (isFailure) return <Error />;
  return (
    <BaseCarousel
      responsive={CONFIG}
      partialVisible
      sliderClass="flex"
      beforeChange={() => setIsMoving(true)}
      afterChange={() => setIsMoving(false)}
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
    >
      {isSuccess ? renderResults() : renderLoading()}
    </BaseCarousel>
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
