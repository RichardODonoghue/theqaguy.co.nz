'use server';

import { prisma } from './prisma';

type Blog = {
  slug: string;
  title: string;
  contents: string;
  tags: string[];
  likes: number;
};

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

const createBlog = async (blog: Blog) => {
  const newBlog = await prisma.blog.create({
    data: blog,
  });

  return newBlog;
};

const updateBlogBySlug = async (slug: string, blog: Blog) => {
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
  getBlogBySlug,
  createBlog,
  updateBlogBySlug,
  deleteBlogBySlug,
};
