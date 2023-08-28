import { MainMenu } from '~/common/ui/menu/main-menu';
import { Footer } from '~/common/ui/footer';
import { Modals } from '~/common/ui/modals';

import ErrorImage from '~/modules/errors/images/error.svg';
import { useAppContext } from '~/common/contexts/app.context';
import { useEffect } from 'react';
import { Trans } from 'react-i18next';

interface Props {
  message: string;
  status?: number | undefined;
}

export const ErrorLayout = ({ status, message }: Props) => {
  const { routeLinks } = useAppContext();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      window.scrollY = 0;
    }
  }, []);

  return (
    <>
      <MainMenu />
      <main className="min-h-max text-center" data-testid="not-found-page">
        <div className="flex min-h-screen items-center justify-center py-4">
          <article className="text-sierra-night-100 text-center sm:w-1/2 lg:w-1/3 xl:w-1/4 ">
            <img src={ErrorImage} alt="Error" className="mx-auto" width={162} height={324} />
            <h1 className="text-sierra-night-40 mt-2 font-bold">
              <Trans i18nKey={message} />
            </h1>
            <h2 className="text-h-4-sm md:text-h-4 mt-2 font-bold ">
              <Trans i18nKey={'common.errors.title'} />
            </h2>
            <div className="mt-6 text-left">
              <strong>
                <Trans i18nKey="common.errors.links.helpful_links" />
              </strong>
              <ul className="mt-2 flex flex-col gap-2">
                {[
                  [
                    routeLinks.internal.homepage,
                    <Trans i18nKey={'common.errors.links.homepage_link'} key="home" />,
                  ],
                  [
                    routeLinks.internal.properties_for_sale['spain'],
                    <Trans i18nKey={'common.errors.links.for_sale_spain_link'} key="spain_sale" />,
                  ],
                  [
                    routeLinks.internal.properties_to_rent['spain'],
                    <Trans i18nKey={'common.errors.links.for_rent_spain_link'} key="spain_rent" />,
                  ],
                  [
                    routeLinks.internal.properties_for_sale['portugal'],
                    <Trans
                      i18nKey={'common.errors.links.for_sale_portugal_link'}
                      key="portugal_sale"
                    />,
                  ],
                  [
                    routeLinks.internal.properties_for_sale['france'],
                    <Trans
                      i18nKey={'common.errors.links.for_sale_france_link'}
                      key="france_sale"
                    />,
                  ],
                  [
                    routeLinks.external.join,
                    <Trans i18nKey={'common.errors.links.advertise_link'} key="join" />,
                  ],
                  [
                    routeLinks.external.support,
                    <Trans i18nKey={'common.errors.links.support_link'} key="support" />,
                  ],
                ].map(([href, Element]) => (
                  <li key={href as string}>
                    <a
                      href={href as string}
                      className="underline hover:text-orange-100 focus:text-orange-100"
                    >
                      {Element}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </main>
      <Footer />
      <Modals />
      <svg
        height="0"
        width="0"
        viewBox="0 0 1440 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 0, height: 0 }}
      >
        <defs>
          <clipPath id="curve" clipPathUnits="objectBoundingBox">
            <path d="M1,0 H0 V0.952 C0.041,0.98,0.496,1,1,0.919 V0"></path>
          </clipPath>
        </defs>
      </svg>
    </>
  );
};
