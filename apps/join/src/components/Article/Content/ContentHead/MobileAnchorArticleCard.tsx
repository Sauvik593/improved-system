import cn from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import NextImage from 'next/image';

import { getAssetsUrl } from '@helpers/assetsUrl';
import type { ArticleContentText } from '@lib/types';

interface Props {
  articleContent: ArticleContentText[];
  className?: string;
}

const ACTIVE_ICON_CLASSNAMES = 'rotate-45 origin-center text-ocean-100';

export const MobileAnchorArticleCard = ({ articleContent, className }: Props) => {
  const { t } = useTranslation('common');
  const classes = cn('p-4 bg-white shadow-card overflow-hidden', className);

  const [active, setActive] = useState(false);

  const toggleActive = (): void => {
    setActive(!active);
  };

  const listClassNames = cn({ ['hidden']: !active });

  return (
    <div className={classes}>
      <div className="flex justify-between">
        <h2 className="text-h-5 text-tile-100 ">{t('content.anchor.title')}</h2>
        <button onClick={toggleActive}>
          <NextImage
            src={getAssetsUrl('/static/content/plus.svg')}
            height={24}
            width={24}
            className={cn({
              [ACTIVE_ICON_CLASSNAMES]: active,
            })}
          />
        </button>
      </div>
      <ul className={listClassNames}>
        {articleContent.map((el) => {
          return (
            <li className="my-4" key={`heading_${el.id}`}>
              <a href={`#heading_${el.id}`} className="text-ocean-100 block">
                {el.heading_hook}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
