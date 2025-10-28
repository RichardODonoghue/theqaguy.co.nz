import { test, expect } from './fixtures/db-seed';
import config from '../playwright.config';
import { testBlogs } from '../src/constants/testBlogs';
import { getAdminCredentials } from './utils/credentials';

const baseURL = config.use?.baseURL as string;
const { email: adminEmail, password: adminPassword } = getAdminCredentials();

test.use({ baseURL: baseURL });

// Helper to login
async function login(page: any) {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Email Address' }).fill(adminEmail);
  await page.getByRole('textbox', { name: 'Password' }).fill(adminPassword);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForURL('/admin/blog');
}

test.describe('Blog List Display & Data Integrity', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Verify Correct Number of Blogs Displayed', async ({ page }) => {
    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(testBlogs.length);
  });

  test('Verify Table Column Headers', async ({ page }) => {
    const headers = [
      'Slug',
      'Title',
      'Summary',
      'Tags',
      'Published',
      'Date Created',
    ];

    // Headers are in cells, not columnheader role
    const headerRow = page.locator('thead tr').first();
    for (const header of headers) {
      await expect(headerRow.locator(`text="${header}"`)).toBeVisible();
    }
  });

  test('Verify First Blog Data (a-test-blog)', async ({ page }) => {
    const firstRow = page.locator('tbody tr').first();

    await expect(
      firstRow.getByRole('link', { name: 'a-test-blog' })
    ).toBeVisible();
    await expect(firstRow.getByText('A Test Blog')).toBeVisible();
    await expect(
      firstRow.getByText('A blog used for testing purposes')
    ).toBeVisible();
    await expect(
      firstRow.getByText('testing,screaming_internally,test')
    ).toBeVisible();
    await expect(firstRow.getByText('true')).toBeVisible();
    await expect(firstRow.getByText('2025-10-01T10:00:00.000Z')).toBeVisible();
  });

  test('Verify Second Blog Data (a-second-test-blog)', async ({ page }) => {
    const secondRow = page.locator('tbody tr').nth(1);

    await expect(
      secondRow.getByRole('link', { name: 'a-second-test-blog' })
    ).toBeVisible();
    await expect(secondRow.getByText('A Second test blog')).toBeVisible();
    await expect(
      secondRow.getByText('This is empty but published')
    ).toBeVisible();
    await expect(secondRow.getByText('tag,tag-2,tag-3')).toBeVisible();
    await expect(secondRow.getByText('true')).toBeVisible();
    await expect(secondRow.getByText('2025-02-01T10:00:00.000Z')).toBeVisible();
  });

  test('Verify Third Blog Data (unpublished blog)', async ({ page }) => {
    const thirdRow = page.locator('tbody tr').nth(2);

    await expect(
      thirdRow.getByRole('link', { name: 'a-blog-about-a-failed-publisher' })
    ).toBeVisible();
    await expect(thirdRow.getByText('An unpublished blog')).toBeVisible();
    await expect(
      thirdRow.getByText('Today you will not see this')
    ).toBeVisible();
    await expect(thirdRow.getByText('tag,tag-2,tag-3')).toBeVisible();
    await expect(thirdRow.getByText('false')).toBeVisible();
    await expect(thirdRow.getByText('2024-01-01T10:00:00.000Z')).toBeVisible();
  });

  test('Verify Slug Links Are Functional', async ({ page }) => {
    await page.getByRole('link', { name: 'a-test-blog' }).click();
    await page.waitForURL('/admin/blog/a-test-blog');

    await expect(page).toHaveURL('/admin/blog/a-test-blog');
    await expect(
      page.getByRole('heading', { name: '<Edit_Blog/>' })
    ).toBeVisible();
  });

  test('Verify New Blog Button Presence and Functionality', async ({
    page,
  }) => {
    await expect(page.getByRole('button', { name: 'New Blog' })).toBeVisible();

    await page.getByRole('link', { name: 'New Blog' }).click();
    await page.waitForURL('/admin/blog/new');

    await expect(page).toHaveURL('/admin/blog/new');
    await expect(
      page.getByRole('heading', { name: '<New_Blog/>' })
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Publish' })).toBeDisabled();
  });
});
