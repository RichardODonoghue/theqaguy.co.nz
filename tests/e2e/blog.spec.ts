import { test, expect } from '@playwright/test';
import config from '../../playwright.config';

const baseURL = config.use?.baseURL;

test.use({ baseURL: baseURL });

test('Can render QA Blog page', async ({ page }) => {
  await page.goto('/qa-blog');

  expect(page.getByRole('heading', { name: '<QA_Blog/>' }));
});
