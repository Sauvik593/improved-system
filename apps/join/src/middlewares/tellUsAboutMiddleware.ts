import { createRewriteMiddleware } from './middlewareUtils';
import { tellUsAboutRoutesHandler } from '../../next-rewrites.config';

import { NextURL } from 'next/dist/server/web/next-url';

export const TellUsAboutMiddleware = {
  condition: (nextUrl: NextURL) => nextUrl.pathname.includes('/tell-us-about'),
  middleware: createRewriteMiddleware(tellUsAboutRoutesHandler, 'tell-us-about'),
};
