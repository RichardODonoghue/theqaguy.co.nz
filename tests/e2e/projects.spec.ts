import { test, expect } from '@playwright/test';
import config from '../../playwright.config';
import { projects } from '@/constants/projects';

const baseURL = config.use?.baseURL;

test.use({ baseURL: baseURL });

test.describe(() => {
  test('Can load projects page', async ({ page }) => {
    await page.goto('/projects');

    await expect(page.getByText('<Projects/>')).toBeVisible();

    for (const [category, items] of Object.entries(projects)) {
      await expect(page.getByRole('heading', { name: category })).toBeVisible();
      for (const project of items) {
        const projectLocator = page.getByTestId(project.name);
        await expect(
          projectLocator.getByRole('heading', {
            name: project.name,
            exact: true,
          })
        ).toBeVisible();
        await expect(projectLocator).toContainText(project.description);
        if (project.url) {
          const visitLink = projectLocator.getByRole('link');
          await expect(visitLink).toHaveAttribute('href', project.url);
          await expect(visitLink).toBeVisible();
        }
        if (project.technologies) {
          for (const technology of project.technologies) {
            await expect(projectLocator.getByText(technology)).toBeVisible();
          }
        }
      }
    }
  });
});
