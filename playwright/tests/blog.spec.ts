import { test, expect } from '@playwright/test';
import config from '../../playwright.config';
import { Blog } from '../models/blog';
import { Menu } from '../models/menu';
import { ContentHeader } from '../models/contentHeader';
import { testBlogs } from '../../src/constants/testBlogs';
import { AxeBuilder } from '@axe-core/playwright';

const baseURL = config.use?.baseURL;

test.use({ baseURL: baseURL });

testBlogs.forEach(async (blog) => {
  test.describe(`Blog Page Tests - ${blog.title}`, () => {
    let blogPage: Blog;

    if (!blog.published) return;

    test.beforeEach(async ({ page }) => {
      blogPage = new Blog(page);
      await blogPage.goto(blog.slug);
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
      const contentHeader = new ContentHeader(page);
      const menu = new Menu(page);

      await expect(contentHeader.headerText).toHaveText('<QA_Blog/>');
      await expect(menu.selectedMenuItem).toHaveText('QA Blog');

      await expect(blogPage.title).toHaveText(blog.title);

      await expect(blogPage.summary).toHaveText(blog.summary);

      await expect(blogPage.blogTags).toContainText(blog.tags);
    });

    test(`Accessibility Audit - ${blog.title}`, async ({ page }) => {
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toHaveLength(0);
    });
  });
});
