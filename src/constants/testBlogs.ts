export const testBlogs = [
  {
    title: 'A Test Blog',
    slug: 'a-test-blog',
    summary: 'A blog used for testing purposes',
    contents: JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "Yes this is a blog which is used solely for testing the application's blog static renderer and the blog WYSIWYG editor. ",
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'The editor should be able to add different heading sizes, images, tags and code blocks. ',
            },
          ],
        },
        {
          type: 'heading',
          attrs: {
            level: 3,
          },
          content: [
            {
              type: 'text',
              text: 'this is an h3',
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'cloudinaryImage',
          attrs: {
            src: 'theqaguy.co.nz/blog/qxyrdn9yz0yyll3poeob',
            alt: 'description',
            size: 'w-1/3',
          },
        },
        {
          type: 'paragraph',
        },
        {
          type: 'codeBlock',
          attrs: {
            language: 'typescript',
          },
          content: [
            {
              type: 'text',
              text: "// This is a codeblock \n\nexport default function blog() {\n  console.log('Yep this is a blog');\n}",
            },
          ],
        },
        {
          type: 'paragraph',
        },
      ],
    }),
    image: 'theqaguy.co.nz/blog/pthvo9xfwr7zxl6ibthy',
    published: true,
    publishedAt: new Date('2025-10-03T10:00:00Z'),
    tags: ['testing', 'screaming_internally', 'test'],
    createdAt: new Date('2025-10-01T10:00:00Z'),
    updatedAt: new Date('2025-10-02T10:00:00Z'),
  },
  {
    title: 'A Second test blog',
    slug: 'a-second-test-blog',
    summary: 'This is empty but published',
    contents: JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "Yes this is a blog which is used solely for testing the application's blog static renderer and the blog WYSIWYG editor. ",
            },
          ],
        },
      ],
    }),
    image: 'theqaguy.co.nz/blog/pthvo9xfwr7zxl6ibthy',
    published: true,
    publishedAt: new Date('2025-02-03T10:00:00Z'),
    tags: ['tag', 'tag-2', 'tag-3'],
    createdAt: new Date('2025-02-01T10:00:00Z'),
    updatedAt: new Date('2025-02-02T10:00:00Z'),
  },
  {
    title: 'An unpublished blog',
    slug: 'a-blog-about-a-failed-publisher',
    summary: 'Today you will not see this',
    contents: JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "Yes this is a blog which is used solely for testing the application's blog static renderer and the blog WYSIWYG editor. ",
            },
          ],
        },
      ],
    }),
    image: 'theqaguy.co.nz/blog/pthvo9xfwr7zxl6ibthy',
    published: false,
    tags: ['tag', 'tag-2', 'tag-3'],
    createdAt: new Date('2024-01-01T10:00:00Z'),
    updatedAt: new Date('2024-01-02T10:00:00Z'),
  },
];
