import { test, expect } from '@playwright/test';
import { BlogEditor } from './pcoms/blogEditor';
import { ContentHeader } from './pcoms/contentHeader';

test.describe('Blog Editor', () => {
  test('Verify Blog Editor Page Metadata', async ({ page }) => {
    const blogEditor = new BlogEditor(page);
    await blogEditor.goToBlog('a-test-blog');

    expect(
      await page.getAttribute('title', 'TheQAGuy | Blog Editor')
    ).toBeDefined();
  });

  test('Verify Blog Content For Existing Blog Post', async ({ page }) => {
    const blogEditor = new BlogEditor(page);
    await blogEditor.goToBlog('a-test-blog');

    expect(blogEditor.title).toContainText('A Test Blog');
    expect(blogEditor.summary).toContainText(
      'A blog used for testing purposes'
    );
  });

  test('Can edit Blog Post', async ({ page }) => {
    const blogEditor = new BlogEditor(page);
    await blogEditor.goToBlog('a-test-blog');

    await blogEditor.editBlogParagraph('Additional content added here.', 2);
    expect(blogEditor.content).toContainText('Additional content added here.');
  });

  test('Can Add Codeblock to Blog Post', async ({ page }) => {
    const blogEditor = new BlogEditor(page);
    await blogEditor.goToBlog();

    await blogEditor.clickToolbarButton('Code Block');
    const codeBlock = blogEditor.content.getByTestId('code-block');

    await expect(codeBlock).toBeVisible();
    await codeBlock.fill('console.log("Hello, World!");');
    expect(codeBlock).toContainText('console.log("Hello, World!");');
  });

  test('Can set codeblock language', async ({ page }) => {
    const blogEditor = new BlogEditor(page);
    await blogEditor.goToBlog();

    await blogEditor.clickToolbarButton('Code Block');
    const codeBlock = blogEditor.content.getByTestId('code-block');

    const languageSelect = codeBlock.getByRole('combobox');
    await languageSelect.selectOption('typescript');

    await expect(languageSelect).toHaveValue('typescript');
  });

  test('Verify Blog Editor Content For New Blog Post', async ({ page }) => {
    const blogEditor = new BlogEditor(page);

    await blogEditor.goToBlog();

    const contentHeader = new ContentHeader(page);
    expect(contentHeader.header.getByRole('heading', { level: 1 })).toHaveText(
      '<New_Blog/>'
    );

    await expect(blogEditor.content.getByRole('paragraph')).toBeEmpty();
  });
});
