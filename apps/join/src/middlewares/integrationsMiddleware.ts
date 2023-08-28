import { createRewriteMiddleware } from './middlewareUtils';
import { integrationsRoutesHandler } from '../../next-rewrites.config';

import { NextURL } from 'next/dist/server/web/next-url';

export const IntegrationsMiddleware = {
  condition: (nextUrl: NextURL) => nextUrl.pathname.includes('/features/integrations'),
  middleware: createRewriteMiddleware(integrationsRoutesHandler, 'integrations'),
};
