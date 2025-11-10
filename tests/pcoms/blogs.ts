import { Page, Locator } from '@playwright/test';

/**
 * @description: Page Component Object Model for Blogs page
 * This class encapsulates the elements and actions available in the Blogs page.
 * @constructor
 * @param {Page} Page - The Playwright Page object representing the browser page.
 * @param {Promise<Locator[]>} blogCards - Promise resolving to an array of Locators for blog cards.
 * @returns {Blogs} An instance of the Blogs class.
 */

export class Blogs {
  readonly page: Page;
  readonly blogCards: Promise<Locator[]>;

  constructor(page: Page) {
    this.page = page;
    this.blogCards = page.getByTestId(/^blog-card-/).all();
  }

  async goToBlogPost(slug: string) {
    await this.page.getByTestId(`blog-${slug}`).click();
  }
}
