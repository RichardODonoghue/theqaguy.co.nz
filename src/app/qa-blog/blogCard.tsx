'use client';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';
import { Blog } from '@/lib/blogs';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  const formattedDate = blog.createdAt?.toDateString();

  return (
    <Card
      width="w-80"
      height="h-80"
      overrides="mx-5 flex flex-col border-2 border-transparent hover:border-2 hover:border-accent"
    >
      <Link href={`/qa-blog/${blog.slug}`} className="flex flex-col flex-grow">
        <div>
          <CldImage
            src={blog.image || 'theqaguy.co.nz/blog/fallback_wdpalc'}
            width={300}
            height={200}
            alt="Blog Thumbnail"
            crop="fit"
            className="rounded-sm w-full mb-5"
          />
          <Typography variant="2xl/bold" as="h2" className="text-left">
            {blog.title}
          </Typography>
          <Typography variant="md/normal" as="p" className="text-left p-0">
            {blog.summary}
          </Typography>
        </div>
        <div className="mt-auto">
          <div className="py-2">
            {blog.tags &&
              blog.tags.map((tag, index) => {
                return (
                  <div
                    key={index}
                    className="inline-block mx-1 my-2 bg-accent rounded-2xl shadow-2xl shadow-slate-700 px-2 py-0"
                  >
                    <Typography
                      variant="sm/normal"
                      as="div"
                      className="text-slate-700 px-2"
                    >
                      {tag}
                    </Typography>
                  </div>
                );
              })}
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between">
            <Typography variant="sm/normal" as="span" className="">
              Posted {formattedDate}
            </Typography>
          </div>
        </div>
      </Link>
    </Card>
  );
};
