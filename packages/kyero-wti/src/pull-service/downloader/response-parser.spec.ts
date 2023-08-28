import { ResponseParser } from './response-parser';

describe('ResponseParser', () => {
  describe('call', () => {
    it('should return the parsed response', async () => {
      const parsedResponse = await ResponseParser.call(
        {
          id: 1,
          name: 'en.yml',
          created_at: '2023-03-01',
          updated_at: '2023-03-01',
          hash_file: '123123',
          master_project_file_id: null,
          locale_code: 'en',
          fresh: true,
        },
        '{ en: { common: { name: "Hello" } } }',
      );

      expect(parsedResponse).toEqual({
        json: { common: { name: 'Hello' } },
        localeCode: 'en',
        name: 'en.yml',
        hash: '123123',
      });
    });
  });
});
