import { Page, Locator } from '@playwright/test';
import { BaseModel } from './baseModel';

export class AboutMePage extends BaseModel {
  readonly profileCard: Locator;
  readonly profileDetails: Locator;
  readonly hobbiesCard: Locator;
  readonly hobbiesList: Locator;
  readonly highlightsSection: Locator;
  readonly highlights: Promise<Locator>;
  readonly techSection: Locator;

  constructor(page: Page) {
    super(page);
    this.profileCard = page.getByTestId('profile-card');
    this.profileDetails = page.getByTestId('profile-details');
    this.hobbiesCard = page.getByTestId('hobby-card');
    this.hobbiesList = page.getByTestId('hobbies-list');
    this.techSection = page.locator('#about-me-technologies');
    this.highlightsSection = page.locator('#about-me-highlights');
    this.highlights = Promise.resolve(
      this.highlightsSection.locator('[data-testid^="highlight-"]')
    );
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
