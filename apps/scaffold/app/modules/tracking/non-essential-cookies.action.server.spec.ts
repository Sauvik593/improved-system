import { action } from './non-essential-cookies.action.server';

describe('Non Essential Cookie POST action', () => {
  it('should set a cookie with a non_essential_cookies', async () => {
    const nonEssentialCookies = true;
    const body = new FormData();
    body.append('non_essential_cookies', `${nonEssentialCookies}`);

    let request = new Request('http://kyero.com/non-essential-cookies', {
      method: 'POST',
      body,
    });

    const response = await action({ request, params: {}, context: {} });
    const cookie = response.headers.get('Set-Cookie');

    expect(cookie).toBeDefined();
    expect(cookie).toEqual(
      `non_essential_cookies=${nonEssentialCookies}; max-age=31536000; Path=/`,
    );
    expect(response.status).toEqual(200);
  });
});
