import { PrismaClient } from '@prisma/client';
import { testBlogs } from '../src/constants/testBlogs';

const prisma = new PrismaClient();

export const seedBlogs = async () => {
  await prisma.blog.deleteMany({});

  await prisma.blog.createMany({
    data: testBlogs,
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
