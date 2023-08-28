import { pricingRoutesHandler } from '../../next-rewrites.config';

import { NextURL } from 'next/dist/server/web/next-url';

import { createRewriteMiddleware } from './middlewareUtils';

export const PricingMiddleware = {
  condition: (nextUrl: NextURL) => nextUrl.pathname.includes('/pricing'),
  middleware: createRewriteMiddleware(pricingRoutesHandler, 'pricing'),
};
