import { useMemo } from 'react';
import { ShareCard } from '../ShareCard';
import { Ad } from '@components/common/Ad';
import { AnchorArticleCard } from '../AnchorArticleCard';

import type { ArticleContent, ArticleContentText } from '@lib/types';

interface Props {
  url: string;
  title: string;
  articleContent?: ArticleContent[];
}

export const AsideContent = ({ articleContent, title, url }: Props) => {
  const htmlContent = useMemo(
    () =>
      articleContent?.filter(
        (element: ArticleContent) => element.__component === 'advice.article-text-block',
      ) as ArticleContentText[],
    [articleContent],
  );
  const heading_hooks = htmlContent?.filter((el) => el.heading_hook);

  return (
    <div className="sticky top-[130px] flex flex-col items-stretch">
      <ShareCard url={url} title={title} />
      {heading_hooks.length > 0 && (
        <AnchorArticleCard className="mt-8 hidden md:block" articleContent={htmlContent} />
      )}
      <Ad sizeClassName={'h-[360px] w-full'} className="mx-auto mt-8 hidden lg:flex" />
    </div>
  );
};
