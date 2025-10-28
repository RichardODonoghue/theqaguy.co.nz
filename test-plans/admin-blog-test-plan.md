# Admin Blog Management - Comprehensive Test Plan

## Application Overview

The Admin Blog Management system is an authenticated area of the application that allows administrators to create, view, edit, and manage blog posts. The system features:

- **Authentication**: Login-protected access at `/admin/blog` (login via `/login`)
- **Blog List Management**: Tabular view of all blogs with key metadata
- **Rich Text Editor**: WYSIWYG editor powered by Tiptap with custom extensions
- **Content Features**: Support for text formatting, headings, code blocks, images, and tags
- **Publishing Control**: Toggle blog visibility between published and unpublished states
- **Image Management**: Cloudinary integration for banner and content images

## Prerequisites

- Database seeded with test blogs from `prisma/seed_blogs.ts` (3 blogs: 2 published, 1 unpublished)
- Admin credentials available in `.env` file:
  - `ADMIN_EMAIL`: richard.odonoghue.nz@gmail.com
  - `ADMIN_PASSWORD`: VmMUKuGkJWaoQAe87NYs
- Application running at `BASE_URL` (https://local.theqaguy.co.nz:3000)

## Test Scenarios

### 1. Authentication & Access

**Seed:** `tests/seed.spec.ts`

#### 1.1 Login with Valid Credentials

**Steps:**

1. Navigate to `/login`
2. Enter admin email in "Email Address" field
3. Enter admin password in "Password" field
4. Click "Continue" button

**Expected Results:**

- User is redirected to `/admin/blog`
- No error messages displayed
- Console shows "Login successful!" message
- Admin blogs page loads with content

#### 1.2 Login with Invalid Email

**Steps:**

1. Navigate to `/login`
2. Enter invalid email (e.g., "invalid@example.com") in "Email Address" field
3. Enter any password in "Password" field
4. Click "Continue" button

**Expected Results:**

- User remains on `/login` page
- Alert displayed: "Login failed. Please check your credentials and try again."
- Console shows error message

#### 1.3 Login with Invalid Password

**Steps:**

1. Navigate to `/login`
2. Enter valid admin email in "Email Address" field
3. Enter incorrect password in "Password" field
4. Click "Continue" button

**Expected Results:**

- User remains on `/login` page
- Alert displayed: "Login failed. Please check your credentials and try again."
- Console shows error message

#### 1.4 Login with Empty Fields

**Steps:**

1. Navigate to `/login`
2. Leave both email and password fields empty
3. Click "Continue" button

**Expected Results:**

- Form validation prevents submission
- HTML5 required field validation messages appear
- Form does not submit

#### 1.5 Verify Authentication Persistence

**Steps:**

1. Log in with valid credentials
2. Navigate to `/admin/blog`
3. Refresh the page

**Expected Results:**

- User remains authenticated
- Page reloads without redirect to login
- Admin blog list remains visible

### 2. Blog List Display & Data Integrity

**Seed:** `tests/seed.spec.ts` (after seeding database)

#### 2.1 Verify Correct Number of Blogs Displayed

**Steps:**

1. Log in to admin account
2. Navigate to `/admin/blog`
3. Count the number of rows in the blog table (excluding header)

**Expected Results:**

- Table displays exactly 3 blog rows matching seed data:
  1. "a-test-blog"
  2. "a-second-test-blog"
  3. "a-blog-about-a-failed-publisher"

#### 2.2 Verify Table Column Headers

**Steps:**

1. Navigate to `/admin/blog` (authenticated)
2. Examine table header row

**Expected Results:**

- Table contains exactly 6 column headers in order:
  1. "Slug"
  2. "Title"
  3. "Summary"
  4. "Tags"
  5. "Published"
  6. "Date Created"

#### 2.3 Verify First Blog Data (a-test-blog)

**Steps:**

1. Navigate to `/admin/blog` (authenticated)
2. Examine the first row in the table

**Expected Results:**

- **Slug**: "a-test-blog" (clickable link to `/admin/blog/a-test-blog`)
- **Title**: "A Test Blog"
- **Summary**: "A blog used for testing purposes"
- **Tags**: "testing,screaming_internally,test"
- **Published**: "true"
- **Date Created**: "2025-10-01T10:00:00.000Z"

#### 2.4 Verify Second Blog Data (a-second-test-blog)

**Steps:**

1. Navigate to `/admin/blog` (authenticated)
2. Examine the second row in the table

**Expected Results:**

- **Slug**: "a-second-test-blog" (clickable link to `/admin/blog/a-second-test-blog`)
- **Title**: "A Second test blog"
- **Summary**: "This is empty but published"
- **Tags**: "tag,tag-2,tag-3"
- **Published**: "true"
- **Date Created**: "2025-02-01T10:00:00.000Z"

#### 2.5 Verify Third Blog Data (unpublished blog)

**Steps:**

1. Navigate to `/admin/blog` (authenticated)
2. Examine the third row in the table

**Expected Results:**

- **Slug**: "a-blog-about-a-failed-publisher" (clickable link to `/admin/blog/a-blog-about-a-failed-publisher`)
- **Title**: "An unpublished blog"
- **Summary**: "Today you will not see this"
- **Tags**: "tag,tag-2,tag-3"
- **Published**: "false"
- **Date Created**: "2024-01-01T10:00:00.000Z"

#### 2.6 Verify Slug Links Are Functional

**Steps:**

1. Navigate to `/admin/blog` (authenticated)
2. Click the "a-test-blog" link in the first row

**Expected Results:**

- User is navigated to `/admin/blog/a-test-blog`
- Blog editor page loads
- Editor displays blog content

#### 2.7 Verify New Blog Button Presence and Functionality

**Steps:**

1. Navigate to `/admin/blog` (authenticated)
2. Verify "New Blog" button is visible
3. Click "New Blog" button

**Expected Results:**

- "New Blog" button is visible above the table
- Clicking navigates to `/admin/blog/new`
- Empty blog editor loads with default placeholder content
- "Publish" button is disabled (cannot publish unsaved blog)

### 3. Blog Editor - Loading & Display

**Seed:** `tests/seed.spec.ts`

#### 3.1 Load Existing Blog in Editor

**Steps:**

1. Navigate to `/admin/blog` (authenticated)
2. Click on "a-test-blog" link
3. Wait for editor to load

**Expected Results:**

- Page URL is `/admin/blog/a-test-blog`
- Page heading shows "<Edit_Blog/>"
- Toolbar is visible with all formatting buttons
- Editor content area displays:
  - H1: "A Test Blog" (#blog-title)
  - H2: "A blog used for testing purposes" (#blog-summary)
  - Paragraph text about testing
  - H3: "this is an h3"
  - Image element (Cloudinary image)
  - Code block with TypeScript code
- "Unpublish" button is enabled (blog is currently published)

#### 3.2 Verify Toolbar Buttons Present

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Examine the toolbar

**Expected Results:**
Toolbar contains the following buttons in order:

- Text formatting: Bold, Italic, Strike, Code
- Clear options: Clear marks, Clear nodes
- Block types: Paragraph, H1, H2, H3, H4, H5
- Lists: Bullet list, Ordered list
- Special blocks: Code block, Blockquote
- Separators: Horizontal rule, Hard break
- History: Undo (initially disabled), Redo (initially disabled)
- Media: Upload Image, Upload Banner
- Actions: Save, Unpublish (or Publish)
- Tags: Add Tags

#### 3.3 Load New Blog Editor

**Steps:**

1. Navigate to `/admin/blog` (authenticated)
2. Click "New Blog" button

**Expected Results:**

- Page URL is `/admin/blog/new`
- Page heading shows "<New_Blog/>"
- Toolbar is visible
- Editor content area is empty (contains only single empty paragraph)
- "Publish" button is disabled
- Undo/Redo buttons are disabled

### 4. Blog Editor - Content Editing

**Seed:** `tests/seed.spec.ts`

#### 4.1 Edit Blog Title

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click into the H1 title field (#blog-title)
3. Select all text (Ctrl+A or Cmd+A)
4. Type "Updated Test Blog Title"

**Expected Results:**

- H1 title immediately updates to "Updated Test Blog Title"
- Title field retains focus
- Undo button becomes enabled
- No automatic save occurs (changes held in memory)

#### 4.2 Edit Blog Summary

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click into the H2 summary field (#blog-summary)
3. Select all text
4. Type "This is an updated summary for testing"

**Expected Results:**

- H2 summary immediately updates to "This is an updated summary for testing"
- Summary field retains focus
- Undo button becomes enabled
- No automatic save occurs

#### 4.3 Edit Paragraph Text

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click into the first paragraph
3. Add text: " Here is some additional content."

**Expected Results:**

- Text is immediately inserted at cursor position
- Paragraph updates in real-time
- Undo button becomes enabled

#### 4.4 Apply Bold Formatting

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Select some text in a paragraph
3. Click the "Bold" button in toolbar

**Expected Results:**

- Selected text becomes bold
- "Bold" button highlights/shows active state
- Text remains selected
- Undo button becomes enabled

#### 4.5 Apply Italic Formatting

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Select some text in a paragraph
3. Click the "Italic" button in toolbar

**Expected Results:**

- Selected text becomes italic
- "Italic" button highlights/shows active state
- Text remains selected
- Undo button becomes enabled

#### 4.6 Apply Strike-through Formatting

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Select some text in a paragraph
3. Click the "Strike" button in toolbar

**Expected Results:**

- Selected text has strike-through applied
- "Strike" button highlights/shows active state
- Text remains selected

#### 4.7 Apply Inline Code Formatting

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Select some text in a paragraph
3. Click the "Code" button in toolbar

**Expected Results:**

- Selected text is formatted as inline code (monospace, styled)
- "Code" button highlights/shows active state
- Text remains selected

#### 4.8 Clear All Formatting Marks

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Select text with bold and italic formatting
3. Click "Clear marks" button

**Expected Results:**

- All text formatting (bold, italic, strike, code) is removed
- Text returns to plain paragraph style
- Text remains selected

### 5. Blog Editor - Block-Level Elements

**Seed:** `tests/seed.spec.ts`

#### 5.1 Convert Paragraph to H1

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click into a paragraph (not title or summary)
3. Click "H1" button in toolbar

**Expected Results:**

- Paragraph converts to H1 heading
- "H1" button shows active state
- Text styling updates to H1 appearance

#### 5.2 Convert Paragraph to H2

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click into a paragraph
3. Click "H2" button in toolbar

**Expected Results:**

- Paragraph converts to H2 heading
- "H2" button shows active state
- Text styling updates to H2 appearance

#### 5.3 Convert Paragraph to H3

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click into a paragraph
3. Click "H3" button in toolbar

**Expected Results:**

- Paragraph converts to H3 heading
- "H3" button shows active state
- Matches existing H3 heading style in the blog

#### 5.4 Create Bullet List

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click at the end of content
3. Press Enter to create new paragraph
4. Click "Bullet list" button

**Expected Results:**

- New bullet list is created
- First list item is ready for input
- "Bullet list" button shows active state
- Pressing Enter creates new bullet points

#### 5.5 Create Ordered List

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click at the end of content
3. Press Enter to create new paragraph
4. Click "Ordered list" button

**Expected Results:**

- New numbered list is created (1.)
- First list item is ready for input
- "Ordered list" button shows active state
- Pressing Enter creates new numbered items

#### 5.6 Add Code Block

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click at the end of content or in a new paragraph
3. Click "Code block" button

**Expected Results:**

- New code block is inserted
- Code block has language selector dropdown (default: "auto")
- Code block has dark background (bg-slate-800)
- Cursor is positioned inside code block for typing
- "Code block" button shows active state

#### 5.7 Change Code Block Language

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click into the existing TypeScript code block
3. Click the language dropdown (currently showing "typescript")
4. Select "javascript" from dropdown

**Expected Results:**

- Dropdown shows "javascript" as selected
- Code syntax highlighting updates to JavaScript
- Code content remains unchanged

#### 5.8 Add Blockquote

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click in a paragraph or create new one
3. Click "Blockquote" button

**Expected Results:**

- Paragraph converts to blockquote
- Blockquote has distinctive styling (border/indentation)
- "Blockquote" button shows active state

#### 5.9 Insert Horizontal Rule

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click at the end of content
3. Click "Horizontal rule" button

**Expected Results:**

- Horizontal rule (line separator) is inserted
- Cursor moves below the horizontal rule
- New paragraph is created below

#### 5.10 Insert Hard Break

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click inside a paragraph
3. Click "Hard break" button

**Expected Results:**

- Line break is inserted within the paragraph
- Cursor moves to new line within same paragraph
- Does not create new paragraph block

### 6. Blog Editor - Image Management

**Seed:** `tests/seed.spec.ts`

#### 6.1 Verify Existing Image Display

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Scroll to the Cloudinary image in the editor

**Expected Results:**

- Image is displayed in the editor
- Image has alt text "description"
- Image shows delete button overlay on hover
- Image is sized correctly (w-1/3 per seed data)

#### 6.2 Upload Content Image (Happy Path - Mocked)

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click "Upload Image" button
3. Mock Cloudinary widget success with test public_id
4. Widget triggers onSuccess callback

**Expected Results:**

- Cloudinary image node is inserted at cursor position
- Image uses the mocked public_id as src
- Image has default alt "description"
- Image is visible in editor

**Note:** This test requires mocking the Cloudinary widget's onSuccess event

#### 6.3 Upload Banner Image (Happy Path - Mocked)

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click "Upload Banner" button
3. Mock Cloudinary widget success with test public_id
4. Widget triggers onSuccess callback

**Expected Results:**

- Blog's banner image is updated in database
- No image node inserted in editor content (banner is metadata)
- Widget closes after upload

**Note:** This test requires mocking the Cloudinary widget and verifying the updateBlogBySlug call

#### 6.4 Cancel Image Upload

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click "Upload Image" button
3. Mock Cloudinary widget close without upload

**Expected Results:**

- Widget closes
- No image is inserted
- Editor content remains unchanged

### 7. Blog Editor - Tag Management

**Seed:** `tests/seed.spec.ts`

#### 7.1 Open Tag Dialog

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click "Add Tags" button

**Expected Results:**

- Tag dialog/modal opens
- Current tags are displayed: "testing", "screaming_internally", "test"
- Interface allows adding/removing tags

**Note:** Exact tag dialog behavior depends on implementation details not visible in snapshot

#### 7.2 Add New Tag

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click "Add Tags" button
3. Add new tag "new-tag"
4. Confirm/save tag changes

**Expected Results:**

- New tag is added to blog's tag list
- Tag is persisted when blog is saved
- Dialog closes or updates to show new tag

#### 7.3 Remove Existing Tag

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click "Add Tags" button
3. Remove tag "screaming_internally"
4. Confirm/save tag changes

**Expected Results:**

- Tag is removed from blog's tag list
- Removal is persisted when blog is saved
- Dialog updates to reflect removal

### 8. Blog Editor - Save & Publish Operations

**Seed:** `tests/seed.spec.ts`

#### 8.1 Save Existing Blog with Changes

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Edit the title to "Modified Title"
3. Edit the summary to "Modified Summary"
4. Click "Save" button
5. Wait for redirect

**Expected Results:**

- Blog is saved to database
- Page redirects to `/admin/blog/a-test-blog` (same URL, reload)
- On reload, verify:
  - Title shows "Modified Title" (H1)
  - Summary shows "Modified Summary" (H2)
  - Slug is regenerated to "modified_title"
  - Page URL updates to `/admin/blog/modified_title`

**Note:** The toolbar's `buildBlogObject()` regenerates slug from title

#### 8.2 Save Blog with Code Block Added

**Steps:**

1. Navigate to `/admin/blog/a-second-test-blog` (authenticated)
2. Click at end of content
3. Click "Code block" button
4. Type code: `console.log('test');`
5. Select "javascript" language
6. Click "Save" button
7. Reload page

**Expected Results:**

- Code block persists after save/reload
- Language is set to "javascript"
- Code content is preserved: `console.log('test');`
- Syntax highlighting is applied

#### 8.3 Save New Blog

**Steps:**

1. Navigate to `/admin/blog/new` (authenticated)
2. Click into title area (will auto-create blogTitle node)
3. Type "My New Blog Post"
4. Click into summary area
5. Type "This is a new blog summary"
6. Add paragraph content
7. Click "Save" button

**Expected Results:**

- Blog is created in database
- Slug is generated: "my_new_blog_post"
- Page redirects to `/admin/blog/my_new_blog_post`
- Blog appears in `/admin/blog` table
- Published status is false (unpublished by default)

#### 8.4 Publish Unpublished Blog

**Steps:**

1. Navigate to `/admin/blog/a-blog-about-a-failed-publisher` (authenticated)
2. Verify button shows "Publish"
3. Click "Publish" button
4. Wait for update to complete

**Expected Results:**

- Button text changes to "Unpublish"
- Blog's published status updated to true in database
- Blog now appears on public `/qa-blog` page
- No page redirect occurs (status update only)

#### 8.5 Unpublish Published Blog

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Verify button shows "Unpublish"
3. Click "Unpublish" button
4. Wait for update to complete

**Expected Results:**

- Button text changes to "Publish"
- Blog's published status updated to false in database
- Blog no longer appears on public `/qa-blog` page
- No page redirect occurs

#### 8.6 Save Without Title (Error Case)

**Steps:**

1. Navigate to `/admin/blog/new` (authenticated)
2. Leave title empty or delete existing title content
3. Add summary and body content
4. Click "Save" button

**Expected Results:**

- Error is thrown: "No blog title"
- Blog is not saved
- User remains on edit page
- Error message displayed (check console or alert)

#### 8.7 Verify Slug Generation on Save

**Steps:**

1. Navigate to `/admin/blog/new` (authenticated)
2. Set title to "A Blog With Special Ch@racters!! & Spaces"
3. Add summary
4. Click "Save" button

**Expected Results:**

- Slug is sanitized and generated: "a_blog_with_special_characters_spaces"
- Special characters removed
- Spaces converted to underscores
- All lowercase
- Page redirects to `/admin/blog/a_blog_with_special_characters_spaces`

### 9. Blog Editor - Undo/Redo Functionality

**Seed:** `tests/seed.spec.ts`

#### 9.1 Undo Text Change

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Edit title text
3. Verify "Undo" button is enabled
4. Click "Undo" button

**Expected Results:**

- Last change is reversed
- Title returns to previous content
- "Redo" button becomes enabled
- If no more undo history, "Undo" button becomes disabled

#### 9.2 Redo Text Change

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Edit title text
3. Click "Undo" button
4. Click "Redo" button

**Expected Results:**

- Undone change is reapplied
- Title returns to edited content
- "Undo" button remains enabled
- If no more redo history, "Redo" button becomes disabled

#### 9.3 Undo Block Type Change

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Select a paragraph
3. Convert to H2
4. Click "Undo" button

**Expected Results:**

- H2 reverts back to paragraph
- Content remains the same
- "Redo" button becomes enabled

### 10. Blog Editor - Clear Operations

**Seed:** `tests/seed.spec.ts`

#### 10.1 Clear All Marks

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Select text with bold and italic applied
3. Click "Clear marks" button

**Expected Results:**

- Bold formatting removed
- Italic formatting removed
- Text remains as plain paragraph content
- Selection preserved

#### 10.2 Clear Nodes

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click inside a heading (H3)
3. Click "Clear nodes" button

**Expected Results:**

- Heading structure is removed
- Content converts to plain paragraph
- Text content preserved
- Cursor position maintained

### 11. Blog List - Navigation & UI

**Seed:** `tests/seed.spec.ts`

#### 11.1 Navigate Between Blogs Using Table Links

**Steps:**

1. Navigate to `/admin/blog` (authenticated)
2. Click "a-test-blog" link
3. Use browser back button
4. Click "a-second-test-blog" link

**Expected Results:**

- First click navigates to `/admin/blog/a-test-blog`
- Back button returns to `/admin/blog`
- Second click navigates to `/admin/blog/a-second-test-blog`
- Each editor loads with correct blog content

#### 11.2 Return to Blog List from Editor

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Use browser back button or navigate to `/admin/blog`

**Expected Results:**

- User returns to blog list page
- All blogs still displayed in table
- No unsaved changes are lost (editor doesn't auto-save)

### 12. Accessibility & Usability

**Seed:** `tests/seed.spec.ts`

#### 12.1 Accessibility Audit - Blog List Page

**Steps:**

1. Navigate to `/admin/blog` (authenticated)
2. Run axe-core accessibility scanner

**Expected Results:**

- No critical accessibility violations
- Table has proper ARIA labels
- Links have accessible names
- Color contrast meets WCAG AA standards

#### 12.2 Accessibility Audit - Blog Editor

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Run axe-core accessibility scanner

**Expected Results:**

- No critical accessibility violations
- Toolbar buttons have accessible labels
- Editor region has proper ARIA role
- Keyboard navigation works for all controls

#### 12.3 Keyboard Navigation - Blog List

**Steps:**

1. Navigate to `/admin/blog` (authenticated)
2. Press Tab repeatedly to navigate through interactive elements
3. Press Enter on "New Blog" button
4. Press Tab to navigate to slug link
5. Press Enter on slug link

**Expected Results:**

- All interactive elements receive focus in logical order
- Focus indicators are visible
- Enter key activates buttons and links
- No keyboard traps exist

#### 12.4 Keyboard Navigation - Blog Editor

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Press Tab to navigate toolbar buttons
3. Use arrow keys in editor content
4. Press keyboard shortcuts (Ctrl+B for bold, etc.)

**Expected Results:**

- All toolbar buttons are keyboard accessible
- Editor content is navigable with arrow keys
- Common keyboard shortcuts work (if implemented)
- Tab order is logical

### 13. Edge Cases & Error Handling

**Seed:** `tests/seed.spec.ts`

#### 13.1 Navigate to Non-Existent Blog

**Steps:**

1. Navigate to `/admin/blog` (authenticated)
2. Manually navigate to `/admin/blog/non-existent-slug`

**Expected Results:**

- Page handles missing blog gracefully
- Shows error message or redirects to 404
- No console errors thrown
- User can navigate back to blog list

#### 13.2 Attempt to Save Blog Without Changes

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Click "Save" button without making any edits

**Expected Results:**

- Blog saves successfully (idempotent operation)
- Page redirects to `/admin/blog/a-test-blog`
- No data corruption occurs
- All content remains intact

#### 13.3 Create Multiple Code Blocks

**Steps:**

1. Navigate to `/admin/blog/new` (authenticated)
2. Add blog title and summary
3. Click "Code block" button
4. Type some code
5. Click below code block
6. Click "Code block" button again
7. Type different code
8. Click "Save"

**Expected Results:**

- Both code blocks are created successfully
- Each code block can have different languages
- Both persist after save
- Code blocks don't interfere with each other

#### 13.4 Rapid Clicking on Save Button

**Steps:**

1. Navigate to `/admin/blog/a-test-blog` (authenticated)
2. Make a small edit
3. Click "Save" button rapidly 5 times

**Expected Results:**

- Only one save operation executes
- No duplicate blogs created
- Page redirects once
- Database state is correct (one update)

#### 13.5 Verify Blog Title/Summary Enforced Nodes

**Steps:**

1. Navigate to `/admin/blog/new` (authenticated)
2. Attempt to delete the blog title H1 node
3. Attempt to delete the blog summary H2 node

**Expected Results:**

- Blog title cannot be deleted (ProseMirror plugin prevents deletion)
- Blog summary is auto-inserted if missing (enforced by plugin)
- At most one blog title exists (enforced by plugin)
- Blog title always appears first

**Note:** Based on `blogTitle.ts` and `blogSummary.ts` plugin implementations

## Summary

This test plan covers:

- **Authentication**: 5 scenarios covering login flows and session persistence
- **Blog List Display**: 7 scenarios verifying data integrity and table functionality
- **Editor Loading**: 3 scenarios for loading existing and new blogs
- **Content Editing**: 8 scenarios for text and formatting operations
- **Block Elements**: 10 scenarios for headings, lists, code blocks, and special elements
- **Image Management**: 4 scenarios for content and banner image uploads
- **Tag Management**: 3 scenarios for adding and removing tags
- **Save & Publish**: 7 scenarios for persistence and publishing workflows
- **Undo/Redo**: 3 scenarios for history management
- **Clear Operations**: 2 scenarios for removing formatting
- **Navigation**: 2 scenarios for moving between pages
- **Accessibility**: 4 scenarios for WCAG compliance and keyboard navigation
- **Edge Cases**: 5 scenarios for error handling and boundary conditions

**Total: 63 comprehensive test scenarios**

## Test Execution Notes

1. **Database State**: Each test suite should reset the database to the seeded state using `prisma/seed_blogs.ts`
2. **Authentication**: Login should be extracted into a reusable helper function or test fixture
3. **Cloudinary Mocking**: Image upload tests require mocking the Cloudinary widget's `onSuccess` callback
4. **Parallel Execution**: Tests that modify blog data should run serially to avoid race conditions
5. **Cleanup**: Consider adding cleanup hooks to reset modified blogs after each test
6. **Selectors**: Recommended to add `data-testid` attributes to key elements for stable selectors:
   - Table rows: `data-testid="blog-row-{slug}"`
   - Table cells: `data-testid="blog-{column}-{slug}"`
   - Toolbar buttons: `data-testid="toolbar-{action}"`
   - Editor fields: Already have IDs (`#blog-title`, `#blog-summary`)
