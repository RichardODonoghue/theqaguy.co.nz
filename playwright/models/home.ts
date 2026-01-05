import { Page, Locator } from '@playwright/test';
import { BaseModel } from './baseModel';

export class Home extends BaseModel {
  readonly heroSection: Locator;
  readonly runTestsButton: Locator;
  readonly testLog: Locator;
  readonly confettiCanvas: Locator;

  constructor(page: Page) {
    super(page);
    this.heroSection = page.locator('#hero');
    this.runTestsButton = page.getByRole('button', {
      name: 'Click Here To Test My Website!',
    });
    this.testLog = page.getByRole('log');
    this.confettiCanvas = page.getByTestId('confetti-canvas');
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickRunTestsButton() {
    await this.runTestsButton.click();
  }
}
