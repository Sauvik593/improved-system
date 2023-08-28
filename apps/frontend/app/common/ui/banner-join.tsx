import { ArrowLink } from '@kyero/ui';
import { useAppContext } from '../contexts/app.context';
import { Trans, useTranslation } from 'react-i18next';
import { useNavLinks } from '../hooks/use-nav-links';

import JoinDesktop from '~/../public/images/join-banner-desktop.png';
import JoinDesktopRetina from '~/../public/images/join-banner-desktop@2x.png';
import JoinMobile from '~/../public/images/join-banner-mobile.png';
import JoinMobileRetina from '~/../public/images/join-banner-mobile@2x.png';

export const BannerJoin = () => {
  const { countryName } = useAppContext();
  const { join } = useNavLinks();
  const { t } = useTranslation();
  return (
    <article className="bg-sierra-night-100 mb-[-160px] flex w-full translate-y-[-160px] flex-col rounded-lg p-5 text-white md:relative md:mb-[-130px] md:translate-y-[-130px] md:flex-row md:p-10">
      <div className="order-2 md:order-1 md:max-w-[60%]">
        <h3 className="text-h-3-sm md:text-h-3 font-bold">
          <Trans i18nKey="common.homepage.join_section.title" values={{ countryName }} />
        </h3>
        <p className="my-2">
          <Trans i18nKey="common.homepage.join_section.copy" />
        </p>
        <ArrowLink
          message={t('common.homepage.join_section.cta', { countryName }) as string}
          linkProps={{ to: join }}
          baseColorClassname="text-sky-100"
          activeClassName="text-sky-150"
          className="mt-2 flex"
        />
      </div>
      <aside className="order-1 md:order-2">
        <picture>
          <source media="(max-width: 799px)" srcSet={`${JoinMobile}, ${JoinMobileRetina} 2x`} />
          <img
            src={JoinDesktop}
            srcSet={`${JoinDesktop}, ${JoinDesktopRetina} 2x`}
            alt=""
            loading="lazy"
            className="mt-[-60px] h-48 object-fill md:absolute md:right-4 md:-top-8 md:mt-0 md:h-64"
            role="presentation"
          />
        </picture>
      </aside>
    </article>
  );
};
