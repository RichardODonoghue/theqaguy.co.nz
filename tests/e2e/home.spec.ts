import { test, expect } from '@playwright/test';
import config from '../../playwright.config';

const baseURL = config.use?.baseURL as string;

test.use({ baseURL: baseURL });

test.describe('Home Page', () => {
  test('Can load homepage', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('<HelloWorld/>')).toBeVisible();
    await expect(page.getByText("I'm Richard")).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Click Here To Test My Website!' })
    ).toBeVisible();
  });

  test('Can run tests', async ({ page }) => {
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
          'event: end\ndata: 0\n\n',
        ].join(''),
      });
    });

    await page.goto('/');

    const testButton = page.getByRole('button', {
      name: 'Click Here To Test My Website!',
    });
    await testButton.click();

    await expect(page.getByText('Test two')).toBeVisible();
  });
});
