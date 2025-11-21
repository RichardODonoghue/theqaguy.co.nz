import { test, expect } from '@playwright/test';
import config from '../playwright.config';
import { testBlogs } from '../src/constants/testBlogs';
import { AxeBuilder } from '@axe-core/playwright';

const baseURL = config.use?.baseURL;

test.use({ baseURL: baseURL });

test.describe('Blogs Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/qa-blog');
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
    await expect(
      page.getByRole('heading', { name: '<QA_Blog/>' })
    ).toBeVisible();

    for (const blog of testBlogs) {
      if (!blog.published) {
        expect(page.getByTestId(`blog-card-${blog.slug}`)).toHaveCount(0);
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

      expect(blogCard.locator('#blog-summary')).toHaveText(blog.summary);

      expect(
        await blogCard.locator('#blog-published-date').textContent()
      ).toContain(`Posted ${blog.createdAt?.toDateString()}`);
    }
  });

  test('Accessibility Audit', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
