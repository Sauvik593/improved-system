import { vi } from 'vitest';
import { RedisCache } from './redis-cache.server';

// it's mocked globally for other specs
vi.unmock('~/server/redis-cache.server');

vi.mock('redis', () => ({
  createClient: vi.fn(() => ({
    get: vi.fn().mockResolvedValue(null),
    set: vi.fn().mockResolvedValue(true),
    expireAt: vi.fn().mockResolvedValue(true),
    connect: vi.fn(),
    on: vi.fn(),
  })),
}));

const fallbackData = { fallbackData: 'Test' };
const fallbackFunction = () => Promise.resolve(fallbackData);

describe('RedisCache', () => {
  const logSpy = vi.spyOn(RedisCache, 'log');

  describe('#get', () => {
    describe('when redis is not connected', () => {
      beforeAll(() => {
        RedisCache.connected = false;
      });

      it('should return data from fallback function', async () => {
        const data = await RedisCache.get('test', fallbackFunction);
        expect(data).toEqual(fallbackData);
        expect(RedisCache.redisClient.get).not.toHaveBeenCalled();
      });
    });

    describe('when redis is connected', () => {
      beforeAll(() => {
        RedisCache.connected = true;
      });

      describe('when cache hit', () => {
        it('should return data from redis', async () => {
          const redisData = { redisData: 'Test' };
          // @ts-ignore
          RedisCache.redisClient.get.mockResolvedValue(JSON.stringify(redisData));
          const data = await RedisCache.get('test', fallbackFunction);

          expect(data).toEqual(redisData);
          expect(logSpy).toHaveBeenCalledWith({
            key: 'test',
            message: `cache hit`,
            timing: expect.any(Number),
          });
        });

        describe('when redis get fails', () => {
          it('should return data from fallback function', async () => {
            // @ts-ignore
            RedisCache.redisClient.get.mockRejectedValueOnce(new Error('Unknown error'));
            const data = await RedisCache.get('test', fallbackFunction);

            expect(data).toEqual(fallbackData);
            expect(logSpy).toHaveBeenCalledWith({ message: `unknown error`, key: 'test' }, 'error');
          });
        });
      });

      describe('when cache miss', () => {
        it('should return fallback and set fallback data to redis', async () => {
          const EXPIRATION_TIMESTAMP = undefined;
          // @ts-ignore
          RedisCache.redisClient.get.mockResolvedValueOnce(null);
          const setSpy = vi.spyOn(RedisCache, 'set');

          const data = await RedisCache.get('test', fallbackFunction);

          expect(data).toEqual(fallbackData);
          expect(logSpy).toHaveBeenCalledWith({
            key: 'test',
            message: `cache miss`,
            timing: expect.any(Number),
          });
          expect(setSpy).toHaveBeenCalledWith('test', fallbackData, EXPIRATION_TIMESTAMP);
        });

        describe('when set fails', async () => {
          it('logs the error and returns fallback data', async () => {
            // @ts-ignore
            RedisCache.redisClient.get.mockResolvedValueOnce(null);
            const setSpy = vi.spyOn(RedisCache, 'set');
            setSpy.mockRejectedValueOnce(new Error('Unknown error'));
            const data = await RedisCache.get('test', fallbackFunction, undefined);

            expect(data).toEqual(fallbackData);
            expect(logSpy).toHaveBeenCalledWith({ message: `cache error`, key: 'test' }, 'error');
          });
        });
      });
    });
  });

  describe('#set', () => {
    describe('when redis is connected', () => {
      beforeAll(() => {
        RedisCache.connected = true;
      });

      it('should set a redis key and expiration date', async () => {
        const EXPIRATION_DATE = 1692260047252;
        const EXPIRATION_DATE_WITHOUT_MILISECONDS = 1692260047;
        const DATA = { name: 'test' };
        const KEY = 'test-key';

        await RedisCache.set(KEY, DATA, EXPIRATION_DATE);
        expect(RedisCache.redisClient.set).toHaveBeenCalledWith(KEY, JSON.stringify(DATA));
        expect(RedisCache.redisClient.expireAt).toHaveBeenCalledWith(
          KEY,
          EXPIRATION_DATE_WITHOUT_MILISECONDS,
        );
      });

      it('should set a redis key without expiration date if undefined', async () => {
        const EXPIRATION_DATE = undefined;
        const DATA = { name: 'test' };
        const KEY = 'test-key';

        await RedisCache.set(KEY, DATA, EXPIRATION_DATE);
        expect(RedisCache.redisClient.set).toHaveBeenCalledWith(KEY, JSON.stringify(DATA));
        expect(RedisCache.redisClient.expireAt).not.toHaveBeenCalledWith(KEY, EXPIRATION_DATE);
      });
    });
  });

  describe('#init', () => {
    it('should connect to redis', () => {
      RedisCache.init();

      expect(RedisCache.redisClient.connect).toHaveBeenCalled();
      expect(RedisCache.redisClient.on).toHaveBeenCalledWith('connect', RedisCache.handleSuccess);
      expect(RedisCache.redisClient.on).toHaveBeenCalledWith('error', RedisCache.handleError);
    });
  });

  describe('#handleSuccess', () => {
    it('should set connected to true', () => {
      RedisCache.connected = false;

      expect(RedisCache.connected).toBe(false);

      RedisCache.handleSuccess();

      expect(RedisCache.connected).toBe(true);
    });
  });

  describe('#handleError', () => {
    it('set connected to false', () => {
      RedisCache.connected = true;

      expect(RedisCache.connected).toBe(true);

      RedisCache.handleError();

      expect(RedisCache.connected).toBe(false);
    });
  });
});
