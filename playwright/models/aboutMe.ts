import { Page, Locator } from '@playwright/test';

export class AboutMePage {
  readonly page: Page;
  readonly profileCard: Locator;
  readonly profileDetails: Locator;
  readonly hobbiesCard: Locator;
  readonly hobbiesList: Locator;
  readonly techSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileCard = page.getByTestId('profile-card');
    this.profileDetails = page.getByTestId('profile-details');
    this.hobbiesCard = page.getByTestId('hobby-card');
    this.hobbiesList = page.getByTestId('hobbies-list');
    this.techSection = page.locator('#about-me-technologies');
  }

  async goto(): Promise<void> {
    await this.page.goto('/about-me');
  }

  async hoverOverTech(techName: string): Promise<void> {
    await this.page
      .getByTestId(`tech-${techName.toLowerCase().replace(/\s+/g, '-')}`)
      .getByRole('img')
      .hover();
  }
}
