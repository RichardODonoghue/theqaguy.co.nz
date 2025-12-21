'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
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
  const formattedTitle = truncateString(title, 48);

  return (
    <Tooltip disableHoverableContent={!formattedTitle.isTruncated}>
      <TooltipTrigger asChild>
        <div className="min-w-0 w-full p-0">
          <h2 className="text-left w-full text-lg font-bold sm:text-xl md:text-2xl">
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

  /*
width="w-80"
      height="h-90"
      overrides="flex flex-col border-2 border-transparent hover:border-2 hover:border-accent"
*/

  return (
    <Card
      className="w-80 sm:w-100 h-60 md:w-full border-2 border-transparent hover:border-2 hover:border-accent p-0"
      data-testid={`blog-card-${blog.slug}`}
    >
      <CldImage
        src={blog.image || 'theqaguy.co.nz/blog/fallback_wdpalc'}
        width={400}
        height={400}
        alt="Blog Thumbnail"
        crop="mfit"
        className="w-full h-full rounded-2xl absolute object-cover object-center z-0"
      />
      <div className="absolute inset-0 bg-gray-800/40 rounded-2xl z-0" />
      <Link
        href={`/qa-blog/${blog.slug}`}
        className=" h-full w-full z-10 border-2 border-transparent hover:border-2 hover:border-accent border-solid rounded-2xl"
      >
        <CardHeader className="h-30 pb-0">
          <BlogCardTitle title={blog.title} />
        </CardHeader>
        <CardContent className="px-2 my-0 h-20 py-0">
          <Typography
            id="blog-summary"
            variant="md/medium"
            as="p"
            className="text-left p-2 my-0"
          >
            {formattedSummary.text}
          </Typography>
        </CardContent>
        <Separator />
        <CardFooter className="p-2">
          <Typography id="blog-published-date" variant="sm/normal" as="span">
            Posted {formattedPublishedAt}
          </Typography>
        </CardFooter>
      </Link>
    </Card>
  );
};
