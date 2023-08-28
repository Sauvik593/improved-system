import { createRewriteMiddleware } from './middlewareUtils';
import { featuresRoutesHandler } from '../../next-rewrites.config';
import { NextURL } from 'next/dist/server/web/next-url';

export const FeaturesMiddleware = {
  condition: (nextUrl: NextURL) => nextUrl.pathname.includes('/features'),
  middleware: createRewriteMiddleware(featuresRoutesHandler, 'features'),
};
