import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { ArrowLink } from '@kyero/ui';

import type { Article as ArticleProps } from '@lib/types';

interface Props {
  nextArticle: ArticleProps;
  className?: string;
}

export const NextArticle = ({ nextArticle, className }: Props) => {
  const { t } = useTranslation('common');
  const classes = cn('bg-white rounded-lg p-4', className);
  return (
    <article className={classes}>
      <p className="text-tile-100 font-bold">{t('content.next_article')}</p>
      <hr className="divider my-2 hidden w-[32px] lg:block" />
      <h2 className="text-h-3-sm text-tile-100 mt-3">{nextArticle.title}</h2>
      <time className="text-sierra-night-60">{nextArticle.publishedAt}</time>
      <div className="my-4">
        <p>{nextArticle.description}</p>
      </div>
      <ArrowLink
        message={t('content.cta.next_article')}
        linkProps={{
          to: nextArticle.url,
        }}
        baseColorClassname="text-ocean-100"
        activeClassName="hover:text-ocean-150 focus:text-ocean-150"
      />
    </article>
  );
};
