import { LogoWide } from '@kyero/icons';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ClientOnly } from 'remix-utils';
import { FooterBottomSection } from './bottom-section';

import { assetsPathTo } from '~/common/client-router/helpers';
import { useNavLinks } from '~/common/hooks/use-nav-links';
import { Trans } from 'react-i18next';

import BcorpLogo from '~/../public/images/socials/bcorp.svg';

export const Footer = () => {
  const [isInView, setIsInView] = useState(false);
  const { footerLinks, advertiseLink, aboutUs, social } = useNavLinks();

  const { ref } = useInView({
    fallbackInView: true,
    onChange: (inView, entry) => {
      setIsInView(inView);
    },
  });

  return (
    <footer ref={ref}>
      <section className="border-t-1 border-sierra-night-10 relative bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-[1176px] overflow-hidden px-5">
          <section className="flex flex-col gap-6 sm:grid sm:grid-cols-[1fr_1fr] sm:grid-rows-[max-content_max-content_max-content] sm:gap-5 lg:grid-cols-[340px_1fr]  lg:grid-rows-[max-content_max-content] lg:gap-6">
            <a href="/" className="sm:order-1">
              <LogoWide variant="dark" width={120} />
            </a>
            <div className="grid grid-cols-[max-content_1fr] gap-4 sm:order-3 sm:col-span-2 lg:col-span-1">
              <img
                src={BcorpLogo}
                alt="Bcorp logo"
                loading="lazy"
                width={56}
                height={87}
                className="bg-sierra-night-5"
              />
              <aside>
                <p>
                  <Trans i18nKey="common.footer.bcorp.copy" />
                </p>
                <a href={aboutUs} className="text-ocean-100 mt-2 block underline">
                  <Trans i18nKey="common.footer.bcorp.cta" />
                </a>
              </aside>
            </div>
            <ul className="flex gap-4 sm:order-2 sm:ml-auto">
              {[
                ['facebook', social.facebook],
                ['twitter', social.twitter],
                ['instagram', social.instagram],
                ['youtube', social.youtube],
                ['pinterest', social.pinterest],
                ['linkedin', social.linkedin],
              ].map(([social, link]) => {
                return (
                  <li key={social}>
                    <a href={link} className="block" rel="noopener noreferrer" target="_blank">
                      <img
                        src={assetsPathTo(`/images/socials/${social}.svg`)}
                        alt={social}
                        loading="lazy"
                        width={32}
                        height={32}
                        className="bg-sierra-night-10 overflow-hidden rounded-full"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
            <nav className="flex flex-col gap-4 sm:order-4 sm:col-span-2 sm:grid sm:grid-cols-4 lg:col-span-1">
              {footerLinks.map(({ title, links }) => {
                return (
                  <div key={title}>
                    <h3 className="text-h-4-sm text-sierra-night-100 sm:text-h-5 font-bold">
                      {title}
                    </h3>
                    <ul className="text-sierra-night-100 mt-1 sm:mt-2">
                      {links.map(([title, link]) => {
                        return (
                          <li key={`${title}-${link}-footer`} className="my-1 w-full">
                            <a
                              href={link}
                              className="text-p-2 block w-full  hover:text-orange-100 focus:text-orange-100"
                            >
                              {title}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
              <div className="text-sierra-night-100">
                <h3 className="text-h-4-sm text-sierra-night-100 sm:text-h-5 font-bold">
                  <Trans i18nKey="common.footer.sections.for_agents.title" />
                </h3>
                <a
                  href={advertiseLink}
                  className="text-p-2 mt-1 block w-full hover:text-orange-100 focus:text-orange-100"
                >
                  <Trans i18nKey="common.footer.sections.for_agents.cta" />
                </a>
              </div>
            </nav>
          </section>
        </div>
      </section>
      <FooterBottomSection
        visible={isInView}
        visibleClassNames="sm:opacity-100"
        invisibleClassNames="sm:opacity-0"
        className="border-t-1 border-sierra-night-10"
      />
      <ClientOnly fallback={null}>
        {() => {
          const isDesktopOrTablet = window.innerWidth >= 768;

          return isDesktopOrTablet ? (
            <FooterBottomSection
              visible={!isInView}
              invisibleClassNames="md:translate-y-full"
              className="bottom-0 left-0 z-10 w-full bg-white md:fixed"
            />
          ) : null;
        }}
      </ClientOnly>
    </footer>
  );
};
