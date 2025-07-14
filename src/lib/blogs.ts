'use server';

import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { prisma } from './prisma';

const getBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return blogs;
};

const getBlogBySlug = async (slug: string) => {
  const blog = await prisma.blog.findUnique({
    where: {
      slug: slug,
    },
  });

  return blog;
};

const createBlog = async (blog: {
  select?: Prisma.blogSelect<DefaultArgs> | null | undefined;
  omit?: Prisma.blogOmit<DefaultArgs> | null | undefined;
  data: Prisma.XOR<Prisma.blogCreateInput, Prisma.blogUncheckedCreateInput>;
}) => {
  const newBlog = await prisma.blog.create({
    ...blog,
  });

  return newBlog;
};
export { getBlogs, getBlogBySlug, createBlog };
