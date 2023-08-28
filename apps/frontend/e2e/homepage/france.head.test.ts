import { test } from '@playwright/test';

import FranceHeadTestCase from './france.head.config.json';
import { headSpecHelper } from '../helpers/head-spec.helper';
import { AdminApiClient } from '@mocks-server/admin-api-client';

const apiClient = new AdminApiClient();

test.beforeAll(async () => {
  await apiClient.updateConfig({
    mock: {
      collections: {
        selected: 'homepage-france',
      },
    },
  });
});

test.describe('Head specs', async () => {
  await headSpecHelper(FranceHeadTestCase);
});
