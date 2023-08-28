import { URL } from 'node:url';

import { installGlobals } from '@remix-run/node';
import createFetchMock from 'vitest-fetch-mock';

import { vi } from 'vitest';

const fetchMocker = createFetchMock(vi);
installGlobals();

vi.mock('~/common/client-router/helpers', () => ({
  BASE_URL: 'http://new-frontend.kyero.test/',
  urlOf: (path: string) =>
    new URL(path, 'http://new-frontend.kyero.test/').toString().replace(/\/$/, ''),
  assetsPathTo: (path: string) => {
    return `/new-frontend-assets/${path}`
      .replace(/\/+/g, '/') // replace consecutive slashes with a single slash
      .replace(/\/+$/, ''); // remove trailing slashes
  },
}));

vi.mock('~/server/redis-cache.server', () => ({
  RedisCache: {
    init: vi.fn(),
    get: vi.fn(async (cacheKey, fallbackFunction) => await fallbackFunction()),
  },
}));

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();

class LocalStorageMock {
  store: Record<string, string>;
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

// @ts-ignore
global.localStorage = new LocalStorageMock();
