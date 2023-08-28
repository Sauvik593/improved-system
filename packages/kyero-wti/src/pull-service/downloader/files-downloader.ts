import fetch from 'node-fetch';
import { CliUx } from '@oclif/core';

import { Env } from '../../helpers/env';
import { ResponseParser } from './response-parser';
import { BASE_URL } from '.';

import { type ProjectFile, type ParsedSingleFileResponse } from '../types';

export class FilesDownloader {
  async call(files: ProjectFile[]): Promise<ParsedSingleFileResponse[]> {
    const promiseResults: Promise<ParsedSingleFileResponse>[] = [];

    for (const projectFile of files) {
      promiseResults.push(this.downloadAndParseFile(projectFile));
    }

    return Promise.all(promiseResults);
  }

  async downloadAndParseFile(projectFile: ProjectFile): Promise<ParsedSingleFileResponse> {
    CliUx.ux.log(`Downloading ${projectFile.name}...${projectFile.hash_file}`);

    const response = await fetch(this.buildLanguageFileUrl(projectFile));

    const text = await response.text();

    return ResponseParser.call(projectFile, text);
  }

  buildLanguageFileUrl(projectFile: ProjectFile): string {
    // Main language doesn't have a master project file id instead it has project id
    const masterId = projectFile.master_project_file_id || projectFile.id;

    return `${BASE_URL}/projects/${new Env().wtiKey}/files/${masterId}/locales/${
      projectFile.locale_code
    }`;
  }
}
