import { buildGetParams } from './helpers.server';

describe('buildGetParams', () => {
  it('should build params with array values', () => {
    const params = buildGetParams({ 'foo[]': ['bar', 'baz'] });
    expect(params.toString()).toEqual('foo%5B%5D=bar&foo%5B%5D=baz');
  });
});
