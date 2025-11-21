import { test, expect } from '@playwright/test';
import config from '../playwright.config';
import { projects } from '@/constants/projects';
import { AxeBuilder } from '@axe-core/playwright';

const baseURL = config.use?.baseURL;

test.use({ baseURL: baseURL });

test.describe(() => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('Verify Project Page Metadata', async ({ page }) => {
    expect(
      await page.getAttribute('title', 'TheQAGuy | Projects')
    ).toBeDefined();

    expect(await page.getAttribute('meta[name="description"]', 'content')).toBe(
      'Explore the projects I have worked on'
    );

    expect(await page.getAttribute('meta[name="keywords"]', 'content')).toBe(
      [
        'TheQAGuy',
        'Software Projects',
        'QA Engineer',
        'Software Testing',
        'Quality Assurance',
        'React.js',
        'Next.js',
        'Node.js',
        'Open Source',
        'Portfolio',
        'GitHub',
        'Project Showcase',
        'Automation',
        'Testing Tools',
        'Web Development',
        'Software Development',
        'Tech Projects',
        'Personal Projects',
        'Professional Work',
        'Coding',
        'Programming',
        'Tech Stack',
        'Software Engineering',
        'Project Management',
        'Continuous Integration',
      ].join(',')
    );
  });

  test('Verify Projects Page Content', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      '<Projects/>'
    );

    for (const [category, items] of Object.entries(projects)) {
      await expect(page.getByRole('heading', { name: category })).toBeVisible();
      for (const project of items) {
        const projectLocator = page.getByTestId(`project-${project.name}`);
        await expect(
          projectLocator.getByRole('heading', {
            name: project.name,
            exact: true,
          })
        ).toBeVisible();

        if (project.url) {
          const visitLink = projectLocator.getByRole('link');
          await expect(visitLink).toHaveAttribute('href', project.url);
          await expect(visitLink).toBeVisible();
        }
      }
    }
  });

  test('Verify Project Card Modal Content', async ({ page }) => {
    // Grab project data for use in test.
    const targetProject = projects.Software.find(
      (project) => project.name === 'theqaguy.co.nz'
    );
    if (!targetProject) {
      throw new Error('Project "theqaguy.co.nz" not found in test data.');
    }

    const projectCard = page.getByTestId('project-theqaguy.co.nz');

    await projectCard.getByRole('button').click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await expect(
      dialog.getByRole('heading', { name: 'theqaguy.co.nz', exact: true })
    ).toBeVisible();

    await expect(dialog.getByText(targetProject.description)).toBeVisible();

    await expect(
      dialog.getByText(`Development Stage: ${targetProject.status}`)
    ).toBeVisible();

    await expect(dialog.getByText(targetProject.status)).toHaveClass(
      targetProject.status === 'Development'
        ? 'text-yellow-400'
        : 'text-green-400'
    );

    if (targetProject.technologies) {
      for (const tech of targetProject.technologies) {
        await expect(dialog.getByText(tech)).toBeVisible();
      }
    }
  });

  test('Accessibility Audit', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
