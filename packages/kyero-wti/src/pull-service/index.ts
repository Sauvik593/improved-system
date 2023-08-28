import { CliUx } from '@oclif/core';
import { Env } from '../helpers/env';
import { Downloader } from './downloader';
import { FilesWriter } from './files-writer';

export class PullService {
  envHandler: Env;
  filesWriter: FilesWriter;
  downloader: Downloader;

  constructor(
    envHandler = new Env(),
    filesWriter = new FilesWriter(),
    downloader = new Downloader(),
  ) {
    this.envHandler = envHandler;
    this.downloader = downloader;
    this.filesWriter = filesWriter;
  }

  async call(): Promise<void> {
    if (!this.checkEnvs()) {
      this.consoleUx.error('Missing env var!');
    }

    await this.downloadAndSaveFiles();
  }

  private downloadAndSaveFiles = async (): Promise<void> => {
    this.consoleUx.action.start('Pulling WTI files');

    const files = await this.downloader.call();
    await this.filesWriter.call(files);

    this.consoleUx.action.stop();
  };

  private checkEnvs(): boolean {
    if (!this.envHandler.wtiKey || !this.envHandler.wtiTarget) {
      return false;
    }

    return true;
  }

  private get consoleUx(): typeof CliUx['ux'] {
    return CliUx.ux;
  }
}
