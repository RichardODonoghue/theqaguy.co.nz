import { test, expect } from '@playwright/test';
import config from '../../playwright.config';
import { BlogsPage } from '../models/blogs';
import { Menu } from '../models/menu';
import { testBlogs } from '../../src/constants/testBlogs';
import { AxeBuilder } from '@axe-core/playwright';
import { ContentHeader } from '../models/contentHeader';

const baseURL = config.use?.baseURL;

test.use({ baseURL: baseURL });

test.describe('Blogs Page Tests', () => {
  let blogPage: BlogsPage;
  test.beforeEach(async ({ page }) => {
    blogPage = new BlogsPage(page);
    await blogPage.goto();
  });

  test('Verify Blogs Page Metadata', async ({ page }) => {
    expect(
      await page.getAttribute('title', 'The QA Blog | The QA Guy')
    ).toBeDefined();

    expect(await page.getAttribute('meta[name="description"]', 'content')).toBe(
      'Shared experiences, tips and insights on software testing and quality assurance.'
    );

    expect(await page.getAttribute('meta[name="keywords"]', 'content')).toBe(
      [
        'QA Blog',
        'Software Testing',
        'Quality Assurance',
        'Test Automation',
        'Testing Tips',
        'QA Insights',
        'Software Quality',
        'Testing Strategies',
        'Bug Reporting',
        'Test Management',
        'Agile Testing',
        'Performance Testing',
        'Security Testing',
        'Manual Testing',
        'Continuous Integration',
        'DevOps',
        'Test Frameworks',
        'QA Best Practices',
        'Software Development',
        'Quality Engineering',
        'Test Automation Tools',
      ].join(',')
    );
  });

  test('Verify Blogs Page Content', async ({ page }) => {
    const contentHeader = new ContentHeader(page);
    const menu = new Menu(page);

    await expect(contentHeader.headerText).toHaveText('<QA_Blog/>');
    await expect(menu.selectedMenuItem).toHaveText('QA Blog');

    for (const blog of testBlogs) {
      if (!blog.published) {
        await expect(page.getByTestId(`blog-card-${blog.slug}`)).toHaveCount(0);
        continue;
      }

      const blogCard = page.getByTestId(`blog-card-${blog.slug}`);
      await expect(blogCard).toBeVisible();
      await expect(blogCard.getByRole('link')).toHaveAttribute(
        'href',
        `/qa-blog/${blog.slug}`
      );
      await expect(blogCard.getByRole('heading', { level: 2 })).toHaveText(
        blog.title
      );

      await expect(blogCard.locator('#blog-summary')).toHaveText(blog.summary);

      expect(
        await blogCard.locator('#blog-published-date').textContent()
      ).toContain(`Posted ${blog.publishedAt?.toDateString()}`);
    }
  });

  test('Accessibility Audit', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
