import { test } from '@playwright/test';

import HomepageHeadTestCase from './home.head.config.json';
import { headSpecHelper } from '../helpers/head-spec.helper';

test.describe('Head specs', async () => {
  await headSpecHelper(HomepageHeadTestCase);
});
