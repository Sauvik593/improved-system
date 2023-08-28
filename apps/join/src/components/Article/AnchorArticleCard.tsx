import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import type { ArticleContentText } from '@lib/types';

interface Props {
  articleContent?: ArticleContentText[];
  className?: string;
}

export const AnchorArticleCard = ({ articleContent, className }: Props) => {
  const { t } = useTranslation('common');
  const classes = cn('p-4 bg-white shadow-card rounded-lg', className);

  return (
    <div className={classes}>
      <h2 className="text-h-4-sm xl:text-h-3-sm text-tile-100 ">{t('content.anchor.title')}</h2>
      <ul className="max-h-[30vh] overflow-auto xl:max-h-[50vh]">
        {articleContent?.map((el) => {
          return (
            <li className="my-2 lg:my-4" key={`heading_${el.id}`}>
              <a
                href={`#heading_${el.id}`}
                className="text-ocean-100 text-h-5 xl:text-h-4-sm block"
              >
                {el.heading_hook}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
