import { useMemo } from 'react';
import NextImage from 'next/image';

import { ContentInfo } from './ContentInfo';

import type { ArticleContent, ArticleContentText, Author, MediaImage } from '@lib/types';
import { MobileAnchorArticleCard } from './MobileAnchorArticleCard';
import { Media } from '@lib/api/strapi/media';

interface Props {
  title: string;
  author: Author;
  date: string;
  time: number;
  comments_size: number;
  introduction: string | null;
  article_content: ArticleContent[];
  image: MediaImage;
}

export const ContentHead = ({
  article_content,
  title,
  author,
  date,
  time,
  comments_size,
  introduction,
  image,
}: Props) => {
  const htmlContent = useMemo(
    () =>
      article_content?.filter(
        (element: ArticleContent) => element.__component === 'advice.article-text-block',
      ) as ArticleContentText[],
    [article_content],
  );
  const heading_hooks = htmlContent?.filter((el) => el.heading_hook);
  const imageUrl = Media.getImageResizedUrl({ formatName: 'medium', size: 'article', image });
  const placeholder = Media.getImagePlaceholder(image);
  return (
    <>
      <section className="container mx-auto overflow-hidden">
        <div className="md:grid md:grid-cols-2 md:gap-x-8">
          <div className="mb-4 md:col-span-1">
            <h1 className="text-h-2 text-tile-100 mb-4 font-bold">{title}</h1>
            <ContentInfo author={author} date={date} time={time} comments_size={comments_size} />
            <div className="text-h-5 mx-auto mt-4 hidden leading-[28px] md:block">
              <div dangerouslySetInnerHTML={{ __html: introduction || '' }} />
            </div>
          </div>
          <figure className="flex max-h-[530px] justify-center overflow-hidden md:col-span-1 md:justify-end">
            <NextImage
              src={imageUrl}
              alt={image.alternativeText}
              objectFit="cover"
              className="bg-sierra-night-20 md:rounded-lg"
              width="490px"
              height="530px"
              placeholder="blur"
              blurDataURL={placeholder}
            />
          </figure>
        </div>
      </section>
      {heading_hooks && (
        <MobileAnchorArticleCard className="md:hidden" articleContent={htmlContent} />
      )}
      <div className="text-h-5 container mx-auto mt-4 leading-[28px] md:hidden">
        <div dangerouslySetInnerHTML={{ __html: introduction || '' }} />
      </div>
    </>
  );
};

ContentHead.displayName = 'ContentHead';
