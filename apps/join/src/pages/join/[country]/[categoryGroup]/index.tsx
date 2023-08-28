import { GetStaticPaths, GetStaticProps } from 'next';

import { fetchBuilder } from 'src/helpers/fetchBuilder';
import {
  CategoryGroupService,
  type CategoryGroupProps as Props,
} from '@lib/api/strapi/services/categoryGroupService';
import { CategoryGroupLayout } from '@layouts/CategoryGroupLayout';

export default function CategoryGroup(props: Props) {
  return <CategoryGroupLayout {...props} />;
}

interface CategoryGroupStaticPathsResponse {
  country_slug: string;
  category_group_slug: string;
  locale: string;
  total_count: string;
}

const getBasePaths = (categoryGroup: CategoryGroupStaticPathsResponse) => ({
  params: {
    country: categoryGroup.country_slug,
    categoryGroup: categoryGroup.category_group_slug,
  },
  locale: categoryGroup.locale,
});

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetchBuilder(`join-category-groups/static-paths`);

  const categoryGroups: CategoryGroupStaticPathsResponse[] = await res.json();
  const paths = categoryGroups.map(getBasePaths);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale as string;
  const countrySlug = context?.params?.country as string;
  const slug = context?.params?.categoryGroup as string;

  const service = new CategoryGroupService({
    locale,
    additionalParams: { page: '1' },
  });
  const staticProps = await service.getStaticProps(`${countrySlug}/${slug}`);

  return service.validateStaticProps(staticProps);
};
