import { PrismaClient } from '@prisma/client';
import { testBlogs } from '@/constants/testBlogs';

export const seedDatabase = async () => {
  const prisma = new PrismaClient({
    datasourceUrl: process.env.TEST_DATABASE_URL,
  });

  try {
    await prisma.$connect();
    await prisma.blog.deleteMany({});
    const result = await prisma.blog.createMany({
      data: testBlogs,
    });

    return result;
  } catch (error) {
    console.error('Error seeding database: ', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
