import { Command } from '@oclif/core';

import { PullService } from '../../pull-service';

export default class Pull extends Command {
  static description = 'Pulling latest WTI files';

  static examples = [`$WTI_TRANSLATION_TARGET=./public/locales  npx kyero/wti pull-with-multiple`];

  static flags = {};

  static args = [];

  async run(): Promise<void> {
    await new PullService().call();
  }
}
