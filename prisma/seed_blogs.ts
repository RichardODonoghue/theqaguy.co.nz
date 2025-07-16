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
        tags: ['fish', 'ocean', 'adventure'],
      },
      {
        title: 'A Blog About A Place',
        slug: 'a-blog-about-a-place',
        summary: 'Today we explore the a cool place where cool things happen',
        contents: '<p>contents</p>',
        image: 'YelpCamp/jfwyfpojg9vd8tyv47dn',
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
