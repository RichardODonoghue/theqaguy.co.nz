import { test, expect } from '@playwright/test';
import config from '../../playwright.config';
import { technologies } from '@/constants/technologies';
import { softSkills } from '@/constants/softSkills';
import { roles } from '@/constants/roles';

const baseURL = config.use?.baseURL as string;

test.use({ baseURL: baseURL });

test.describe('About Me Page', () => {
  test('Can load AboutMe page', async ({ page }) => {
    await page.goto('/about-me');

    await expect(page.getByText('<AboutMe/>')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bio' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Skills', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Soft Skills' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Technology Skills' })
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Roles' })).toBeVisible();

    for (const skill of softSkills) {
      await expect(page.getByText(skill, { exact: true })).toBeVisible();
    }

    for (const [category, items] of Object.entries(technologies)) {
      await expect(page.getByRole('heading', { name: category })).toBeVisible();
      for (const item of items) {
        // Ensure that all technologies are rendered.
        await expect(
          page.getByAltText(item.name, { exact: true })
        ).toBeVisible();
      }
    }

    for (const role of roles) {
      const roleLocator = page.getByTestId(`role-${roles.indexOf(role)}`);
      await expect(
        roleLocator.getByRole('heading', { name: role.name })
      ).toBeVisible();
      await expect(
        roleLocator.getByText(role.description, { exact: true })
      ).toBeVisible();
      await expect(
        roleLocator.getByText(role.company, { exact: true })
      ).toBeVisible();
      await expect(roleLocator.getByText(role.dateRange)).toBeVisible();
    }
  });
});
