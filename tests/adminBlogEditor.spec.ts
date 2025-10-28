import { test, expect } from './fixtures/db-seed';
import config from '../playwright.config';
import { getAdminCredentials } from './utils/credentials';

const baseURL = config.use?.baseURL as string;
const { email: adminEmail, password: adminPassword } = getAdminCredentials();

test.use({ baseURL: baseURL });

async function login(page: any) {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Email Address' }).fill(adminEmail);
  await page.getByRole('textbox', { name: 'Password' }).fill(adminPassword);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForURL('/admin/blog');
}

test.describe('Blog Editor - Loading & Display', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Load Existing Blog in Editor', async ({ page }) => {
    await page.getByRole('link', { name: 'a-test-blog' }).click();
    await page.waitForURL('/admin/blog/a-test-blog');

    await expect(page).toHaveURL('/admin/blog/a-test-blog');
    await expect(
      page.getByRole('heading', { name: '<Edit_Blog/>' })
    ).toBeVisible();

    // Verify content
    const title = page.locator('#blog-title');
    await expect(title).toContainText('A Test Blog');

    const summary = page.locator('#blog-summary');
    await expect(summary).toContainText('A blog used for testing purposes');

    await expect(page.getByText('this is an h3')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Unpublish' })).toBeEnabled();
  });

  test('Verify Toolbar Buttons Present', async ({ page }) => {
    await page.goto('/admin/blog/a-test-blog');

    const toolbarButtons = [
      'Bold',
      'Italic',
      'Strike',
      { name: 'Code', exact: true }, // Use exact match to differentiate from "Code block"
      'Clear marks',
      'Clear nodes',
      'Paragraph',
      'H1',
      'H2',
      'H3',
      'H4',
      'H5',
      'Bullet list',
      'Ordered list',
      'Code block',
      'Blockquote',
      'Horizontal rule',
      'Hard break',
      'Undo',
      'Redo',
      'Upload Image',
      'Upload Banner',
      'Save',
      'Unpublish',
      'Add Tags',
    ];

    for (const buttonName of toolbarButtons) {
      const selector =
        typeof buttonName === 'string'
          ? page.getByRole('button', { name: buttonName })
          : page.getByRole('button', buttonName);
      await expect(selector).toBeVisible();
    }
  });

  test('Load New Blog Editor', async ({ page }) => {
    await page.getByRole('link', { name: 'New Blog' }).click();
    await page.waitForURL('/admin/blog/new');

    await expect(page).toHaveURL('/admin/blog/new');
    await expect(
      page.getByRole('heading', { name: '<New_Blog/>' })
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Publish' })).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Undo' })).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Redo' })).toBeDisabled();
  });
});

test.describe('Blog Editor - Content Editing', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/admin/blog/a-test-blog');
  });

  test('Edit Blog Title', async ({ page }) => {
    const titleElement = page.locator('#blog-title');

    // Triple click to select all text in the title
    await titleElement.click({ clickCount: 3 });
    await page.keyboard.type('Updated Test Blog Title');

    await expect(titleElement).toContainText('Updated Test Blog Title');
    await expect(page.getByRole('button', { name: 'Undo' })).toBeEnabled();
  });

  test('Edit Blog Summary', async ({ page }) => {
    const summaryElement = page.locator('#blog-summary');

    // Triple click to select all text in the summary
    await summaryElement.click({ clickCount: 3 });
    await page.keyboard.type('This is an updated summary for testing');

    await expect(summaryElement).toContainText(
      'This is an updated summary for testing'
    );
    await expect(page.getByRole('button', { name: 'Undo' })).toBeEnabled();
  });

  test('Apply Bold Formatting', async ({ page }) => {
    // Find and select text in first paragraph
    const paragraph = page
      .locator('p')
      .filter({ hasText: 'Yes this is a blog which is used solely' })
      .first();

    // Triple click to select paragraph
    await paragraph.click({ clickCount: 3 });

    await page.getByRole('button', { name: 'Bold' }).click();

    // Check button has active state (bg-accent class)
    const boldButton = page.getByRole('button', { name: 'Bold' });
    await expect(boldButton).toHaveClass(/bg-accent/);
  });

  test('Apply Italic Formatting', async ({ page }) => {
    const paragraph = page
      .locator('p')
      .filter({ hasText: 'Yes this is a blog which is used solely' })
      .first();

    await paragraph.click({ clickCount: 3 });
    await page.getByRole('button', { name: 'Italic' }).click();

    const italicButton = page.getByRole('button', { name: 'Italic' });
    await expect(italicButton).toHaveClass(/bg-accent/);
  });

  test('Apply Strike-through Formatting', async ({ page }) => {
    const paragraph = page
      .locator('p')
      .filter({ hasText: 'Yes this is a blog which is used solely' })
      .first();

    await paragraph.click({ clickCount: 3 });
    await page.getByRole('button', { name: 'Strike' }).click();

    const strikeButton = page.getByRole('button', { name: 'Strike' });
    await expect(strikeButton).toHaveClass(/bg-accent/);
  });

  test('Apply Inline Code Formatting', async ({ page }) => {
    const paragraph = page
      .locator('p')
      .filter({ hasText: 'Yes this is a blog which is used solely' })
      .first();

    await paragraph.click({ clickCount: 3 });
    await page.getByRole('button', { name: 'Code', exact: true }).click();

    const codeButton = page.getByRole('button', { name: 'Code', exact: true });
    await expect(codeButton).toHaveClass(/bg-accent/);
  });
});

test.describe('Blog Editor - Block-Level Elements', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/admin/blog/a-test-blog');
  });

  test('Convert Paragraph to H3', async ({ page }) => {
    const paragraph = page
      .locator('p')
      .filter({ hasText: 'The editor should be able to add' })
      .first();

    await paragraph.click();
    await page.getByRole('button', { name: 'H3' }).click();

    const h3Button = page.getByRole('button', { name: 'H3' });
    await expect(h3Button).toHaveClass(/bg-accent/);
  });

  test('Create Bullet List', async ({ page }) => {
    // Click at end of content
    const lastParagraph = page.locator('p').last();
    await lastParagraph.click();
    await page.keyboard.press('End');
    await page.keyboard.press('Enter');

    await page.getByRole('button', { name: 'Bullet list' }).click();

    const bulletButton = page.getByRole('button', { name: 'Bullet list' });
    await expect(bulletButton).toHaveClass(/bg-accent/);

    // Type list item
    await page.keyboard.type('First bullet point');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Second bullet point');

    // Wait a moment for text to appear
    await page.waitForTimeout(500);

    await expect(page.getByText('First bullet point')).toBeVisible();
    await expect(page.getByText('Second bullet point')).toBeVisible();
  });

  test('Create Ordered List', async ({ page }) => {
    const lastParagraph = page.locator('p').last();
    await lastParagraph.click();
    await page.keyboard.press('End');
    await page.keyboard.press('Enter');

    await page.getByRole('button', { name: 'Ordered list' }).click();

    const orderedButton = page.getByRole('button', { name: 'Ordered list' });
    await expect(orderedButton).toHaveClass(/bg-accent/);

    await page.keyboard.type('First item');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Second item');

    await expect(page.getByText('First item')).toBeVisible();
    await expect(page.getByText('Second item')).toBeVisible();
  });

  test('Add Code Block', async ({ page }) => {
    const lastParagraph = page.locator('p').last();
    await lastParagraph.click();
    await page.keyboard.press('End');
    await page.keyboard.press('Enter');

    await page.getByRole('button', { name: 'Code block' }).click();

    const codeBlockButton = page.getByRole('button', { name: 'Code block' });
    await expect(codeBlockButton).toHaveClass(/bg-accent/);

    // Verify code block elements present
    await expect(page.locator('select').last()).toBeVisible(); // Language dropdown
    await expect(page.locator('pre').last()).toBeVisible();
  });

  test('Change Code Block Language', async ({ page }) => {
    const languageDropdown = page.locator('select').first();

    await expect(languageDropdown).toHaveValue('typescript');

    await languageDropdown.selectOption('javascript');

    await expect(languageDropdown).toHaveValue('javascript');
  });

  test('Add Blockquote', async ({ page }) => {
    const paragraph = page
      .locator('p')
      .filter({ hasText: 'The editor should be able to add' })
      .first();

    await paragraph.click();
    await page.getByRole('button', { name: 'Blockquote' }).click();

    const blockquoteButton = page.getByRole('button', { name: 'Blockquote' });
    await expect(blockquoteButton).toHaveClass(/bg-accent/);
  });

  test('Insert Horizontal Rule', async ({ page }) => {
    const lastParagraph = page.locator('p').last();
    await lastParagraph.click();
    await page.keyboard.press('End');

    await page.getByRole('button', { name: 'Horizontal rule' }).click();

    await expect(page.locator('hr')).toBeVisible();
  });
});

test.describe('Blog Editor - Save & Publish Operations', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Save Existing Blog with Changes', async ({ page }) => {
    await page.goto('/admin/blog/a-test-blog');

    const titleElement = page.locator('#blog-title');
    await titleElement.click({ clickCount: 3 });
    await page.keyboard.type('Modified Title');

    const summaryElement = page.locator('#blog-summary');
    await summaryElement.click({ clickCount: 3 });
    await page.keyboard.type('Modified Summary');

    await page.getByRole('button', { name: 'Save' }).click();

    // Wait for redirect (slug changes based on title)
    await page.waitForURL('/admin/blog/modified_title');

    await expect(page).toHaveURL('/admin/blog/modified_title');

    // Verify changes persisted
    await expect(page.locator('#blog-title')).toContainText('Modified Title');
    await expect(page.locator('#blog-summary')).toContainText(
      'Modified Summary'
    );
  });

  test('Publish Unpublished Blog', async ({ page }) => {
    await page.goto('/admin/blog/a-blog-about-a-failed-publisher');

    await expect(page.getByRole('button', { name: 'Publish' })).toBeVisible();

    await page.getByRole('button', { name: 'Publish' }).click();

    // Wait for button text to change
    await expect(page.getByRole('button', { name: 'Unpublish' })).toBeVisible();

    // Verify on public blog page - check for the blog title
    await page.goto('/qa-blog');
    await expect(page.getByText('An unpublished blog')).toBeVisible();
  });

  test('Unpublish Published Blog', async ({ page }) => {
    await page.goto('/admin/blog/a-second-test-blog');

    await expect(page.getByRole('button', { name: 'Unpublish' })).toBeVisible();

    await page.getByRole('button', { name: 'Unpublish' }).click();

    await expect(page.getByRole('button', { name: 'Publish' })).toBeVisible();
  });

  // FIXME: New blog editor doesn't properly handle title/summary typing
  // The editor structure on /admin/blog/new is different - typing doesn't create proper blog structure
  test.fixme('Save New Blog', async ({ page }) => {
    await page.goto('/admin/blog/new');

    // Wait for editor to initialize
    await page.waitForTimeout(1000);

    // In the new blog editor, we need to type directly into the content area
    // The editor starts empty - first line becomes the title, second becomes summary
    const editorTextbox = page.getByRole('textbox');
    await editorTextbox.click();

    // Type title (will become H1/blogTitle)
    await page.keyboard.type('My New Blog Post');
    await page.keyboard.press('Enter');

    // Type summary (will become H2/blogSummary)
    await page.keyboard.type('This is a new blog summary');
    await page.keyboard.press('Enter');

    // Add some content
    await page.keyboard.type('This is the blog content.');

    await page.getByRole('button', { name: 'Save' }).click();

    await page.waitForURL('/admin/blog/my_new_blog_post');

    await expect(page).toHaveURL('/admin/blog/my_new_blog_post');
    await expect(page.locator('#blog-title')).toContainText('My New Blog Post');
  });
});

test.describe('Blog Editor - Undo/Redo Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/admin/blog/a-test-blog');
    // Wait for editor to load - increased timeout for parallel test execution
    await page.waitForSelector('#blog-title', {
      state: 'visible',
      timeout: 60000,
    });
  });

  test('Undo Text Change', async ({ page }) => {
    const titleElement = page.locator('#blog-title');
    const originalText = await titleElement.textContent();

    await titleElement.click({ clickCount: 3 });
    await page.keyboard.type('New Title');

    await expect(titleElement).toContainText('New Title');

    await page.getByRole('button', { name: 'Undo' }).click();

    await expect(titleElement).toContainText(originalText || '');
    await expect(page.getByRole('button', { name: 'Redo' })).toBeEnabled();
  });

  test('Redo Text Change', async ({ page }) => {
    const titleElement = page.locator('#blog-title');

    await titleElement.click({ clickCount: 3 });
    await page.keyboard.type('New Title');

    await page.getByRole('button', { name: 'Undo' }).click();
    await page.getByRole('button', { name: 'Redo' }).click();

    await expect(titleElement).toContainText('New Title');
  });
});
