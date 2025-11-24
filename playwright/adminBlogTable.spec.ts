import { test, expect } from '@playwright/test';
import config from '../playwright.config';
import { AdminBlogPage } from './pcoms/adminBlogs';
import AxeBuilder from '@axe-core/playwright';
import { testBlogs } from '@/constants/testBlogs';

const baseURL = config.use?.baseURL as string;

test.use({ baseURL: baseURL });

test.describe('Admin Blog Table Page', () => {
  let adminBlogPage: AdminBlogPage;

  test.beforeEach(async ({ page }) => {
    adminBlogPage = new AdminBlogPage(page);
    await adminBlogPage.goto();
  });

  test('Verify Admin Blog Table Page Metadata', async ({ page }) => {
    expect(
      await page.getAttribute('title', 'TheQAGuy | Admin Blog Table')
    ).toBeDefined();
  });

  test('Verify Admin Blog Table Content', async () => {
    const blogRows = adminBlogPage.table.locator('tbody tr');

    await expect(adminBlogPage.table).toBeVisible();
    await expect(blogRows).toHaveCount(testBlogs.length);
  });

  testBlogs.forEach((blog) => {
    test(`Verify Table Row for Blog: ${blog.slug}`, async () => {
      const { slug, title, summary, tags, published, createdAt } =
        await adminBlogPage.setTableRow(blog.slug);
      if (!adminBlogPage.tableRow) {
        throw new Error(`Table row for blog with slug ${blog.slug} not found`);
      }

      // await expect(blogSlugCol).toContainText(blog.slug);
      await expect(slug.getByRole('link')).toHaveAttribute(
        'href',
        `/admin/blog/${blog.slug}`
      );
      await expect(title).toContainText(blog.title);
      await expect(summary).toContainText(blog.summary);
      await expect(tags).toContainText(blog.tags.join(','));
      await expect(published).toContainText(blog.published ? 'true' : 'false');
      await expect(createdAt).toContainText(blog.createdAt.toISOString());
    });
  });

  test('Verify New Blog Button Navigation', async () => {
    await expect(adminBlogPage.newBlogButton).toBeVisible();
    await adminBlogPage.newBlogButton.click();
    await expect(adminBlogPage.page).toHaveURL(/\/admin\/blog\/new$/);
  });

  test('Accessibility Audit', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
