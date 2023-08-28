export const getCookies = (request: Request) => request.headers.get('Cookie');

export const parseSingleCookie = (cookieName: string) => (cookieString: string) =>
  cookieString
    .split(';')
    .find((cookie: string) => cookie.includes(cookieName))
    ?.split('=')[1];

export const getExternalCookie = (cookieName: string) => (cookieString: string | null) =>
  cookieString ? parseSingleCookie(cookieName)(cookieString) : null;

export const getNonEssentialCookie = getExternalCookie('non_essential_cookies');
