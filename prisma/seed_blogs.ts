import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedBlogs = async () => {
  await prisma.blog.deleteMany({});

  await prisma.blog.createMany({
    data: [
      {
        title: 'A Blog About A Fish',
        slug: 'a-blog-about-a-fish',
        summary: 'Today we explore the adventures of a fish',
        contents:
          '{"type":"doc","content":[{"type":"blogTitle","content":[{"type":"text","text":"Test Blog"}]},{"type":"blogSummary","content":[{"type":"text","text":"A summary for a test blog about testing the editor and static renderer"}]},{"type":"paragraph","content":[{"type":"text","text":"This is a paragraph about testing the tiptap based editor and static renderer. Turns out it was really hard to get this to work properly and it fucking sucks. "}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Below is a codeblock which is hopefully responsive and will not overflow the page. We shall see. "}]},{"type":"paragraph"},{"type":"codeBlock","attrs":{"language":"typescript"},"content":[{"type":"text","text":"export const variable = 0;\n\n// comment\n// asdjfkajsdf;adsjf;asdfjasdjfalsdkf;aklsdfjasdfjlsdkfjasdfladsf;asdjf;lasdjf;adsfjkal;sdfjas;dfjadsl;fjads;fajsldf;asdlfjalsdfja;lsdfjasdl;fj\n\nreturn 1;"}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"wow"}]},{"type":"cloudinaryImage","attrs":{"src":"theqaguy.co.nz/blog/ceqfhmpdz1m5qiplg38r","alt":"description","size":"w-2/3"}},{"type":"paragraph"}]}',
        image: 'theqaguy.co.nz/blog/pthvo9xfwr7zxl6ibthy',
        published: true,
        tags: ['fish', 'ocean', 'adventure'],
      },
      {
        title: 'A Blog About A Place',
        slug: 'a-blog-about-a-place',
        summary: 'Today we explore the a cool place where cool things happen',
        contents:
          '{"type":"doc","content":[{"type":"blogTitle","content":[{"type":"text","text":"This is in fact a blog. With a summary. Isn\'t that interesting? "}]},{"type":"blogSummary","content":[{"type":"text","text":"<Here is a summary>"}]},{"type":"paragraph"},{"type":"blogSummary","content":[{"type":"text","text":"Enter the world of my head. Trust me its a dark place."}]},{"type":"codeBlock","attrs":{"language":"javascript"},"content":[{"type":"text","text":"\nconst javascript = true;"}]},{"type":"paragraph"}]}',
        image: 'theqaguy.co.nz/blog/pthvo9xfwr7zxl6ibthy',
        published: true,
        tags: ['tag', 'tag-2', 'tag-3'],
      },
      {
        title: 'An unpublished blog',
        slug: 'a-blog-about-a-failed-publisher',
        summary: 'Today you will not see this',
        contents: '',
        image: 'theqaguy.co.nz/blog/pthvo9xfwr7zxl6ibthy',
        published: false,
        tags: ['tag', 'tag-2', 'tag-3'],
      },
    ],
  });
};

seedBlogs()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
