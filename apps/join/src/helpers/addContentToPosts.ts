import type { ExtendedPostsContent } from '@lib/types';

interface Props {
  posts: ExtendedPostsContent[];
  newsletterIndex?: number;
  adIndex?: number;
}

export const addContentToPosts = ({ posts, newsletterIndex, adIndex }: Props) => {
  return posts.reduce((acc: ExtendedPostsContent[], post, index): any => {
    switch (index) {
      case newsletterIndex:
        return [...acc, post, { type: 'newsletter' }];
      case adIndex:
        return [...acc, post, { type: 'ad' }];
      default:
        return [...acc, post];
    }
  }, []);
};
