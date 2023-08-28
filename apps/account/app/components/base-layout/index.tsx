import cn from 'classnames';
import { Outlet } from '@remix-run/react';

import { Flash } from '~/modules/flash/components/flash';

import { useNavigationContext } from './navigation.context';

import { Navigation } from './navigation';
import { Topbar } from './top-bar';
import { Footer } from './footer';
import { PageLoader } from '../page-loader';

export const BaseLayout = () => {
  const { layoutExpanded, mobileMenuActive } = useNavigationContext();

  return (
    <main
      className={cn('ease grid min-h-screen grid-cols-[1fr] transition-all', {
        'lg:grid-cols-[0_1fr]': !layoutExpanded,
        'lg:grid-cols-[217px_1fr]': layoutExpanded,
      })}
    >
      <aside
        className={cn(
          'ease fixed top-0 z-20 h-screen w-full transition-all lg:sticky lg:w-[217px]',
          {
            'md:overflow-hidden lg:-translate-x-full': !layoutExpanded,
            'max-lg:-translate-x-full': !mobileMenuActive,
          },
        )}
      >
        <Navigation />
      </aside>
      <div className="flex h-full min-h-screen flex-col overflow-hidden bg-sierra-night-5">
        <PageLoader />
        <section>
          <Topbar />
          <div className="h-full max-w-[1440px] overflow-auto px-4 pt-10 md:px-10">
            <Flash />
            <Outlet />
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
};
