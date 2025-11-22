import { Page, Locator } from '@playwright/test';

export class AboutMe {
  readonly page: Page;
  readonly aboutMeSection: Locator;
  readonly aboutMeBio: Locator;
  readonly aboutMeHobbies: Locator;
  readonly techSection: Locator;
  readonly technologies: Promise<Locator[]>;

  constructor(page: Page) {
    this.page = page;
    this.aboutMeSection = page.locator('#about-me-bio');
    this.aboutMeBio = page.getByTestId('about-me-blurb');
    this.aboutMeHobbies = page.getByTestId('about-me-hobbies');
    this.techSection = page.locator('#about-me-technologies');
    this.technologies = page.getByTestId(/^tech-/).all();
  }

  async goto(): Promise<void> {
    await this.page.goto('/about-me');
  }

  async hoverOverTech(techName: string): Promise<void> {
    await this.page
      .getByTestId(`tech-${techName.toLowerCase().replace(/\s+/g, '-')}`)
      .hover();
  }
}
