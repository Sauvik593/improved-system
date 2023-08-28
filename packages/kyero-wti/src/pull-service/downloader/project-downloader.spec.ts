import fetch from 'node-fetch';

import { CliUx } from '@oclif/core';
import { ProjectDownloader } from './project-downloader';
import { Env } from '../../helpers/env';

import { type MockedFunction } from 'vitest';

vi.spyOn(Env.prototype, 'wtiKey', 'get').mockReturnValue('wti-key');

vi.mock('@oclif/core', () => ({
  CliUx: {
    ux: {
      error: vi.fn(),
    },
  },
}));

vi.mock('node-fetch');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockedFetch = fetch as MockedFunction<any>;

const data = {
  project: {
    name: 'project-name',
    id: 1,
    created_at: '2023-03-01',
    project_files: ['file1', 'file2'],
  },
};

describe('ProjectDownloader', () => {
  describe('call', () => {
    it('should return a list of projects', async () => {
      const response = { json: vi.fn(() => data) };

      mockedFetch.mockResolvedValue(response);

      const downloader = new ProjectDownloader();
      const project = await downloader.call();

      expect(mockedFetch).toHaveBeenCalledWith(
        'https://webtranslateit.com/api/projects/wti-key.json',
      );
      expect(project).toEqual(data.project);
    });

    describe('when there is an error', () => {
      it('should fire error to CliUx', async () => {
        mockedFetch.mockRejectedValue('error');

        const downloader = new ProjectDownloader();
        const project = await downloader.call();

        expect(project).toEqual(undefined);
        expect(CliUx.ux.error).toHaveBeenCalledWith('There was an error downloading your project!');
      });
    });
  });
});
