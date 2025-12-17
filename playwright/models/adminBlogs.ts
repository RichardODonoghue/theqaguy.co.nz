import { Page, Locator } from '@playwright/test';

export class AdminBlogPage {
  readonly page: Page;
  readonly newBlogButton: Locator;
  readonly table: Locator;
  tableRow:
    | {
        slug: Locator;
        title: Locator;
        summary: Locator;
        tags: Locator;
        published: Locator;
        createdAt: Locator;
      }
    | undefined;

  constructor(page: Page) {
    this.page = page;
    this.table = page.getByTestId('blog-table');
    this.newBlogButton = page.getByRole('link', { name: 'New Blog' });
  }

  async goto() {
    await this.page.goto('/admin/blog');
  }

  async setTableRow(slug: string) {
    const blogRow = this.table.locator('tbody tr').filter({ hasText: slug });

    this.tableRow = {
      slug: blogRow.locator('td').nth(0),
      title: blogRow.locator('td').nth(1),
      summary: blogRow.locator('td').nth(2),
      tags: blogRow.locator('td').nth(3),
      published: blogRow.locator('td').nth(4),
      createdAt: blogRow.locator('td').nth(5),
    };

    return this.tableRow;
  }
}
