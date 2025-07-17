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
        contents: '<p>contents</p>',
        image: 'fish_ql6yxv',
        published: true,
        tags: ['fish', 'ocean', 'adventure'],
      },
      {
        title: 'A Blog About A Place',
        slug: 'a-blog-about-a-place',
        summary: 'Today we explore the a cool place where cool things happen',
        contents: '<p>contents</p>',
        image: 'YelpCamp/jfwyfpojg9vd8tyv47dn',
        published: true,
        tags: ['tag', 'tag-2', 'tag-3'],
      },
      {
        title: 'An unpublished blog',
        slug: 'a-blog-about-a-failed-publisher',
        summary: 'Today you will not see this',
        contents: '<p>contents</p>',
        image: 'YelpCamp/jfwyfpojg9vd8tyv47dn',
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
