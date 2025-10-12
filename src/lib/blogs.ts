'use server';

import { prisma } from './prisma';

export type Blog = {
  slug: string;
  title: string;
  image?: string;
  summary?: string;
  contents: string;
  published?: boolean;
  tags?: string[];
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

  return newBlog;
};

const updateBlogBySlug = async (slug: string, blog: Partial<Blog>) => {
  const updatedBlog = await prisma.blog.update({
    where: {
      slug: slug,
    },
    data: blog,
  });

  return updatedBlog;
};

const deleteBlogBySlug = async (slug: string) => {
  const deletedBlog = await prisma.blog.delete({
    where: {
      slug: slug,
    },
  });

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
