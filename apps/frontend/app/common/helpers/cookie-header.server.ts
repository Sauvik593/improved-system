type CookieHeaderArgs = {
  name: string;
  value: string | number | boolean;
  maxAge?: number;
  path?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
};

const keyPairs = {
  maxAge: 'max-age',
  httpOnly: 'httponly',
  sameSite: 'SameSite',
  secure: 'Secure',
  path: 'Path',
};

export const getCookieHeader = ({ name, value, ...cookie }: CookieHeaderArgs) =>
  Object.entries(cookie).reduce((acc, [key, value]) => {
    const keyPair = keyPairs[key as keyof typeof keyPairs];

    return `${acc}; ${keyPair}=${value}`;
  }, `${name}=${value}`);
