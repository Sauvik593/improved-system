import { NextRequest } from 'next/server';

import {
  AssetsMiddleware,
  ContactMiddleware,
  FeaturesMiddleware,
  IntegrationsMiddleware,
  TellUsAboutMiddleware,
  PricingMiddleware,
} from './middlewares';

export function middleware(req: NextRequest) {
  const { nextUrl } = req;

  for (const middlewareObject of [
    AssetsMiddleware,
    ContactMiddleware,
    FeaturesMiddleware,
    IntegrationsMiddleware,
    TellUsAboutMiddleware,
    PricingMiddleware,
  ]) {
    if (middlewareObject.condition(nextUrl)) {
      return middlewareObject.middleware(req);
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - new-join/api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     * - _next (Next.js files)
     */
    '/((?!new-join/api|static|favicon.ico|_next).*)',
  ],
};
