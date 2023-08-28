export const API_PREFIX = '/new-join/api';
export const ASSETS_PREFIX = '/new-join-assets';

export const getApiUrl = (url: string): string => [API_PREFIX, url].join('/').replace(/\/+/g, '/');

export const getAssetsUrl = (url: string): string =>
  [ASSETS_PREFIX, url].join('/').replace(/\/+/g, '/');
