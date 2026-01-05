import { Page, Locator } from '@playwright/test';
import { BaseModel } from './baseModel';

/**
 * @description: Page Component Object Model for Menu
 * This class encapsulates the elements and actions available in the Menu.
 * @constructor
 * @param {Page} Page - The Playwright Page object representing the browser page.
 * @param {Promise<Locator[]>} menuItems - Promise resolving to an array of Locators for menu items.
 * @param {boolean} isMobile - Flag indicating if the current view is mobile.
 * @returns {Menu} An instance of the Menu class.
 */

export class Menu extends BaseModel {
  readonly menuItems: Promise<Locator[]>;
  readonly selectedMenuItem: Locator;
  isMobile: boolean = false;

  constructor(page: Page) {
    super(page);
    this.menuItems = page.getByTestId(/^menu-item-/).all();
    this.selectedMenuItem = page.getByTestId('selected-menu-item');
  }

  async navigateTo(menuItemName: string) {
    const menuItem = this.page.getByTestId(`menu-item-${menuItemName}`);
    await menuItem.click();
  }
}
