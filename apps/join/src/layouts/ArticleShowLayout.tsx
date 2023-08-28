import { BasePageLayout } from './BasePageLayout';

import { Content } from '@components/Article/Content';
import { ContentHead } from '@components/Article/Content/ContentHead';
import { Comments } from '@components/Comments';
import { Subscribe } from '@components/Subscribe';
import { ArticleProps as Props } from '@lib/api/strapi/services/articleService';

export const ArticleShowLayout = ({
  locale,
  locales,
  country,
  countries,
  applicationSettings,
  response: {
    id,
    title,
    introduction,
    article_content,
    comments,
    author,
    date,
    minute_read,
    url,
    localizations,
    next_article,
    seo,
    image,
  },
}: Props) => {
  return (
    <BasePageLayout
      applicationSettings={applicationSettings}
      country={country}
      countries={countries}
      locale={locale}
      locales={locales}
      localizations={localizations}
      url={url}
      seo={seo}
      title={title}
      description={introduction}
    >
      <section className="pt-4">
        <ContentHead
          title={title}
          author={author}
          date={date}
          time={minute_read}
          comments_size={comments.length}
          introduction={introduction}
          article_content={article_content}
          image={image}
        />
        <Content
          article_content={article_content}
          next_article={next_article}
          title={title}
          url={url}
        />
        <Comments comments={comments} id={id} />
        <Subscribe />
      </section>
    </BasePageLayout>
  );
};
