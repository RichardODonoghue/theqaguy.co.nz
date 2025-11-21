import { Page, Locator } from '@playwright/test';
import { ContentHeader } from './contentHeader';

/**
 * @description: Page Component Object Model for Blog Page
 * This class encapsulates the elements and actions available on the Blog page.
 * @constructor
 * @param {Page} Page - The Playwright Page object representing the browser page.
 * @param {Locator} content - Locator for the blog content section.
 * @param {Locator} title - Locator for the blog title.
 * @param {Locator} summary - Locator for the blog summary.
 * @param {Locator} footer - Locator for the blog footer.
 * @param {Promise<Locator[]>} blogTags - Promise resolving to an array of Locators for blog tags.
 * @param {Locator} lastUpdated - Locator for the last updated timestamp.
 * @param {ContentHeader} header - Instance of ContentHeader representing the blog header.
 * @returns {Blog} An instance of the Blog class.
 */

export class Blog {
  readonly page: Page;
  readonly content: Locator;
  readonly title: Locator;
  readonly summary: Locator;
  readonly footer: Locator;
  readonly blogTags: Promise<Locator[]>;
  readonly lastUpdated: Locator;
  readonly header: ContentHeader;

  constructor(page: Page) {
    this.page = page;
    this.content = page.getByTestId('blog-content');
    this.title = page.getByTestId('blog-title');
    this.summary = page.getByTestId('blog-summary');
    this.footer = page.getByTestId('blog-footer');
    this.blogTags = page.getByTestId('blog-tag').all();
    this.lastUpdated = page.getByTestId('blog-last-updated');
    this.header = new ContentHeader(page);
  }
}
