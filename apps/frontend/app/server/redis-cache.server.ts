import { createClient } from 'redis';
import { RedisLogger } from './loggers.server';

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

export const RedisCache = {
  connected: false,
  redisClient: redisClient,
  debug: !process.env.LOG_REDIS ? process.env.KYERO_ENV !== 'production' : true,

  async get<T>(key: string, fallbackFunction: () => Promise<T>, expireAt?: number) {
    if (!RedisCache.connected) {
      return fallbackFunction();
    }

    try {
      const redisPerformance = performance.now();
      const data = await this.redisClient.get(key);

      if (data) {
        RedisCache.log({
          key,
          message: `cache hit`,
          timing: performance.now() - redisPerformance,
        });

        return JSON.parse(data) as T;
      }

      RedisCache.log({
        key,
        message: `cache miss`,
        timing: performance.now() - redisPerformance,
      });
      const fallbackData = await fallbackFunction();

      try {
        await RedisCache.set(key, fallbackData, expireAt);
      } catch (e) {
        RedisCache.log({ message: `cache error`, key }, 'error');
      }

      return fallbackData;
    } catch (e) {
      RedisCache.log({ message: `unknown error`, key }, 'error');
      return fallbackFunction();
    }
  },

  async set<T>(key: string, data: T, expireAt?: number) {
    if (!this.connected) {
      RedisCache.redisClient.connect();
      return;
    }

    try {
      await RedisCache.redisClient.set(key, JSON.stringify(data));

      if (expireAt) {
        // Redis support 10 digits timestamp
        const parsedExpireAt = Math.floor(expireAt / 1000);
        await RedisCache.redisClient.expireAt(key, parsedExpireAt);
      }
    } catch (e) {
      RedisCache.log(
        {
          message: `cache error`,
          key,
        },
        'error',
      );
    }
  },

  init() {
    RedisCache.redisClient.on('connect', this.handleSuccess);
    RedisCache.redisClient.on('error', this.handleError);
    RedisCache.redisClient.connect();

    return RedisCache;
  },

  handleError() {
    RedisCache.connected = false;
  },

  handleSuccess() {
    RedisCache.connected = true;
  },

  log(payload: { message: string; timing?: number; key: string }, level: string = 'info') {
    if (RedisCache.debug) {
      // @ts-ignore
      RedisLogger.info({
        level,
        method: payload.key,
        message: `${payload.message}`,
        timing: payload.timing?.toFixed(3) || undefined,
      });
    }
  },
};

RedisCache.init();
