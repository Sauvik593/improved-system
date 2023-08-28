import { NextRequest, NextResponse } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';
import { contactRoutesHandler } from '../../next-rewrites.config';

import { ContactMiddleware } from '../../src/middlewares';

jest.mock('../../next-rewrites.config');

const localizedContactUrls = [
  { nextUrl: { pathname: '/join/espana/contactar' } },
  { nextUrl: { pathname: '/join/spagna/contatta' } },
  { nextUrl: { pathname: '/join/espagne/contacter' } },
  { nextUrl: { pathname: '/join/espanha/contactar' } },
];

describe('ContactMiddleware', () => {
  describe('condition', () => {
    it('should return true when the condition is met', () => {
      const nextUrl = { pathname: '/join/spain/contact' };
      const result = ContactMiddleware.condition(nextUrl as NextURL);
      expect(result).toBe(true);
    });

    it('should return false when the condition is not met', () => {
      localizedContactUrls.forEach(({ nextUrl }) => {
        const result = ContactMiddleware.condition(nextUrl as NextURL);
        expect(result).toBe(false);
      });
    });
  });

  describe('ContactMiddleware.middleware', () => {
    it('should rewrite to 404 when hasRouteFor404 is true', () => {
      const mockHasRouteFor404 = jest.spyOn(contactRoutesHandler, 'hasRouteFor404');
      mockHasRouteFor404.mockReturnValue(true);

      const nextRequest = {
        nextUrl: { pathname: '/join/espagne/contact', origin: 'http://localhost:3000' },
      };
      const result = ContactMiddleware.middleware(nextRequest as NextRequest);

      expect(result).toEqual(NextResponse.rewrite(new URL('/404', nextRequest.nextUrl.origin)));
      expect(mockHasRouteFor404).toHaveBeenCalledWith({
        pathname: '/join/espagne/contact',
        routeKey: 'contact',
      });
    });

    it('should call NextResponse.next() when hasRouteFor404 is false', () => {
      const mockHasRouteFor404 = jest.spyOn(contactRoutesHandler, 'hasRouteFor404');
      localizedContactUrls.forEach(({ nextUrl }) => {
        mockHasRouteFor404.mockReturnValue(false);
        const result = ContactMiddleware.middleware({ nextUrl } as NextRequest);
        expect(result).toEqual(NextResponse.next());
        expect(mockHasRouteFor404).toHaveBeenCalledWith({
          pathname: nextUrl.pathname,
          routeKey: 'contact',
        });
      });
    });
  });
});
