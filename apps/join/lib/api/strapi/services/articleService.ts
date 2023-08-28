import { Article, Localization, SeoConfig } from '@lib/types';
import { BaseStrapiService } from '../baseStrapiService';

interface ArticleServiceProps extends Article {
  localizations: Localization[];
  seo: SeoConfig;
}

export type ArticlePropsPromise = ReturnType<ArticleService['getStaticProps']>;
export type ArticleProps = Awaited<ArticlePropsPromise>['props'];

export class ArticleService extends BaseStrapiService<ArticleServiceProps> {
  getResourceUrl(slug: string) {
    return `join-articles/${slug}`;
  }
}
