import { Page } from '@playwright/test';

/**
 * @description: Base Model Class
 * This class serves as a base for all page models, encapsulating common properties and methods.
 * @constructor
 * @param {Page} page - The Playwright Page object representing the browser page.
 * @returns {BaseModel} An instance of the BaseModel class.
 */
export class BaseModel {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
