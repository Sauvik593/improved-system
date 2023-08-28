import { vitest } from 'vitest';
import { createCookie } from '@remix-run/node';
import { lngCookie } from './cookies.server';

vitest.mock('@remix-run/node', () => ({
  createCookie: vitest.fn(() => 'cookie' as any),
}));

describe('lngCookie', () => {
  it('should have the correct properties', () => {
    expect(createCookie).toHaveBeenCalledWith('lng', {
      httpOnly: true,
      maxAge: 31536000,
      sameSite: 'lax',
    });

    expect(lngCookie).toEqual('cookie');
  });
});
