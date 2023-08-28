import { vi, type Mocked } from 'vitest';
import { getMe } from './get-me.server';
import { apiService } from '~/server/api/service.server';

vi.mock('~/server/api/service.server', () => ({
  apiService: {
    get: vi.fn(),
  },
}));

const apiMock: Mocked<typeof apiService> = apiService as any;

describe('getMe', () => {
  const request = new Request('/');
  const locale = 'en';

  it('returns the user', async () => {
    const user = { firstname: 'John', lastname: 'Doe' };
    // @ts-ignore
    apiMock.get.mockResolvedValue([user]);

    const result = await getMe('url', request, locale);

    expect(result).toEqual({
      ...user,
      initials: 'JD',
    });
  });

  describe('when user doesnt have last name', async () => {
    it('returns the user with single initials', async () => {
      const user = { firstname: 'John' };
      // @ts-ignore
      apiMock.get.mockResolvedValue([user]);

      const result = await getMe('url', request, locale);

      expect(result).toEqual({
        ...user,
        initials: 'J',
      });
    });
  });
});
