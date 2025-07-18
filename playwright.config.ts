import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:5173/foodinator/";

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./tests/artifacts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  timeout: 30000,
  expect: {
    timeout: 10000,
  },

  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: [
    ["html", { outputFolder: "./tests/reports/html" }],
    ["junit", { outputFile: "./tests/reports/junit.xml" }],
    ["list"],
  ],

  // Shared settings for all the projects below.
  use: {
    baseURL: baseURL,

    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: "on-first-retry",

    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
