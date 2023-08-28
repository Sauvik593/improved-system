import { Agent } from 'node:https';
import { join } from 'path';
import { URL } from 'node:url';

import {
  API_SUFFIX,
  BASE_ROUTE,
  getCookie,
  getFetchHeaders,
  handleBackendError,
} from './helpers.server';

import { APILogger } from '~/server/loggers.server';
import { ApiError, type ApiErrorMessage } from './errors.server';

export type ApiServiceResponseType<T> =
  | Promise<[T | { to: string }, Response, 'ok']>
  | Promise<[ApiErrorMessage, Response, 'error']>;

interface BaseApiOptions {
  debug?: boolean;
}

interface Config {
  locale: string;
  params?: URLSearchParams | null;
  request: Request;
  nationId?: number | null;
  body?: any | null;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  catchError?: boolean;
}

export class ApiService {
  version: string;
  debug: boolean;

  constructor({ debug = false }: BaseApiOptions) {
    this.version = 'v1';
    this.debug = debug;
  }

  log(payload: { message: string; timing: number; method: string }, level: string = 'info') {
    if (this.debug) {
      // @ts-ignore
      APILogger.info({
        level,
        method: payload.method,
        message: payload.message,
        timing: payload.timing.toFixed(3),
      });
    }
  }

  async get<T>(path: string, config: Config) {
    return this.handleRequest<T>(path, {
      catchError: true,
      ...config,
      method: 'GET',
    });
  }

  async post<T>(path: string, config: Config & { method: 'POST'; body: any }) {
    return this.handleRequest<T>(path, { ...config, method: 'POST' });
  }

  async put<T>(path: string, config: Config & { method: 'PUT'; body: any }) {
    return this.handleRequest<T>(path, { ...config, method: 'PUT' });
  }

  async delete<T>(path: string, config: Config) {
    return this.handleRequest<T>(path, { ...config, method: 'DELETE' });
  }

  async handleRequest<T>(
    path: string,
    { locale, request, params, method = 'GET', body, catchError }: Config,
  ) {
    const fullPath = join(API_SUFFIX, path);
    const url = new URL(fullPath, BASE_ROUTE);
    const LOG_MESSAGE = { method, message: fullPath };
    const isHttps = url.protocol === 'https:';
    const time = performance.now();

    if (params) {
      url.search = params.toString();
    }

    try {
      const resp = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: getFetchHeaders(locale, getCookie(request) as string),
        // @ts-ignore
        agent: isHttps ? new Agent({ rejectUnauthorized: false }) : undefined,
      });

      if (resp.status === 302) {
        const data = await resp.json();
        return [data, resp, 'ok'] as [{ to: string }, Response, 'ok'];
      }

      if (!resp.ok) {
        const errors = await handleBackendError(resp);
        return [errors, resp, 'error'] as [ApiErrorMessage, Response, 'error'];
      }

      const data = await resp.json();
      this.log({ ...LOG_MESSAGE, timing: performance.now() - time });

      return [data, resp, 'ok'] as [T, Response, 'ok'];
    } catch (e: Error | unknown) {
      this.log({ ...LOG_MESSAGE, timing: performance.now() - time }, 'error');

      if (!catchError) {
        throw e;
      }

      if (e instanceof ApiError) {
        throw new Response(e.message, { status: e.status });
      }

      throw new Response('Unexpected Error', { status: 500 });
    }
  }
}

export const apiService = new ApiService({ debug: process.env.KYERO_ENV !== 'production' });
