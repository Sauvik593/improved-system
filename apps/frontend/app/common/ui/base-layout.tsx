import cn from 'classnames';
import { Outlet } from '@remix-run/react';
import { useGlobalPendingState } from 'remix-utils';

import { CookieBar } from '~/modules/tracking/ui/cookie-bar';
import { MainMenu } from './menu/main-menu';
import { Footer } from '~/common/ui/footer';
import { Modals } from './modals';

export const BaseLayout = () => {
  const state = useGlobalPendingState();

  return (
    <>
      <div
        className={cn('slider', {
          hidden: state === 'idle',
        })}
      >
        <div className="line" />
        <div className="subline inc" />
        <div className="subline dec" />
      </div>
      <MainMenu />
      <main>
        <Outlet />
        <CookieBar />
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
