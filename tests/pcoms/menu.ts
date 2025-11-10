import { Page, Locator } from '@playwright/test';

/**
 * @description: Page Component Object Model for Menu
 * This class encapsulates the elements and actions available in the Menu.
 * @constructor
 * @param {Page} Page - The Playwright Page object representing the browser page.
 * @param {Promise<Locator[]>} menuItems - Promise resolving to an array of Locators for menu items.
 * @param {boolean} isMobile - Flag indicating if the current view is mobile.
 * @returns {Menu} An instance of the Menu class.
 */

export class Menu {
  readonly page: Page;
  readonly menuItems: Promise<Locator[]>;
  isMobile: boolean = false;

  constructor(page: Page) {
    this.page = page;
    this.menuItems = page.getByTestId(/^menu-item-/).all();
  }

  async navigateTo(menuItemName: string) {
    const menuItem = this.page.getByTestId(`menu-item-${menuItemName}`);
    await menuItem.click();
  }
}
