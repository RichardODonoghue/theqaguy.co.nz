import { Page, Locator } from '@playwright/test';

/**
 * @description: Page Component Object Model for Blog Page
 * This class encapsulates the elements and actions available on the Blog page.
 * @constructor
 * @param {Page} Page - The Playwright Page object representing the browser page.
 * @param {Locator} content - Locator for the blog content section.
 * @param {Locator} title - Locator for the blog title.
 * @param {Locator} summary - Locator for the blog summary.
 * @param {Locator} footer - Locator for the blog footer.
 * @param {Locator} blogTags - Locator for blog tags.
 * @param {Locator} lastUpdated - Locator for the last updated timestamp.
 * @returns {Blog} An instance of the Blog class.
 */

export class Blog {
  readonly page: Page;
  readonly content: Locator;
  readonly title: Locator;
  readonly summary: Locator;
  readonly footer: Locator;
  readonly blogTags: Locator;
  readonly lastUpdated: Locator;

  constructor(page: Page) {
    this.page = page;
    this.content = page.locator('#blog');
    this.title = page.locator('#blog-title');
    this.summary = page.locator('#blog-summary');
    this.footer = page.getByTestId('blog-footer');
    this.blogTags = page.getByTestId('blog-tag');
    this.lastUpdated = page.getByTestId('blog-last-updated');
  }

  async goto(slug: string) {
    await this.page.goto(`/qa-blog/${slug}`);
  }
}
