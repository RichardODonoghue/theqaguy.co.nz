import { Page, Locator } from '@playwright/test';

export class Home {
  readonly page: Page;
  readonly heroSection: Locator;
  readonly runTestsButton: Locator;
  readonly testLog: Locator;
  readonly confettiCanvas: Locator;

  constructor(page: Page) {
    this.page = page;
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
