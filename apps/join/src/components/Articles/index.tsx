import React from 'react';
import { Article, ExtendedPostsContent } from '@lib/types';
import { addContentToPosts } from '@helpers/addContentToPosts';
import { getContentComponent } from '@helpers/getContentComponent';

interface Props {
  content: Article[];
}

const NEWSLETTER_INDEX_POSITION = 7;
const AD_INDEX_POSITION = 8;

export const Articles = ({ content }: Props) => {
  const pageContent: ExtendedPostsContent[] = addContentToPosts({
    posts: content,
    newsletterIndex: NEWSLETTER_INDEX_POSITION,
    adIndex: AD_INDEX_POSITION,
  });
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {pageContent.map((element, index: number) => {
        const Component = getContentComponent(element);

        return (
          <li
            key={`${index}_${element.type}`}
            className="min-h-[300px] md:min-h-[470px]"
            data-testid="card"
          >
            {Component}
          </li>
        );
      })}
    </ul>
  );
};
