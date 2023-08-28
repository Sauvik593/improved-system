import { Command } from '@oclif/core';

import { PullWithMultipleService } from '../../pull-service/pull-with-multiple-service';

export default class PullWithMultiple extends Command {
  static description = 'Pulling latest WTI files creating multiple files based on root keys';

  static examples = [`$WTI_TRANSLATION_TARGET=./public/locales  npx kyero/wti pull`];

  static flags = {};

  static args = [];

  async run(): Promise<void> {
    await new PullWithMultipleService().call();
  }
}
