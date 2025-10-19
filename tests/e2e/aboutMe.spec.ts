import { test, expect } from '@playwright/test';
import config from '../../playwright.config';
import { technologies } from '@/constants/technologies';
import { aboutMeBlurb } from '@/constants/aboutMeBlurb';
import AxeBuilder from '@axe-core/playwright';

const baseURL = config.use?.baseURL as string;

test.use({ baseURL: baseURL });

test.describe('About Me Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about-me');
  });

  test('Verify About me Page Metadata', async ({ page }) => {
    expect(
      await page.getAttribute('title', 'TheQAGuy | About Me')
    ).toBeDefined();

    expect(await page.getAttribute('meta[name="description"]', 'content')).toBe(
      "Learn about me - Richard O'Donoghue, QA Engineer based in New Zealand."
    );

    expect(await page.getAttribute('meta[name="keywords"]', 'content')).toBe(
      [
        "Richard O'Donoghue",
        'About',
        'The QA Guy',
        'Quality Assurance',
        'Software Testing',
        'Bio',
        'Professional Profile',
        'Manawatu',
      ].join(',')
    );
  });

  test('Verify AboutMe page content', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      '<AboutMe/>'
    );
    await expect(page.getByRole('heading', { name: 'Bio' })).toBeVisible();
    await expect(page.getByTestId('about-me-blurb')).toHaveText(aboutMeBlurb);

    await expect(page.getByTestId('about-me-hobbies')).toHaveText(
      [
        'Building software and tools',
        'Contributing to testing of FOSS software',
        'Attending my local linux user group',
        'Playing video games',
        'Spending time with my family',
      ].join('')
    );

    await expect(
      page.getByRole('heading', {
        name: 'Technologies I have experience with',
      })
    ).toBeVisible();

    for (const [category, items] of Object.entries(technologies)) {
      await expect(page.getByRole('heading', { name: category })).toBeVisible();
      for (const item of items) {
        // Ensure that all technologies are rendered.
        await expect(
          page.getByAltText(item.name, { exact: true })
        ).toBeVisible();
        await expect(page.locator(`img[alt="${item.name}"]`)).toBeVisible();
      }
    }
  });

  test('Accessibility Audit', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
