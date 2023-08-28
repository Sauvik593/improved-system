import { BaseStrapiService } from '../baseStrapiService';

import type { Article, Category, Localization, SeoConfig } from '@lib/types';

export interface CategoryGroupResponse {
  id: number;
  name: string;
  title: string;
  description: string;
  locale: string;
  content: Article[];
  country: number;
  categories: Category[];
  items_per_page: number;
  current_page: number;
  total_pages: number;
  url: string;
  seo: SeoConfig;
  localizations: Localization[];
  navigationLinks: {
    name: string;
    url: string;
  }[];
}

export type CategoryGroupPropsPromise = ReturnType<CategoryGroupService['getStaticProps']>;
export type CategoryGroupProps = Awaited<CategoryGroupPropsPromise>['props'];

export class CategoryGroupService extends BaseStrapiService<CategoryGroupResponse> {
  getResourceUrl(search_param: string) {
    return `join-category-groups/${search_param}`;
  }
}
