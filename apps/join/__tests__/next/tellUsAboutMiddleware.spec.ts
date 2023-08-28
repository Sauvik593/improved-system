import { NextRequest, NextResponse } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';
import { tellUsAboutRoutesHandler } from '../../next-rewrites.config';

import { TellUsAboutMiddleware } from '../../src/middlewares';

jest.mock('../../next-rewrites.config');

const localizedTellUsAboutUrls = [
  { nextUrl: { pathname: '/join/espana/cuentanos-sobre' } },
  { nextUrl: { pathname: '/join/spagna/raccontaci-di-te' } },
  { nextUrl: { pathname: '/join/espagne/parlez-nou' } },
  { nextUrl: { pathname: '/join/espanha/fale-nos-sobre' } },
];

describe('TellUsAboutMiddleware', () => {
  describe('condition', () => {
    it('should return true when the condition is met', () => {
      const nextUrl = { pathname: '/join/spain/tell-us-about' };
      const result = TellUsAboutMiddleware.condition(nextUrl as NextURL);
      expect(result).toBe(true);
    });

    it('should return false when the condition is not met', () => {
      localizedTellUsAboutUrls.forEach(({ nextUrl }) => {
        const result = TellUsAboutMiddleware.condition(nextUrl as NextURL);
        expect(result).toBe(false);
      });
    });
  });

  describe('TellUsAboutMiddleware.middleware', () => {
    it('should rewrite to 404 when hasRouteFor404 is true', () => {
      const mockHasRouteFor404 = jest.spyOn(tellUsAboutRoutesHandler, 'hasRouteFor404');
      mockHasRouteFor404.mockReturnValue(true);

      const nextRequest = {
        nextUrl: { pathname: '/join/espana/tell-us-about', origin: 'http://localhost:3000' },
      };
      const result = TellUsAboutMiddleware.middleware(nextRequest as NextRequest);

      expect(result).toEqual(NextResponse.rewrite(new URL('/404', nextRequest.nextUrl.origin)));
      expect(mockHasRouteFor404).toHaveBeenCalledWith({
        pathname: '/join/espana/tell-us-about',
        routeKey: 'tell-us-about',
      });
    });

    it('should call NextResponse.next() when hasRouteFor404 is false', () => {
      const mockHasRouteFor404 = jest.spyOn(tellUsAboutRoutesHandler, 'hasRouteFor404');
      localizedTellUsAboutUrls.forEach(({ nextUrl }) => {
        mockHasRouteFor404.mockReturnValue(false);
        const result = TellUsAboutMiddleware.middleware({ nextUrl } as NextRequest);
        expect(result).toEqual(NextResponse.next());
        expect(mockHasRouteFor404).toHaveBeenCalledWith({
          pathname: nextUrl.pathname,
          routeKey: 'tell-us-about',
        });
      });
    });
  });
});
