import { test, expect } from '@playwright/test';
import config from '../playwright.config';
import { AboutMe } from './pcoms/aboutMe';
import { ContentHeader } from './pcoms/contentHeader';
import { Menu } from './pcoms/menu';
import { technologies } from '@/constants/technologies';
import { aboutMeBlurb } from '@/constants/aboutMeBlurb';
import AxeBuilder from '@axe-core/playwright';

const baseURL = config.use?.baseURL as string;

test.use({ baseURL: baseURL });

test.describe('About Me Page', () => {
  let aboutMePage: AboutMe;

  test.beforeEach(async ({ page }) => {
    aboutMePage = new AboutMe(page);
    await aboutMePage.goto();
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
    const contentHeader = new ContentHeader(aboutMePage.page);
    const menu = new Menu(aboutMePage.page);

    await expect(contentHeader.headerText).toHaveText('<AboutMe/>');
    await expect(menu.selectedMenuItem).toHaveText('About Me');

    await expect(
      aboutMePage.aboutMeSection.locator('h2', { hasText: 'Bio' })
    ).toBeVisible();
    await expect(aboutMePage.aboutMeBio).toHaveText(aboutMeBlurb);

    await expect(aboutMePage.aboutMeHobbies).toHaveText(
      [
        'Building software and tools',
        'Contributing to testing of FOSS software',
        'Attending my local linux user group',
        'Playing video games',
        'Spending time with my family',
      ].join('')
    );

    await expect(
      aboutMePage.techSection.getByRole('heading', {
        name: 'Technologies I have experience with',
      })
    ).toBeVisible();

    for (const [category, items] of Object.entries(technologies)) {
      await expect(
        aboutMePage.techSection.getByRole('heading', { name: category })
      ).toBeVisible();
      for (const item of items) {
        // Ensure that all technologies are rendered.
        await expect(
          aboutMePage.techSection.getByAltText(item.name, { exact: true })
        ).toBeVisible();
        await expect(
          aboutMePage.techSection.locator(`img[alt="${item.name}"]`)
        ).toBeVisible();

        await aboutMePage.hoverOverTech(item.name);
        // Ensure that hovering over the technology shows the tooltip.
        await expect(
          page.getByRole('tooltip', { name: item.name })
        ).toBeVisible();
      }
    }
  });

  test('Accessibility Audit', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
