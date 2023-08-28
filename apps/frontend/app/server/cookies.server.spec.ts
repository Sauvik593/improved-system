import { getCookies, getExternalCookie } from './cookies.server';

describe('getCookies', () => {
  it('should return cookies', () => {
    const cookieHeader = { Cookie: 'my-cookie' };
    const request = new Request('https://example.com', { headers: cookieHeader });
    expect(getCookies(request)).toEqual('my-cookie');
  });
});

describe('getExternalCookie', () => {
  describe('when cookie is present', () => {
    it('should return cookie value', () => {
      const cookieString = 'my-cookie=foo';
      expect(getExternalCookie('my-cookie')(cookieString)).toEqual('foo');
    });
  });

  describe('when cookie is not present', () => {
    it('should return null', () => {
      const cookieString = null;
      expect(getExternalCookie('my-cookie')(cookieString)).toEqual(null);
    });
  });
});
