'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Blog } from '@/lib/blogs';
import Link from 'next/link';

export const columns: ColumnDef<Blog>[] = [
  {
    accessorKey: 'slug',
    header: 'Slug',
    cell: ({ row }) => {
      const slug: string = row.getValue('slug');
      return <Link href={`/admin/blog/${slug}`}>{slug}</Link>;
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'summary',
    header: 'Summary',
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
  },
  {
    accessorKey: 'published',
    header: 'Published',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
    cell: ({ row }) => {
      const date: Date = row.getValue('createdAt');

      return date.toISOString();
    },
  },
];
