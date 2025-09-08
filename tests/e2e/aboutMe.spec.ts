import { test, expect } from '@playwright/test';
import config from '../../playwright.config';
import { technologies } from '@/constants/technologies';

const baseURL = config.use?.baseURL as string;

test.use({ baseURL: baseURL });

test.describe('About Me Page', () => {
  test('Can load AboutMe page', async ({ page }) => {
    await page.goto('/about-me');

    await expect(page.getByText('<AboutMe/>')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bio' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Technologies I have experience with' })
    ).toBeVisible();

    for (const [category, items] of Object.entries(technologies)) {
      await expect(page.getByRole('heading', { name: category })).toBeVisible();
      for (const item of items) {
        // Ensure that all technologies are rendered.
        await expect(
          page.getByAltText(item.name, { exact: true })
        ).toBeVisible();
      }
    }
  });
});
