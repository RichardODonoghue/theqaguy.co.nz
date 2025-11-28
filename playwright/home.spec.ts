import { test, expect } from '@playwright/test';
import config from '../playwright.config';
import AxeBuilder from '@axe-core/playwright';
import { Home } from './pcoms/home';
import { Menu } from './pcoms/menu';
import { ContentHeader } from './pcoms/contentHeader';

const baseURL = config.use?.baseURL as string;

test.use({ baseURL: baseURL });

test.describe('Home Page', () => {
  let home: Home;

  test.beforeEach(async ({ page }) => {
    home = new Home(page);
    await home.goto();
  });

  test('Verify Home Page Metadata', async ({ page }) => {
    expect(
      await page.getAttribute('title', "Richard O'Donoghue - QA Engineer")
    ).toBeDefined();

    expect(await page.getAttribute('meta[name="description"]', 'content')).toBe(
      "Personal website and Portfolio of Richard O'Donoghue | QA Engineer"
    );

    expect(await page.getAttribute('meta[name="keywords"]', 'content')).toBe(
      [
        "Richard O'Donoghue",
        'QA Engineer',
        'Quality Assurance',
        'Software Testing',
        'Automation',
        'SDET',
        'Cypress',
        'Playwright',
        'Selenium',
        'JavaScript',
        'TypeScript',
        'React',
        'Next.js',
        'Node.js',
        'Blog',
        'ISTQB',
        'AI Testing',
      ].join(',')
    );
  });

  test('Verify Home Page Content', async ({ page }) => {
    const contentHeader = new ContentHeader(page);
    const menu = new Menu(page);

    await expect(contentHeader.headerText).toHaveText('<HelloWorld/>');

    // Check that no menu item is selected on the home page
    await expect(menu.selectedMenuItem).not.toBeVisible();

    await expect(
      home.heroSection.getByRole('heading', { name: "I'm Richard", level: 2 })
    ).toBeVisible();
    await expect(
      home.heroSection.getByRole('heading', {
        name: '{ QA Engineer }',
        level: 3,
      })
    ).toBeVisible();

    await expect(home.runTestsButton).toBeVisible();
  });

  test('Verify Test Run Behaviour', async ({ page }) => {
    // Mock the API responses for adding a job and streaming test results
    await page.route('/api/add-job', async (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ jobId: '99999' }),
      });
    });

    // Mock the SSE stream for test results
    await page.route('/api/test-stream?jobId=99999', async (route) => {
      route.fulfill({
        status: 200,
        contentType: 'text/event-stream',
        body: [
          'data: Test one\n\n',
          'data: Test two\n\n',
          'event: end\ndata: Test run complete (exit code: 0)\n\n',
        ].join(''),
      });
    });

    await home.goto();

    await home.clickRunTestsButton();

    await expect(home.testLog).toContainText(
      'Test run has been queued... please wait'
    );

    await expect(home.testLog).toContainText('Test one');
    await expect(home.testLog).toContainText('Test two');

    await expect(home.confettiCanvas).toBeVisible();
  });

  test('Accessibility Audit', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(process.env.CI ? ['color-contrast'] : []) // Disable color-contrast rule on CI due to inconsistent failures
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
