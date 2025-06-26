import { test, expect } from '@playwright/test';
import config from '../../playwright.config';

const baseURL = config.use?.baseURL as string;

test.use({ baseURL: baseURL });

test('Can load homepage', async ({ page }) => {
  await page.goto('/');

  expect(page.getByText('<HelloWorld/>'));
  expect(page.getByText("I'm Richard"));
});

test('Can navigate to AboutMe page', async ({ page }) => {
  await page.goto('/');

  const aboutMeMenuButton = page.getByRole('link', { name: 'About Me' });
  await aboutMeMenuButton.click();

  expect(page.getByText('<AboutMe/>'));
});
