import { GetStaticPaths, GetStaticProps } from 'next';

import { fetchBuilder } from 'src/helpers/fetchBuilder';
import { ArticleShowLayout } from '@layouts/ArticleShowLayout';
import {
  ArticleService,
  type ArticleProps as Props,
} from '@lib/api/strapi/services/articleService';

interface ArticleStaticPaths {
  locale: string;
  country_slug: string;
  category_group_slug: string;
  category_slug: string;
  slug: string;
}

const getBasePaths = (article: ArticleStaticPaths) => ({
  params: {
    country: article.country_slug,
    categoryGroup: article.category_group_slug,
    category: article.category_slug,
    slug: article.slug,
  },
  locale: article.locale,
});

export default function ArticleShow(props: Props) {
  return <ArticleShowLayout {...props} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetchBuilder(`join-articles/static-paths`);
  const articles = await res.json();

  const paths = articles.map(getBasePaths);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale as string;
  const slug = context?.params?.slug as string;
  const preview = context.preview;

  const service = new ArticleService({ locale, preview });
  const staticProps = await service.getStaticProps(slug);

  return service.validateStaticProps(staticProps);
};
