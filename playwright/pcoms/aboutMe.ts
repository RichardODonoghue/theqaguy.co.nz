import { Page, Locator } from '@playwright/test';

export class AboutMe {
  readonly page: Page;
  readonly aboutMeSection: Locator;
  readonly technologies: Promise<Locator[]>;

  constructor(page: Page) {
    this.page = page;
    this.aboutMeSection = page.locator('#about-me');
    this.technologies = page.getByTestId(/^tech-/).all();
  }

  async hoverOverTech(techName: string): Promise<void> {
    await this.page.getByTestId(`tech-${techName}`).hover();
  }
}
