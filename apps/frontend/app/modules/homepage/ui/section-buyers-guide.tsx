import cn from 'classnames';
import { Trans, useTranslation } from 'react-i18next';
import { assetsPathTo } from '~/common/client-router/helpers';
import { useAppContext } from '~/common/contexts/app.context';
import { useNavLinks } from '~/common/hooks/use-nav-links';

import { CurvedSection } from '~/common/ui/curved-section';
import { BannerDecor } from '~/common/ui/patterns/banner-decor';
import { CurveRight } from '~/common/ui/patterns/curve-right';
import { BuyersGuideIntroForm } from '~/modules/marketing/ui/buyers-guide-form';

export const SectionBuyersGuide = () => {
  const { countryName } = useAppContext();
  const { privacy } = useNavLinks();
  const { t } = useTranslation();
  return (
    <CurvedSection
      className="mt-[100px] flex flex-col md:mt-0 md:min-h-[400px] md:flex-row"
      sectionClassName="bg-sunshine-100"
      prevSectionColor="white"
      nextSectionColor="rgb(244, 244, 247)"
    >
      <header className="text-sierra-night-100 order-2 mt-[-200px] md:order-1 md:mt-2 md:max-w-[58%]">
        <h2 className="text-h-2-sm md:text-h-2 text-sierra-night-100 font-bold md:mr-12">
          <Trans i18nKey="common.buyers_guide.section.title" values={{ countryName }} />
        </h2>
        <p className="text-p-1 mt-3">
          <Trans i18nKey="common.buyers_guide.section.subtitle" values={{ countryName }} />
        </p>

        <BuyersGuideIntroForm className="mt-4" />
        <p
          className="mt-8"
          dangerouslySetInnerHTML={{
            __html: t('common.buyers_guide.section.form.privacy', { privacy }),
          }}
        />
      </header>
      <aside
        className={cn(
          'bg-sierra-night-5 z-1 relative -top-[200px] order-1 mx-auto -mt-16 mb-10 h-64 w-full max-w-[400px] overflow-hidden rounded-lg',
          'md:absolute md:right-0 md:top-0 md:z-0 md:order-2 md:mt-0 md:h-full md:w-[40%] md:max-w-none md:overflow-visible md:rounded-none md:pb-0',
          'md:bg-sunshine-100 lg:max-w-3xl',
        )}
      >
        <CurveRight />
        <figure>
          <img
            src={assetsPathTo('/images/buyers-guide/section-bg.jpeg')}
            role="presentation"
            alt=""
            loading="lazy"
            className="curved-right bg-sierra-night-5 pointer-events-none absolute top-0 left-0 h-full w-full max-w-full select-none object-cover object-center"
          />
        </figure>
        <BannerDecor />
      </aside>
    </CurvedSection>
  );
};
