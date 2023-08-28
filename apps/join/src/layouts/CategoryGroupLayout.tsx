import { BasePageLayout } from './BasePageLayout';

import type { CategoryGroupProps as Props } from '@lib/api/strapi/services/categoryGroupService';

import { Hero } from '@components/common/Hero';
import { Subscribe } from '@components/Subscribe';
import { ArticlesNavigation } from '@components/Articles/ArticlesNavigation';
import { Posts } from '@components/common/Posts';

export const CategoryGroupLayout = ({
  locale,
  locales,
  country,
  countries,
  applicationSettings,
  response: {
    title,
    name,
    description,
    content,
    localizations,
    url,
    seo,
    navigationLinks,
    current_page,
    total_pages,
  },
}: Props) => {
  return (
    <BasePageLayout
      applicationSettings={applicationSettings}
      className="bg-auto"
      countries={countries}
      country={country}
      locale={locale}
      locales={locales}
      seo={seo}
      localizations={localizations}
      url={url}
      title={title}
      description={description}
    >
      <section className="bg-sierra-night-5 relative">
        <Hero description={description} title={title} type="left">
          <ArticlesNavigation activeName={name} links={navigationLinks} />
        </Hero>
        <Posts content={content} totalPages={total_pages} currentPage={current_page} url={url} />
        <Subscribe />
      </section>
    </BasePageLayout>
  );
};
