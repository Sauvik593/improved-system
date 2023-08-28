import cn from 'classnames';
import { useState } from 'react';
import { Button } from '@kyero/ui';
import { sendInstrument } from '~/modules/tracking/instrument';

import { type LocationRecommendation } from './location-recommendations.types';
import { useTranslation } from 'react-i18next';

export const sendSuggestionInstrumentation = () => {
  const event = 'suggested.location.kyero';

  sendInstrument(event);
};

export const Item = ({ id, for_sale_path, name, image_url }: LocationRecommendation) => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const handleLinkClick = (event: Event) => {
    event.preventDefault();
    const link = event.currentTarget as HTMLAnchorElement;

    sendSuggestionInstrumentation();
    window.location.assign(link.href);
  };

  return (
    <article
      className="bg-sierra-night-10 relative z-0 h-[212px] overflow-hidden  rounded-md px-2 lg:h-[288px]"
      data-testid="location-recommendation.item"
    >
      <figure role="presentation" className="-z-1">
        <img
          src={image_url}
          alt={name}
          onLoad={() => {
            setLoaded(true);
          }}
          loading="lazy"
          className={cn(
            '-z-1  pointer-events-none absolute inset-0 h-full w-full select-none object-cover transition-opacity delay-100 duration-200',
            {
              'opacity-100': loaded,
              'opacity-0': !loaded,
            },
          )}
        />
        <div className="-z-1 card-gradient absolute inset-0 h-full w-full" />
      </figure>
      <div className="flex h-full flex-col justify-between p-4">
        <h3 className="text-h-5 font-bold text-white">{name}</h3>
        <Button
          variant="full"
          fullWidth
          buttonType="blue"
          message={t('common.homepage.recommended_locations.cta')}
          className="mt-auto"
          // @ts-ignore
          linkProps={{ to: for_sale_path, onClick: handleLinkClick }}
        />
      </div>
    </article>
  );
};
