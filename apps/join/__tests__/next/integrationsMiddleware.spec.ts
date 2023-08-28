import { NextRequest, NextResponse } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';
import { integrationsRoutesHandler } from '../../next-rewrites.config';

import { IntegrationsMiddleware } from '../../src/middlewares';

jest.mock('../../next-rewrites.config');

const localizedIntegrationsUrls = [
  { nextUrl: { pathname: '/join/espana/caracteristicas/integraciones' } },
  { nextUrl: { pathname: '/join/spagna/caratteristiche/integrazioni' } },
  { nextUrl: { pathname: '/join/espagne/caracteristiques/integrations' } },
  { nextUrl: { pathname: '/join/espanha/funcionalidades/integracoes' } },
];

describe('IntegrationsMiddleware', () => {
  describe('condition', () => {
    it('should return true when the condition is met', () => {
      const nextUrl = { pathname: '/join/spain/features/integrations' };
      const result = IntegrationsMiddleware.condition(nextUrl as NextURL);
      expect(result).toBe(true);
    });

    it('should return false when the condition is not met', () => {
      localizedIntegrationsUrls.forEach(({ nextUrl }) => {
        const result = IntegrationsMiddleware.condition(nextUrl as NextURL);
        expect(result).toBe(false);
      });
    });
  });

  describe('IntegrationsMiddleware.middleware', () => {
    it('should rewrite to 404 when hasRouteFor404 is true', () => {
      const mockHasRouteFor404 = jest.spyOn(integrationsRoutesHandler, 'hasRouteFor404');
      mockHasRouteFor404.mockReturnValue(true);

      const nextRequest = {
        nextUrl: {
          pathname: '/join/espana/features/integrations',
          origin: 'http://localhost:3000',
        },
      };
      const result = IntegrationsMiddleware.middleware(nextRequest as NextRequest);

      expect(result).toEqual(NextResponse.rewrite(new URL('/404', nextRequest.nextUrl.origin)));
      expect(mockHasRouteFor404).toHaveBeenCalledWith({
        pathname: '/join/espana/features/integrations',
        routeKey: 'integrations',
      });
    });

    it('should call NextResponse.next() when hasRouteFor404 is false', () => {
      const mockHasRouteFor404 = jest.spyOn(integrationsRoutesHandler, 'hasRouteFor404');

      localizedIntegrationsUrls.forEach(({ nextUrl }) => {
        mockHasRouteFor404.mockReturnValue(false);
        const result = IntegrationsMiddleware.middleware({ nextUrl } as NextRequest);
        expect(result).toEqual(NextResponse.next());
        expect(mockHasRouteFor404).toHaveBeenCalledWith({
          pathname: nextUrl.pathname,
          routeKey: 'integrations',
        });
      });
    });
  });
});
