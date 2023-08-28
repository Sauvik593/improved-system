import { Ad } from '@components/common/Ad';
import { Newsletter } from '@components/Articles/Newsletter';
import { ArticleCard } from '@components/Articles/ArticleCard';
import type { ExtendedPostsContent } from '@lib/types';

export function getContentComponent(element: ExtendedPostsContent) {
  switch (element.type) {
    case 'join-article':
      return <ArticleCard {...element} />;
    case 'newsletter':
      return <Newsletter />;
    case 'ad':
      return <Ad sizeClassName="h-full" />;
    default:
      return null;
  }
}
