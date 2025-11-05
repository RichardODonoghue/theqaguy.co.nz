import { test, expect } from '@playwright/test';
import config from '../playwright.config';
import AxeBuilder from '@axe-core/playwright';
import { testBlogs } from '@/constants/testBlogs';

const baseURL = config.use?.baseURL as string;

test.use({ baseURL: baseURL });

test.describe('Admin Blog Table Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/blog');
  });

  test('Verify Admin Blog Table Page Metadata', async ({ page }) => {
    expect(
      await page.getAttribute('title', 'TheQAGuy | Admin Blog Table')
    ).toBeDefined();
  });

  test('Verify Admin Blog Table Content', async ({ page }) => {
    const blogTable = page.getByTestId('blog-table');
    const blogRows = blogTable.locator('tbody tr');

    await expect(blogTable).toBeVisible();
    await expect(blogRows).toHaveCount(testBlogs.length);
  });

  testBlogs.forEach((blog) => {
    test(`Verify Table Row for Blog: ${blog.slug}`, async ({ page }) => {
      const blogTable = page.getByTestId('blog-table');
      const blogRow = blogTable
        .locator('tbody tr')
        .filter({ hasText: blog.slug });

      const blogSlugCol = blogRow.locator('td').nth(0);
      const blogTitleCol = blogRow.locator('td').nth(1);
      const blogSummaryCol = blogRow.locator('td').nth(2);
      const blogTagsCol = blogRow.locator('td').nth(3);
      const blogPublishedCol = blogRow.locator('td').nth(4);
      const blogCreatedAtCol = blogRow.locator('td').nth(5);

      // await expect(blogSlugCol).toContainText(blog.slug);
      await expect(blogSlugCol.getByRole('link')).toHaveAttribute(
        'href',
        `/admin/blog/${blog.slug}`
      );
      await expect(blogTitleCol).toContainText(blog.title);
      await expect(blogSummaryCol).toContainText(blog.summary);
      await expect(blogTagsCol).toContainText(blog.tags.join(','));
      await expect(blogPublishedCol).toContainText(
        blog.published ? 'true' : 'false'
      );
      await expect(blogCreatedAtCol).toContainText(
        blog.createdAt.toISOString()
      );
    });
  });

  test('Verify New Blog Button Navigation', async ({ page }) => {
    const newBlogButton = page.getByRole('link', { name: 'New Blog' });
    await expect(newBlogButton).toBeVisible();
    await newBlogButton.click();
    await expect(page).toHaveURL(/\/admin\/blog\/new$/);
  });

  test('Accessibility Audit', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
