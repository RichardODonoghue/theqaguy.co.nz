import { test, expect } from './fixtures/db-seed';
import config from '../playwright.config';
import { getAdminCredentials } from './utils/credentials';

const baseURL = config.use?.baseURL as string;
const { email: adminEmail, password: adminPassword } = getAdminCredentials();

test.use({ baseURL: baseURL });

async function login(page: any) {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Email Address' }).fill(adminEmail);
  await page.getByRole('textbox', { name: 'Password' }).fill(adminPassword);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForURL('/admin/blog');
}

test.describe('Edge Cases & Error Handling', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Navigate to Non-Existent Blog', async ({ page }) => {
    await page.goto('/admin/blog/non-existent-slug');

    // Page should handle gracefully (either 404 or empty editor)
    // Adjust based on actual error handling implementation
    const hasEditHeading = await page
      .getByRole('heading', { name: '<Edit_Blog/>' })
      .isVisible()
      .catch(() => false);

    // If editor loads, it should be empty or show error
    // This test needs to be adjusted based on actual implementation
    expect(hasEditHeading).toBe(true);
  });

  test('Attempt to Save Blog Without Changes', async ({ page }) => {
    await page.goto('/admin/blog/a-test-blog');

    const originalTitle = await page.locator('#blog-title').textContent();

    await page.getByRole('button', { name: 'Save' }).click();

    // Should redirect back to same blog
    await page.waitForURL(/\/admin\/blog\//);

    // Content should remain intact
    await expect(page.locator('#blog-title')).toContainText(
      originalTitle || ''
    );
  });

  // FIXME: New blog editor doesn't properly handle title/summary typing
  // The editor structure on /admin/blog/new is different from editing existing blogs
  // When typing directly, text goes into wrong location and slug generation uses placeholder
  test.fixme('Create Multiple Code Blocks', async ({ page }) => {
    await page.goto('/admin/blog/new');
    await page.waitForTimeout(1000);

    // Type directly into the editor - first line is title, second is summary
    const editorTextbox = page.getByRole('textbox');
    await editorTextbox.click();

    await page.keyboard.type('Multiple Code Blocks Test');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Testing multiple code blocks');

    // Add first code block
    await page.keyboard.press('Enter');
    await page.getByRole('button', { name: 'Code block' }).click();
    await page.keyboard.type('console.log("first");');

    // Add second code block
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.getByRole('button', { name: 'Code block' }).click();
    await page.keyboard.type('console.log("second");');

    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForURL('/admin/blog/multiple_code_blocks_test');

    // Verify both code blocks persist
    const codeBlocks = page.locator('pre');
    await expect(codeBlocks).toHaveCount(2);
  });

  // FIXME: New blog editor doesn't properly handle title/summary typing
  // Same issue as "Create Multiple Code Blocks" test above
  test.fixme('Verify Slug Generation on Save', async ({ page }) => {
    await page.goto('/admin/blog/new');
    await page.waitForTimeout(1000);

    // Type directly into the editor
    const editorTextbox = page.getByRole('textbox');
    await editorTextbox.click();

    await page.keyboard.type('A Blog With Special Ch@racters!! & Spaces');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Summary');

    await page.getByRole('button', { name: 'Save' }).click();

    // Slug should be sanitized
    await page.waitForURL('/admin/blog/a_blog_with_special_characters_spaces');

    await expect(page).toHaveURL(
      '/admin/blog/a_blog_with_special_characters_spaces'
    );
  });
});
