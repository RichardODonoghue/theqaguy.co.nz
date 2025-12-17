import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/admin.json');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

setup('Setup authentication', async ({ page }) => {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error('Admin credentials are not set for this environment');
  }

  await page.goto('/login');
  await page.fill("input[name='email']", ADMIN_EMAIL);
  await page.fill("input[name='password']", ADMIN_PASSWORD);
  await page.click("button[type='submit']");

  await page.waitForURL('/admin/blog');
  expect(page.getByTestId('blog-table')).toBeVisible();

  await page.context().storageState({ path: authFile });
});
