import { Page, Locator } from '@playwright/test';

/**
 * @description: Page Component Object Model for Projects Section
 * This class encapsulates the elements and actions available in the Projects section.
 * @constructor
 * @param {Page} Page - The Playwright Page object representing the browser page.
 * @param {Promise<Locator[]>} projectCards - Promise resolving to an array of Locators for project cards.
 * @param {Locator | null} projectDialog - Locator for the project dialog, initially null.
 * @returns {ProjectPage} An instance of the ProjectPage class.
 */

export class ProjectPage {
  readonly page: Page;
  readonly projectCards: Promise<Locator[]>;
  projectDialog: Locator | null = null;

  constructor(page: Page) {
    this.page = page;
    this.projectCards = page.getByTestId(/^project-card-/).all();
    this.projectDialog = null;
  }

  async goto() {
    await this.page.goto('/projects');
  }

  async projectCard(projectName: string) {
    return this.page.getByTestId(`project-${projectName}`);
  }

  async openProjectDialog(projectName: string) {
    const projectCard = this.page.getByTestId(`project-${projectName}`);
    await projectCard.getByRole('button').click();
    this.projectDialog = this.page.getByRole('dialog');
  }

  async closeProjectDialog() {
    if (this.projectDialog) {
      const closeButton = this.projectDialog.getByRole('button', {
        name: 'Close',
      });
      await closeButton.click();
      this.projectDialog = null;
    }
  }
}
