import { test, expect } from '@playwright/test';
import { Blog } from '../models/blog';
import { BlogEditorPage } from '../models/blogEditor';
import { ContentHeader } from '../models/contentHeader';
import config from '../../playwright.config';
import { seedDatabase } from '../config/seedDatabase';

const baseURL = config.use?.baseURL;

test.use({ baseURL: baseURL });

// Ensure tests run in serial mode as these tests modify blog data
// and should not run in parallel to avoid conflicts.
test.describe.configure({ mode: 'serial' });

test.describe('Blog Editor', () => {
  let blogEditor: BlogEditorPage;

  test.beforeEach(async ({ page }) => {
    blogEditor = new BlogEditorPage(page);
  });

  test('Verify blog editor page metadata', async ({ page }) => {
    await blogEditor.goToBlog('a-test-blog');

    await expect(page).toHaveTitle('TheQAGuy | Blog Editor');
  });

  test('Verify blog content for existing blog post', async ({ page }) => {
    await blogEditor.goToBlog('a-test-blog');

    const contentHeader = new ContentHeader(page);
    await expect(contentHeader.headerText).toHaveText('<Edit_Blog/>');

    await expect(blogEditor.title).toHaveValue('A Test Blog');
    await expect(blogEditor.summary).toHaveValue(
      'A blog used for testing purposes'
    );
  });

  test('Can edit blog post', async ({ page }) => {
    test.skip(
      baseURL === 'https://theqaguy.co.nz' ||
        process.env.NODE_ENV === 'production',
      'Skipping test on production'
    );

    await blogEditor.goToBlog('a-test-blog');

    await expect(blogEditor.editor.getByRole('paragraph').nth(2)).toBeVisible();

    await blogEditor.editBlogParagraph('Additional content added here.', 2);
    await expect(blogEditor.editor).toContainText(
      'Additional content added here.'
    );

    await blogEditor.clickToolbarButton('Save');

    await expect(page.getByText('Blog saved successfully!')).toBeVisible();
    await expect(page.getByText('Blog saved successfully!')).toBeHidden({
      timeout: 10000,
    });

    await page.goto('/qa-blog/a-test-blog');

    const blog = new Blog(page);

    await expect(blog.content).toBeVisible();
    await expect(blog.content).toContainText('Additional content added here.');

    await seedDatabase();
  });

  test('Can add custom codeblock to blog post', async ({ page }) => {
    await blogEditor.goToBlog();

    await blogEditor.clickToolbarButton('Code Block');
    await Promise.all([
      await expect(blogEditor.codeblock.element).toBeVisible(),
      await expect(blogEditor.codeblock.content).toBeVisible(),
    ]);

    await blogEditor.codeblock.content.fill('console.log("Hello, World!");');
    await expect(blogEditor.codeblock.content).toContainText(
      'console.log("Hello, World!");'
    );
  });

  test('Can set codeblock language', async () => {
    await blogEditor.goToBlog();

    await blogEditor.clickToolbarButton('Code Block');

    await blogEditor.codeblock.languageDropdown.selectOption('typescript');

    await expect(blogEditor.codeblock.languageDropdown).toHaveValue(
      'typescript'
    );
  });

  test('Verify blog editor content for new blog post', async ({ page }) => {
    await blogEditor.goToBlog();

    const contentHeader = new ContentHeader(page);
    await expect(contentHeader.headerText).toHaveText('<New_Blog/>');

    await expect(blogEditor.editor.getByRole('paragraph')).toBeEmpty();
  });
});
