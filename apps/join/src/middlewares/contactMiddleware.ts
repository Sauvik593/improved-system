import { createRewriteMiddleware } from './middlewareUtils';
import { contactRoutesHandler } from '../../next-rewrites.config';

import { NextURL } from 'next/dist/server/web/next-url';

export const ContactMiddleware = {
  condition: (nextUrl: NextURL) => {
    const splittedPathname = nextUrl.pathname.split('/');
    const lastPathPart = splittedPathname[splittedPathname.length - 1];
    if (lastPathPart === 'contact') {
      return true;
    }
    return false;
  },
  middleware: createRewriteMiddleware(contactRoutesHandler, 'contact'),
};
