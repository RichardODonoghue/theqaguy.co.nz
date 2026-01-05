import { Page, Locator } from '@playwright/test';
import { BaseModel } from './baseModel';

/**
 * @description: Page Component Object Model for Content Header
 * This class encapsulates the elements and actions available on the Content Header.
 * @constructor
 * @param {Page} Page - The Playwright Page object representing the browser page.
 * @param {Locator} header - Locator for the content header element.
 * @param {Locator} mobileMenuButton - Locator for the mobile menu button.
 * @param {boolean} isMobile - Flag indicating if the current view is mobile.
 * @returns {ContentHeader} An instance of the ContentHeader class.
 */

export class ContentHeader extends BaseModel {
  readonly header: Locator;
  readonly mobileMenuButton: Locator;
  readonly headerText: Locator;
  isMobile: boolean;

  constructor(page: Page) {
    super(page);
    this.header = page.getByTestId('content-header');
    this.isMobile = false;
    this.mobileMenuButton = page.getByTestId('mobile-menu-button');
    this.headerText = this.header.locator('h1');
  }

  async openMobileMenu() {
    if (!this.isMobile) {
      throw new Error('Not in mobile view, cannot open mobile menu');
    }

    await this.mobileMenuButton.click();
  }
}
