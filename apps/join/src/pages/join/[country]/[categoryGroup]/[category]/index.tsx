import { GetStaticPaths, GetStaticProps } from 'next';

import { fetchBuilder } from 'src/helpers/fetchBuilder';
import {
  CategoryService,
  type CategoryProps as Props,
} from '@lib/api/strapi/services/categoryService';
import { CategoryLayout } from '@layouts/CategoryLayout';

export default function Category(props: Props) {
  return <CategoryLayout {...props} />;
}

interface CategoryStaticPathsResponse {
  country_slug: string;
  category_group_slug: string;
  category_slug: string;
  locale: string;
  total_count: string;
}

const getBasePaths = (category: CategoryStaticPathsResponse) => ({
  params: {
    country: category.country_slug,
    categoryGroup: category.category_group_slug,
    category: category.category_slug,
  },
  locale: category.locale,
});

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetchBuilder(`join-categories/static-paths`);

  const categories: CategoryStaticPathsResponse[] = await res.json();
  const paths = categories.map(getBasePaths);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale as string;
  const countrySlug = context?.params?.country as string;
  const slug = context?.params?.category as string;

  const service = new CategoryService({
    locale,
    additionalParams: { page: '1' },
  });
  const staticProps = await service.getStaticProps(`${countrySlug}/${slug}`);

  return service.validateStaticProps(staticProps);
};
