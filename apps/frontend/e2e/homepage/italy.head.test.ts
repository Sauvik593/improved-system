import { test } from '@playwright/test';

import ItalyHeadTestCase from './italy.head.config.json';
import { headSpecHelper } from '../helpers/head-spec.helper';
import { AdminApiClient } from '@mocks-server/admin-api-client';

const apiClient = new AdminApiClient();

test.beforeAll(async () => {
  await apiClient.updateConfig({
    mock: {
      collections: {
        selected: 'homepage-italy',
      },
    },
  });
});

test.describe('Head specs', async () => {
  await headSpecHelper(ItalyHeadTestCase);
});
