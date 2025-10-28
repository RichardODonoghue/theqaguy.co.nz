import { test, expect } from './fixtures/db-seed';
import config from '../playwright.config';
import { getAdminCredentials } from './utils/credentials';

const baseURL = config.use?.baseURL as string;
const { email: adminEmail, password: adminPassword } = getAdminCredentials();

test.use({ baseURL: baseURL });

test.describe('Authentication & Access', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('Login with Valid Credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email Address' }).fill(adminEmail);
    await page.getByRole('textbox', { name: 'Password' }).fill(adminPassword);

    const consolePromise = page.waitForEvent('console', (msg) =>
      msg.text().includes('Login successful!')
    );

    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForURL('/admin/blog');

    await expect(page).toHaveURL('/admin/blog');
    await expect(
      page.getByRole('heading', { name: '<Admin_Blogs/>' })
    ).toBeVisible();
    await consolePromise;
  });

  test('Login with Invalid Email', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(
        'Login failed. Please check your credentials and try again.'
      );
      await dialog.accept();
    });

    await page
      .getByRole('textbox', { name: 'Email Address' })
      .fill('invalid@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');

    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL('/login');
  });

  test('Login with Invalid Password', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(
        'Login failed. Please check your credentials and try again.'
      );
      await dialog.accept();
    });

    await page.getByRole('textbox', { name: 'Email Address' }).fill(adminEmail);
    await page
      .getByRole('textbox', { name: 'Password' })
      .fill('wrongpassword123');

    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL('/login');
  });

  test('Login with Empty Fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Continue' }).click();

    const emailInput = page.getByRole('textbox', { name: 'Email Address' });
    const isEmailInvalid = await emailInput.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(isEmailInvalid).toBe(true);
    await expect(page).toHaveURL('/login');
  });

  test('Verify Authentication Persistence', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email Address' }).fill(adminEmail);
    await page.getByRole('textbox', { name: 'Password' }).fill(adminPassword);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForURL('/admin/blog');

    await page.reload();

    await expect(page).toHaveURL('/admin/blog');
    await expect(
      page.getByRole('heading', { name: '<Admin_Blogs/>' })
    ).toBeVisible();
  });
});
