import { NextRequest, NextResponse } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';
import { pricingRoutesHandler } from '../../next-rewrites.config';

import { PricingMiddleware } from '../../src/middlewares';

jest.mock('../../next-rewrites.config');

const localizedPricingUrls = [
  { nextUrl: { pathname: '/join/espana/precios' } },
  { nextUrl: { pathname: '/join/spagna/prezzi' } },
  { nextUrl: { pathname: '/join/espagne/tarification' } },
  { nextUrl: { pathname: '/join/espanha/precos' } },
];

describe('PricingMiddleware', () => {
  describe('condition', () => {
    it('should return true when the condition is met', () => {
      const nextUrl = { pathname: '/join/spain/pricing' };
      const result = PricingMiddleware.condition(nextUrl as NextURL);
      expect(result).toBe(true);
    });

    it('should return false when the condition is not met', () => {
      localizedPricingUrls.forEach(({ nextUrl }) => {
        const result = PricingMiddleware.condition(nextUrl as NextURL);
        expect(result).toBe(false);
      });
    });
  });

  describe('PricingMiddleware.middleware', () => {
    it('should rewrite to 404 when hasRouteFor404 is true', () => {
      const mockHasRouteFor404 = jest.spyOn(pricingRoutesHandler, 'hasRouteFor404');
      mockHasRouteFor404.mockReturnValue(true);

      const nextRequest = {
        nextUrl: { pathname: '/join/espagne/pricing', origin: 'http://localhost:3000' },
      };
      const result = PricingMiddleware.middleware(nextRequest as NextRequest);

      expect(result).toEqual(NextResponse.rewrite(new URL('/404', nextRequest.nextUrl.origin)));
      expect(mockHasRouteFor404).toHaveBeenCalledWith({
        pathname: '/join/espagne/pricing',
        routeKey: 'pricing',
      });
    });

    it('should call NextResponse.next() when hasRouteFor404 is false', () => {
      const mockHasRouteFor404 = jest.spyOn(pricingRoutesHandler, 'hasRouteFor404');
      localizedPricingUrls.forEach(({ nextUrl }) => {
        mockHasRouteFor404.mockReturnValue(false);

        const result = PricingMiddleware.middleware({ nextUrl } as NextRequest);

        expect(result).toEqual(NextResponse.next());
        expect(mockHasRouteFor404).toHaveBeenCalledWith({
          pathname: nextUrl.pathname,
          routeKey: 'pricing',
        });
      });
    });
  });
});
