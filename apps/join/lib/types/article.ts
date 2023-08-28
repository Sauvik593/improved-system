import type { LinkComponent, CreationMetaData, MediaImage } from '@lib/types';

export type ExtendedPostsContent = Article | { type: 'newsletter' | 'ad' };

export interface Author {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  slug: string;
  avatar: MediaImage;
  introduction: string;
  description: string;
}

export interface ArticleContentText {
  __component: 'advice.article-text-block';
  id: number;
  heading_hook: string;
  content: string; // HTML content
}

export interface ArticleContentQuote {
  __component: 'advice.article-block-quote';
  id: number;
  quote: string;
  title: string;
  link: LinkComponent;
}

export interface ArticleContentSearchPanel {
  __component: 'advice.article-block-search-panel';
  id: number;
  title: string;
  cta_link: LinkComponent;
}

export type ArticleContent = ArticleContentText | ArticleContentQuote | ArticleContentSearchPanel;

export interface Comment {
  id: number;
  content: string;
  date: string;
  name: string;
  email: string;
  approved?: boolean;
  parent?: Comment | null;
}

export interface Article extends CreationMetaData {
  id: number;
  title: string;
  introduction: string | null;
  locale: string;
  minute_read: number;
  description: string;
  category: Category;
  article_content: ArticleContent[];
  url: string;
  date: string;
  image: MediaImage;
  featured_image: MediaImage;
  comments: Comment[];
  author: Author;
  type: 'join-article';
  next_article?: Article;
}

export interface CategoryGroup {
  id: number;
  title: string;
  description: string;
  categories: Category[];
  locale: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  country: number;
}

export interface Category {
  id: number;
  name: string;
  title: string;
  description: string;
  category_group: CategoryGroup | number;
  locale: string;
  content: Article[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  url: string;
}
