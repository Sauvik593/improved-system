import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { InfoIcon } from '@kyero/icons';

import { PopularityScore } from '~/modules/properties/types';

export interface Props {
  popularity: PopularityScore;
}

export const PopularityBadge = ({ popularity }: Props) => {
  const { t } = useTranslation();
  const translatedPopularityScore = t(`ui.popularityScore.${popularity}`);

  const colorClassName = {
    ['bg-meadow-100 text-white']: popularity === 'high',
    ['bg-sky-150 text-white']: popularity === 'mid',
    ['bg-orange-100 text-white']: popularity === 'low',
  };

  return (
    <span
      className={cn(
        'flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-p-3',
        colorClassName,
      )}
    >
      <i>
        <InfoIcon size={18} color="text-white" />
      </i>
      {translatedPopularityScore}
    </span>
  );
};
