import { test } from '@playwright/test';

import SpainHeadTestCase from './spain.head.config.json';
import { headSpecHelper } from '../helpers/head-spec.helper';
import { AdminApiClient } from '@mocks-server/admin-api-client';

const apiClient = new AdminApiClient();

test.beforeAll(async () => {
  await apiClient.updateConfig({
    mock: {
      collections: {
        selected: 'homepage-spain',
      },
    },
  });
});

test.describe('Head specs', async () => {
  await headSpecHelper(SpainHeadTestCase);
});
