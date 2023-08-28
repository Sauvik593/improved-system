import { NextRequest, NextResponse } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';
import { featuresRoutesHandler } from '../../next-rewrites.config';

import { FeaturesMiddleware } from '../../src/middlewares';

jest.mock('../../next-rewrites.config');

const localizedFeaturesUrls = [
  { nextUrl: { pathname: '/join/espana/caracteristicas' } },
  { nextUrl: { pathname: '/join/spagna/caratteristiche' } },
  { nextUrl: { pathname: '/join/espagne/caracteristiques' } },
  { nextUrl: { pathname: '/join/espanha/funcionalidades' } },
];

describe('FeaturesMiddleware', () => {
  describe('condition', () => {
    it('should return true when the condition is met', () => {
      const nextUrl = { pathname: '/join/spain/features' };
      const result = FeaturesMiddleware.condition(nextUrl as NextURL);
      expect(result).toBe(true);
    });

    it('should return false when the condition is not met', () => {
      localizedFeaturesUrls.forEach(({ nextUrl }) => {
        const result = FeaturesMiddleware.condition(nextUrl as NextURL);
        expect(result).toBe(false);
      });
    });
  });

  describe('FeaturesMiddleware.middleware', () => {
    it('should rewrite to 404 when hasRouteFor404 is true', () => {
      const mockHasRouteFor404 = jest.spyOn(featuresRoutesHandler, 'hasRouteFor404');
      mockHasRouteFor404.mockReturnValue(true);

      const nextRequest = {
        nextUrl: { pathname: '/join/espana/features', origin: 'http://localhost:3000' },
      };
      const result = FeaturesMiddleware.middleware(nextRequest as NextRequest);

      expect(result).toEqual(NextResponse.rewrite(new URL('/404', nextRequest.nextUrl.origin)));
      expect(mockHasRouteFor404).toHaveBeenCalledWith({
        pathname: '/join/espana/features',
        routeKey: 'features',
      });
    });

    it('should call NextResponse.next() when hasRouteFor404 is false', () => {
      const mockHasRouteFor404 = jest.spyOn(featuresRoutesHandler, 'hasRouteFor404');
      localizedFeaturesUrls.forEach(({ nextUrl }) => {
        mockHasRouteFor404.mockReturnValue(false);

        const result = FeaturesMiddleware.middleware({ nextUrl } as NextRequest);

        expect(result).toEqual(NextResponse.next());
        expect(mockHasRouteFor404).toHaveBeenCalledWith({
          pathname: nextUrl.pathname,
          routeKey: 'features',
        });
      });
    });
  });
});
