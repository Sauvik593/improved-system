import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({
  path: './.env.e2e',
});

export default defineConfig({
  testDir: 'e2e',
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  maxFailures: process.env.CI ? 0 : 5,
  quiet: !!process.env.CI,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
  },
  webServer: [
    {
      command: 'npm run mocks',
      url: 'http://localhost:3110',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run start:e2e',
      url: 'http://localhost:3000/healthcheck',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
