import { getCookieHeader } from './cookie-header.server';
describe('getCookieHeader', () => {
  it('should return a cookie header', () => {
    const cookie = {
      name: 'test_cookie',
      value: false,
    };
    expect(getCookieHeader(cookie)).toEqual('test_cookie=false');
  });

  describe('when all options are provided', () => {
    it('should return full header', () => {
      const cookie = {
        name: 'test_cookie',
        value: false,
        maxAge: 31536000,
        path: '/route',
        secure: true,
        sameSite: 'Strict' as const,
      };

      expect(getCookieHeader(cookie)).toEqual(
        'test_cookie=false; max-age=31536000; Path=/route; Secure=true; SameSite=Strict',
      );
    });
  });
});
