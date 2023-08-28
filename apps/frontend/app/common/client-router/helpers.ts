import { SERVER_ENV } from 'env.server';

export const BASE_URL = typeof document === 'undefined' ? SERVER_ENV.BASE_URL : window.ENV.BASE_URL;

export const urlOf = (path: string): string => {
  // Return url without trailing slashes
  return new URL(path, BASE_URL).toString().replace(/\/$/, '');
};

export const getPrefix = () => {
  if (typeof document === 'undefined') {
    return process.env.ASSETS_PREFIX || '/new-frontend-assets';
  }

  return window.ENV.ASSETS_PREFIX || '/new-frontend-assets';
};

export const assetsPathTo = (relativePath: `/${string}`) => {
  const path = `${getPrefix()}${relativePath}`
    .replace(/\/+/g, '/') // replace consecutive slashes with a single slash
    .replace(/\/+$/, ''); // remove trailing slashes

  return path;
};
