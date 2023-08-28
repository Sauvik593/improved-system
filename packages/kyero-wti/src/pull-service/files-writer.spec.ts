import { FilesWriter } from './files-writer';
import { Env } from '../helpers/env';
import { outputFile } from 'fs-extra';

import { type MockedFunction } from 'vitest';
import { CliUx } from '@oclif/core';

vi.mock('fs-extra', () => ({
  outputFile: vi.fn().mockResolvedValue(Promise.resolve()),
}));

vi.mock('@oclif/core', () => ({
  CliUx: {
    ux: {
      info: vi.fn(),
    },
  },
}));

vi.spyOn(Env.prototype, 'wtiTarget', 'get').mockReturnValue('target-path');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line
const mockedOutputfile = outputFile as MockedFunction<typeof outputFile>;

describe('FilesWriter', () => {
  afterEach(() => {
    mockedOutputfile.mockClear();
  });
  it('should write files', async () => {
    const filesWriter = new FilesWriter();

    const projectsResponse = [
      {
        json: {
          'key-1': 'value-1',
          'key-2': 'value-2',
        },
        localeCode: 'en',
        name: 'en.json',
        hash: '123123',
      },
      {
        json: {
          'key-1': 'value-3',
          'key-2': 'value-4',
        },
        localeCode: 'es',
        name: 'es.json',
        hash: '456456',
      },
    ];

    const stringifiedEnJson = JSON.stringify(projectsResponse[0].json, null, '\t');
    const stringifiedEsJson = JSON.stringify(projectsResponse[1].json, null, '\t');
    await filesWriter.call(projectsResponse);

    expect(mockedOutputfile).toHaveBeenCalledWith('target-path/en/common.json', stringifiedEnJson);
    expect(mockedOutputfile).toHaveBeenCalledWith('target-path/es/common.json', stringifiedEsJson);
    expect(mockedOutputfile).toHaveBeenCalledTimes(2);

    expect(CliUx.ux.info).toHaveBeenCalledWith('Saving target-path/en/common.json \u2705');
    expect(CliUx.ux.info).toHaveBeenCalledWith('Saving target-path/es/common.json \u2705');
  });

  describe('writeMultipleFiles', () => {
    it('should write multiple files', async () => {
      const filesWriter = new FilesWriter();

      const projectsResponse = [
        {
          json: {
            'first-key': 'value-1',
            'second-key': 'value-2',
          },
          localeCode: 'en',
          name: 'en.json',
          hash: '123123',
        },
        {
          json: {
            'first-key': 'value-1',
            'second-key': 'value-2',
          },
          localeCode: 'es',
          name: 'es.json',
          hash: '456456',
        },
      ];

      const stringifiedFirstKeyEnJson = JSON.stringify(
        { 'first-key': projectsResponse[0].json['first-key'] },
        null,
        '\t',
      );
      const stringifiedSecondKeyEnJson = JSON.stringify(
        { 'second-key': projectsResponse[0].json['second-key'] },
        null,
        '\t',
      );
      const stringifiedFirstEsJson = JSON.stringify(
        { 'first-key': projectsResponse[1].json['first-key'] },
        null,
        '\t',
      );
      const stringifiedSecondEsJson = JSON.stringify(
        { 'second-key': projectsResponse[1].json['second-key'] },
        null,
        '\t',
      );
      await filesWriter.callWithMultiple(projectsResponse);

      expect(mockedOutputfile).toHaveBeenCalledWith(
        'target-path/en/first-key.json',
        stringifiedFirstKeyEnJson,
      );
      expect(mockedOutputfile).toHaveBeenCalledWith(
        'target-path/en/second-key.json',
        stringifiedSecondKeyEnJson,
      );
      expect(mockedOutputfile).toHaveBeenCalledWith(
        'target-path/es/first-key.json',
        stringifiedFirstEsJson,
      );
      expect(mockedOutputfile).toHaveBeenCalledWith(
        'target-path/es/second-key.json',
        stringifiedSecondEsJson,
      );
      expect(mockedOutputfile).toHaveBeenCalledTimes(4);

      expect(CliUx.ux.info).toHaveBeenCalledWith('Saving target-path/en/common.json \u2705');
      expect(CliUx.ux.info).toHaveBeenCalledWith('Saving target-path/es/common.json \u2705');
    });
  });
});
