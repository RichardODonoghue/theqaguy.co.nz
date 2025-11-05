import { test, expect } from '@playwright/test';
import config from '../playwright.config';
import AxeBuilder from '@axe-core/playwright';

const baseURL = config.use?.baseURL as string;

test.use({ baseURL: baseURL });

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
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
    await expect(page.getByText('<HelloWorld/>')).toBeVisible();
    await expect(page.getByText("I'm Richard")).toBeVisible();
    await expect(page.getByText('{ QA Engineer }')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Click Here To Test My Website!' })
    ).toBeVisible();
  });

  test('Verify Test Run Behaviour', async ({ page }) => {
    await page.route('/api/add-job', async (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ jobId: '99999' }),
      });
    });

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

    await page.goto('/');

    const testButton = page.getByRole('button', {
      name: 'Click Here To Test My Website!',
    });
    await testButton.click();

    await expect(
      page.getByText('Test run has been queued... please wait')
    ).toBeVisible();

    await expect(page.getByText('Test one')).toBeVisible();
    await expect(page.getByText('Test two')).toBeVisible();

    await expect(page.getByTestId('confetti-canvas')).toBeVisible();
  });

  test('Accessibility Audit', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
