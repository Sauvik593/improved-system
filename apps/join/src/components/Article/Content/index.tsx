import { HTMLContent } from './HTMLContent';
import { BlockquoteContent } from './BlockquoteContent';

import { Ad } from '@components/common/Ad';
import { AsideContent } from '../Content/AsideContent';
import { MobileShareCard } from '../ShareCard/Mobile';
import { NextArticle } from './NextArticle';
import { SearchFeatureSection } from '../SearchFeatureSection';

import type { ArticleContent, Article } from '@lib/types';

interface Props {
  article_content: ArticleContent[];
  next_article?: Article;
  title: string;
  url: string;
}

export const Content = ({ article_content, title, url, next_article }: Props) => {
  const renderElement = (content: ArticleContent) => {
    const key = `${content.__component}_${content.id}`;
    switch (content.__component) {
      case 'advice.article-block-quote':
        return <BlockquoteContent {...content} key={key} />;
      case 'advice.article-text-block':
        return <HTMLContent {...content} key={key} />;
      case 'advice.article-block-search-panel':
        return (
          <SearchFeatureSection
            text={content.title}
            cta_link={content.cta_link}
            key={key}
            variant="article"
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      <MobileShareCard url={url} title={title} />
      <section className="container mx-auto pb-10 lg:flex">
        <div className="pt-10 lg:w-8/12">
          {article_content.map(renderElement)}
          {next_article && <NextArticle nextArticle={next_article} className="my-8" />}
        </div>
        <aside className="pt-10 lg:ml-12 lg:w-4/12">
          <AsideContent articleContent={article_content} url={url} title={title} />
        </aside>
      </section>
      <section className="container mx-auto flex lg:hidden">
        <Ad sizeClassName={'h-[360px] md:h-24 w-full'} />
      </section>
    </>
  );
};

Content.displayName = 'ArticleContent';
