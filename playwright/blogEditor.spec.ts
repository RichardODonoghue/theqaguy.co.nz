import { test, expect } from '@playwright/test';
import { Blog } from './pcoms/blog';
import { BlogEditorPage } from './pcoms/blogEditor';
import { ContentHeader } from './pcoms/contentHeader';
import config from '../playwright.config';
import { seedDatabase } from './utils/seedDatabase';

const baseURL = config.use?.baseURL;

test.use({ baseURL: baseURL });

test.describe('Blog Editor', () => {
  let blogEditor: BlogEditorPage;

  test.beforeEach(async ({ page }) => {
    blogEditor = new BlogEditorPage(page);
  });

  test('Verify Blog Editor Page Metadata', async ({ page }) => {
    await blogEditor.goToBlog('a-test-blog');

    expect(
      await page.getAttribute('title', 'TheQAGuy | Blog Editor')
    ).toBeDefined();
  });

  test('Verify Blog Content For Existing Blog Post', async ({ page }) => {
    await blogEditor.goToBlog('a-test-blog');

    const contentHeader = new ContentHeader(page);
    await expect(contentHeader.headerText).toHaveText('<Edit_Blog/>');

    await expect(blogEditor.title).toContainText('A Test Blog');
    await expect(blogEditor.summary).toContainText(
      'A blog used for testing purposes'
    );
  });

  test('Can edit Blog Post', async ({ page }) => {
    test.skip(
      baseURL === 'https://theqaguy.co.nz',
      'Skipping test on production'
    );
    const blog = new Blog(blogEditor.page);

    await blogEditor.goToBlog('a-test-blog');

    await blogEditor.editBlogParagraph('Additional content added here.', 2);
    await expect(blogEditor.editor).toContainText(
      'Additional content added here.'
    );

    await blogEditor.clickToolbarButton('Save');

    await expect(page.getByText('Blog saved successfully!')).toBeVisible();
    await blog.goto(`a-test-blog`);

    await expect(blog.content.getByRole('paragraph').nth(2)).toContainText(
      'Additional content added here.'
    );

    await seedDatabase();
  });

  test('Can Add Codeblock to Blog Post', async () => {
    await blogEditor.goToBlog();

    await blogEditor.clickToolbarButton('Code Block');
    await expect(blogEditor.codeblock).toBeVisible();
    await blogEditor.codeblock.fill('console.log("Hello, World!");');
    expect(blogEditor.codeblock).toContainText('console.log("Hello, World!");');
  });

  test('Can set codeblock language', async () => {
    await blogEditor.goToBlog();

    await blogEditor.clickToolbarButton('Code Block');

    const languageSelect = blogEditor.codeblock.getByRole('combobox');
    await languageSelect.selectOption('typescript');

    await expect(languageSelect).toHaveValue('typescript');
  });

  test('Verify Blog Editor Content For New Blog Post', async ({ page }) => {
    await blogEditor.goToBlog();

    const contentHeader = new ContentHeader(page);
    expect(contentHeader.headerText).toHaveText('<New_Blog/>');

    await expect(blogEditor.editor.getByRole('paragraph')).toBeEmpty();
  });
});
