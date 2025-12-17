import { defineConfig, devices } from '@playwright/test';
import path from 'path';

// If not running in CI, load environment variables from .env file
if (!process.env.CI) {
  import('dotenv').then((dotenv) => {
    dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });
  });
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './playwright/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list', { verbose: true }],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['junit', { outputFile: './test-results/results.xml' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.BASE_URL
      ? process.env.BASE_URL
      : 'https://local.theqaguy.co.nz:3000',
    contextOptions: {
      ignoreHTTPSErrors: true,
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testDir: './playwright/config',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        storageState: path.join(__dirname, './playwright/.auth/admin.json'),
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
        storageState: path.join(__dirname, './playwright/.auth/admin.json'),
      },
      dependencies: ['setup'],
    },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     viewport: { width: 1920, height: 1080 },
    //     storageState: path.join(__dirname, './playwright/.auth/admin.json'),
    //   },
    //   dependencies: ['setup'],
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    //   testIgnore: ['**/tests/adminBlogTable.spec.ts'], // Admin pages may not be optimized for mobile
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    //   testIgnore: ['**/tests/adminBlogTable.spec.ts'], // Admin pages may not be optimized for mobile
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
