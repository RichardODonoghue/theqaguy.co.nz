import { test, expect } from '@playwright/test';
import config from '../playwright.config';
import { testBlogs } from '../src/constants/testBlogs';
import { AxeBuilder } from '@axe-core/playwright';

const baseURL = config.use?.baseURL;

test.use({ baseURL: baseURL });

testBlogs.forEach(async (blog) => {
  test.describe(`Blog Page Tests - ${blog.title}`, () => {
    if (!blog.published) return;

    test.beforeEach(async ({ page }) => {
      await page.goto(`/qa-blog/${blog.slug}`);
    });

    test(`Verify Blog Page Metadata - ${blog.title}`, async ({ page }) => {
      expect(
        await page.getAttribute('title', `${blog.title} | The QA Blog`)
      ).toBeDefined();

      expect(
        await page.getAttribute('meta[name="description"]', 'content')
      ).toBe(blog.summary);

      expect(await page.getAttribute('meta[name="keywords"]', 'content')).toBe(
        blog.tags.join(', ')
      );
    });

    test(`Verify Blog Page Content - ${blog.title}`, async ({ page }) => {
      await expect(page.locator('#blog-title')).toHaveText(blog.title);

      await expect(page.locator('#blog-summary')).toHaveText(blog.summary);

      await expect(page.getByTestId('blog-tag')).toContainText(blog.tags);
    });

    test(`Accessibility Audit - ${blog.title}`, async ({ page }) => {
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toHaveLength(0);
    });
  });
});
