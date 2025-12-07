import { Page, Locator, expect } from '@playwright/test';

/**
 * @description: Page Component Object Model for Blog Editor Page
 * This class encapsulates the elements and actions available on the Blog Editor page.
 * @constructor
 * @param {Page} Page - The Playwright Page object representing the browser page.
 * @param {Locator} titleInput - Locator for the blog title input field.
 * @param {Locator} summaryInput - Locator for the blog summary input field.
 * @param {Locator} toolbar - Locator for the blog editor toolbar.
 * @param {Locator} content - Locator for the blog content text area.
 * @returns {BlogEditor} An instance of the BlogEditor class.
 */

export class BlogEditorPage {
  readonly page: Page;
  readonly title: Locator;
  readonly summary: Locator;
  readonly toolbar: Locator;
  readonly editor: Locator;
  readonly codeblock: {
    element: Locator;
    languageDropdown: Locator;
    content: Locator;
  };
  readonly paragraph: Locator;
  readonly image?: Locator;
  readonly separator?: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editor = page.getByTestId('editor');
    this.title = page.locator('#blog-title');
    this.summary = page.locator('#blog-summary');
    this.toolbar = page.getByTestId('blog-toolbar');
    this.codeblock = {
      element: page.getByTestId('code-block'),
      languageDropdown: page.getByRole('combobox'),
      content: page.getByTestId('code-block-content'),
    };
    this.paragraph = page.getByRole('paragraph');
  }

  /**
   *
   * @param slug - The slug of the blog post to navigate to. If empty, navigates to the new blog post page.
   */
  async goToBlog(slug = '') {
    if (slug.length > 0) {
      await this.page.goto(`/admin/blog/${slug}`);
    } else {
      await this.page.goto('/admin/blog/new');
    }

    /*
     * Ensure that the page is loaded before proceeding.
     * This is technically an anti-pattern as this is an assertion which should be
     * in the test file however this reduces boilerplate.
     */
    await expect(this.editor).toBeVisible();
  }

  async updateTitle(newTitle: string) {
    await this.title.fill(newTitle);
  }

  async updateSummary(newSummary: string) {
    await this.summary.fill(newSummary);
  }

  async clickToolbarButton(buttonName: string) {
    await this.toolbar.getByRole('button', { name: buttonName }).click();
  }

  async editBlogParagraph(content: string, paragraphIndex = 0) {
    await this.editor.getByRole('paragraph').nth(paragraphIndex).fill(content);
  }
}
