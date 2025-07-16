import { defineConfig, devices } from '@playwright/test';

// The URL of your dev server.
const baseURL = 'http://localhost:5173/foodinator/';

export default defineConfig({
  // Directory where your test files are located.
  testDir: './tests/e2e',
  outputDir: "./tests/artifacts",

  // Run tests in files in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally leave test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Test timeout settings
  timeout: 30000, // 30 seconds per test
  expect: {
    // Timeout for expect() calls
    timeout: 10000, // 10 seconds for assertions
  },

  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: [
    ["html", { outputFolder: "./tests/reports/html" }],
    ["junit", { outputFile: "./tests/reports/junit.xml" }],
    ["list"]
  ],

  // Shared settings for all the projects below.
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: baseURL,

    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: 'on-first-retry',
    
    // Action timeout for individual actions
    actionTimeout: 10000, // 10 seconds for actions like click, type, etc.
    
    // Navigation timeout
    navigationTimeout: 15000, // 15 seconds for page loads
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
