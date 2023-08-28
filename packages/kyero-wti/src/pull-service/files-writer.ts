import { CliUx } from '@oclif/core';
import { outputFile } from 'fs-extra';

import { Env } from '../helpers/env';
import { type ParsedSingleFileResponse } from './types';

export class FilesWriter {
  async call(projectsResponse: ParsedSingleFileResponse[]): Promise<unknown[]> {
    const promiseResults: Promise<unknown>[] = [];

    for (const rawFile of projectsResponse) {
      promiseResults.push(this.writeFile(rawFile));
    }

    return Promise.all(promiseResults);
  }

  async callWithMultiple(projectsResponse: ParsedSingleFileResponse[]): Promise<unknown[]> {
    let promiseResults: Promise<unknown>[] = [];

    for (const rawFile of projectsResponse) {
      const files = this.writeMultipleFiles(rawFile);

      promiseResults = [...promiseResults, ...files];
    }

    return Promise.all(promiseResults);
  }

  async writeFile(rawFile: ParsedSingleFileResponse): Promise<unknown> {
    const stringifiedAndPrettyJson = JSON.stringify(rawFile.json, null, '\t');
    const outputPath = `${new Env().wtiTarget}/${rawFile.localeCode}/common.json`;

    return outputFile(outputPath, stringifiedAndPrettyJson).then(() => {
      CliUx.ux.info(`Saving ${outputPath} \u2705`);
    });
  }

  // eslint-disable-next-line
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeMultipleFiles(rawFile: ParsedSingleFileResponse): Promise<any>[] {
    const promises: Promise<unknown>[] = [];

    for (const [key, value] of Object.entries(rawFile.json)) {
      const stringifiedAndPrettyJson = JSON.stringify({ [key]: value }, null, '\t');
      const outputPath = `${new Env().wtiTarget}/${rawFile.localeCode}/${key}.json`;

      promises.push(
        outputFile(outputPath, stringifiedAndPrettyJson).then(() => {
          CliUx.ux.info(`Saving ${outputPath} \u2705`);
        }),
      );
    }

    return promises;
  }
}
