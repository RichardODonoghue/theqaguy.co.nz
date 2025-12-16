'use client';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Blog } from '@/lib/blogs';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { truncateString } from '@/lib/truncateString';

interface BlogCardProps {
  blog: Blog;
}

const BlogCardTitle = ({ title }: { title: string }) => {
  const formattedTitle = truncateString(title, 24);

  return (
    <Tooltip disableHoverableContent={!formattedTitle.isTruncated}>
      <TooltipTrigger asChild>
        <div className="min-w-0 w-full">
          <h2 className="block text-left w-full text-lg font-bold sm:text-xl md:text-2xl">
            {formattedTitle.text}
          </h2>
        </div>
      </TooltipTrigger>
      <TooltipContent className="m-0">{title}</TooltipContent>
    </Tooltip>
  );
};

export const BlogCard = ({ blog }: BlogCardProps) => {
  const formattedPublishedAt = blog.publishedAt
    ? blog.publishedAt.toDateString()
    : 'Unpublished';
  const formattedSummary = truncateString(blog.summary, 100);

  return (
    <Card
      width="w-80"
      height="h-90"
      overrides="flex flex-col border-2 border-transparent hover:border-2 hover:border-accent"
      data-testid={`blog-card-${blog.slug}`}
    >
      <Link href={`/qa-blog/${blog.slug}`} className="flex flex-col flex-grow">
        <div className="my-0">
          <CldImage
            src={blog.image || 'theqaguy.co.nz/blog/fallback_wdpalc'}
            width={300}
            height={200}
            alt="Blog Thumbnail"
            crop="fit"
            className="rounded-sm w-full mb-5 mt-0 py-0"
          />
          <BlogCardTitle title={blog.title} />
          <Typography
            id="blog-summary"
            variant="md/normal"
            as="p"
            className="text-left p-0 my-0 h-10"
          >
            {formattedSummary.text}
          </Typography>
        </div>
        <div className="mt-auto">
          <Separator className="my-2" />
          <div className="flex justify-between">
            <Typography id="blog-published-date" variant="sm/normal" as="span">
              Posted {formattedPublishedAt}
            </Typography>
          </div>
        </div>
      </Link>
    </Card>
  );
};
