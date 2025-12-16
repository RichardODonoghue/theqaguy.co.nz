'use server';

import { prisma } from './prisma';
import { revalidateTag } from 'next/cache';

export type Blog = {
  slug: string;
  title: string;
  image?: string;
  summary: string;
  contents: string;
  published: boolean;
  publishedAt?: Date | null;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

// TODO add error handler

const getBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return blogs;
};

const getPublishedBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    where: {
      published: true,
    },
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

const createBlog = async (blog: Blog) => {
  const newBlog = await prisma.blog.create({
    data: blog,
  });

  revalidateTag('blog', 'max');
  return newBlog;
};

const updateBlogBySlug = async (slug: string, blog: Partial<Blog>) => {
  const updatedBlog = await prisma.blog.update({
    where: {
      slug: slug,
    },
    data: { ...blog, updatedAt: new Date() },
  });

  revalidateTag('blog', 'max');
  return updatedBlog;
};

const deleteBlogBySlug = async (slug: string) => {
  const deletedBlog = await prisma.blog.delete({
    where: {
      slug: slug,
    },
  });

  revalidateTag('blog', 'max');
  return deletedBlog;
};

export {
  getBlogs,
  getPublishedBlogs,
  getBlogBySlug,
  createBlog,
  updateBlogBySlug,
  deleteBlogBySlug,
};
