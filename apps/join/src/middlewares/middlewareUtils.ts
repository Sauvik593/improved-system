import { pipe, prop, ifElse } from 'ramda';
import { NextResponse, NextRequest } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';

const rewriteTo404 = (url: NextURL) => NextResponse.rewrite(new URL('/404', url.origin));
const nextResponse = () => NextResponse.next();

export const createRewriteMiddleware =
  (routesHandler: any, routeKey: string) => (NextRequest: NextRequest) => {
    const hasRouteFor404 = (nextUrl: NextURL) =>
      routesHandler.hasRouteFor404({
        pathname: nextUrl.pathname,
        locale: nextUrl.locale,
        routeKey: routeKey,
      });

    return pipe(
      prop<'nextUrl', string | number | symbol>('nextUrl'),
      ifElse(hasRouteFor404, () => rewriteTo404(NextRequest.nextUrl), nextResponse),
    )(NextRequest);
  };
