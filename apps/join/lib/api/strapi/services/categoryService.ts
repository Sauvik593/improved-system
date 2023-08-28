import { BaseStrapiService } from '../baseStrapiService';

import type { Article, CategoryGroup, Country, Localization, SeoConfig } from '@lib/types';

export interface CategoryResponse {
  id: number;
  name: string;
  title: string;
  description: string;
  locale: string;
  content: Article[];
  country: Country;
  category_group: CategoryGroup;
  items_per_page: number;
  current_page: number;
  total_pages: number;
  url: string;
  localizations: Localization[];
  seo: SeoConfig;
  navigationLinks: {
    name: string;
    url: string;
  }[];
}

export type CategoryPropsPromise = ReturnType<CategoryService['getStaticProps']>;
export type CategoryProps = Awaited<CategoryPropsPromise>['props'];

export class CategoryService extends BaseStrapiService<CategoryResponse> {
  getResourceUrl(search_param: string) {
    return `join-categories/${search_param}`;
  }
}
