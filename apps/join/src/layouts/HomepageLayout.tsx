import { Hero } from '@components/common/Hero';
import { BasePageLayout } from './BasePageLayout';
import type { CountryNeutralProps as Props } from 'src/pages/join';
import { Testimonials } from '@components/Testimonials';
import { CountryCards } from '@components/Homepage/CountryCards';
import { TrustboxContainer } from '@components/Trustbox';

import { useTranslation } from 'next-i18next';

export const HomepageLayout = (props: Props) => {
  const { t } = useTranslation('common');
  return (
    <BasePageLayout
      {...props}
      title={t('seo.homepage.country_neutral.title')}
      description={t('seo.homepage.country_neutral.description')}
    >
      <Hero
        type="left"
        paddingClassName="pt-16 pb-32 md:pb-52"
        title={t('homepage.country_neutral.hero.title')}
        description={t('homepage.country_neutral.hero.description')}
      />
      <CountryCards />
      <Testimonials testimonialsSeed={props.testimonialsSeed} />
      <TrustboxContainer />
    </BasePageLayout>
  );
};
