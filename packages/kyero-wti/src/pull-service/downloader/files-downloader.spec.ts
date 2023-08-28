import fetch from 'node-fetch';
import { FilesDownloader } from './files-downloader';
import { ResponseParser } from './response-parser';
import { Env } from '../../helpers/env';

import { type MockedFunction } from 'vitest';

vi.mock('./response-parser', () => ({
  ResponseParser: {
    call: vi.fn(),
  },
}));
vi.mock('node-fetch');

vi.spyOn(Env.prototype, 'wtiKey', 'get').mockReturnValue('wti-key');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockedFetch = fetch as MockedFunction<any>;

const projectFiles = [
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
  {
    id: 2,
    name: 'es.yml',
    created_at: '2023-03-01',
    updated_at: '2023-03-01',
    hash_file: '456456',
    master_project_file_id: 1,
    locale_code: 'es',
    fresh: true,
  },
];

describe('FilesDownloader', () => {
  it('should download and parse file', async () => {
    const response = { text: vi.fn(() => 'text') };

    mockedFetch.mockResolvedValue(response);
    const filesDownloader = new FilesDownloader();

    await filesDownloader.call(projectFiles);

    expect(mockedFetch).toHaveBeenCalledWith(
      'https://webtranslateit.com/api/projects/wti-key/files/1/locales/es',
    );
    expect(mockedFetch).toHaveBeenCalledWith(
      'https://webtranslateit.com/api/projects/wti-key/files/1/locales/en',
    );
    expect(mockedFetch).toHaveBeenCalledTimes(2);

    expect(ResponseParser.call).toHaveBeenCalledWith(projectFiles[0], 'text');
    expect(ResponseParser.call).toHaveBeenCalledWith(projectFiles[1], 'text');
    expect(ResponseParser.call).toHaveBeenCalledTimes(2);
  });
});
