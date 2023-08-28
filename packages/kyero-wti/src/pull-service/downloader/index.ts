import { FilesDownloader } from './files-downloader';
import { ProjectDownloader } from './project-downloader';

import { type ParsedSingleFileResponse } from '../types';

export const BASE_URL = 'https://webtranslateit.com/api';

export class Downloader {
  projectDownloader: ProjectDownloader;
  filesDownloader: FilesDownloader;

  constructor() {
    this.projectDownloader = new ProjectDownloader();
    this.filesDownloader = new FilesDownloader();
  }

  // Returns all of the files with parsed JSON content
  call = async (): Promise<ParsedSingleFileResponse[]> => {
    const { project_files } = await this.projectDownloader.call(); // eslint-disable-line camelcase

    return this.filesDownloader.call(project_files);
  };
}
