import { Outlet } from '@remix-run/react';
import { CookieBar } from '~/modules/tracking/ui/cookie-bar';

export const BaseLayout = () => (
  <main className="bg-sierra-night-10">
    <Outlet />
    <CookieBar />
  </main>
);
