import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { cloudinaryURL } from '@/constants/constants';
import { getBlogBySlug } from '@/lib/blogs';
import { ContentHeader } from '@/components/ui/contentHeader';
import { BlogHeader } from '@/components/blogHeader/blogHeader';
import { StaticRenderer } from '@/components/customEditor/staticRenderer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

const getCachedBlog = unstable_cache(
  async (slug: string) => getBlogBySlug(slug),
  ['blog-by-slug'],
  { revalidate: 300, tags: ['blog'] }
);

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getCachedBlog(slug);

  if (!blog) {
    notFound();
  }

  const blogImage = blog.image
    ? `${cloudinaryURL}${blog.image}`
    : `${cloudinaryURL}/theqaguy.co.nz/blog/fallback_wdpalc`;

  return {
    title: blog.title || 'The QA Blog',
    description: blog.summary || 'Read this blog post on theqaguy.co.nz.',
    keywords: blog.tags.join(', '),
    openGraph: {
      title: blog.title,
      description: blog.summary || 'Read this blog post on theqaguy.co.nz.',
      type: 'article',
      publishedTime: new Date(blog.createdAt).toISOString(),
      modifiedTime: new Date(blog.updatedAt).toISOString(),
      url: `https://theqaguy.co.nz/qa-blog/${blog.slug}`,
      images: [
        {
          url: blogImage,
          width: 800,
          height: 600,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blog.title} | The QA Blog`,
      description: blog.summary || 'Read this blog post on TheQAGuy.',
      images: [blogImage],
    },
  };
}

export default async function Blog({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getCachedBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <ContentHeader>QA_Blog</ContentHeader>
      <ScrollArea className="h-full md:pr-2.5">
        <BlogHeader
          enableEditing={false}
          title={blog.title}
          summary={blog.summary}
          published={blog.publishedAt}
          lastUpdated={blog.updatedAt}
        />
        <StaticRenderer content={JSON.parse(blog.contents)} />
        <Separator className="mt-4" />
        <div className="flex flex-wrap w-full items-center gap-y-1 py-1 mb-15 px-2">
          {blog.tags.map((tag) => (
            <Typography
              variant="sm/normal"
              as="span"
              key={tag}
              className="mr-1 py-0"
              data-testid="blog-tag"
            >
              #{tag}
            </Typography>
          ))}
          <Typography variant="sm/normal" as="span" className="ml-auto py-0">
            Last Updated: {new Date(blog.updatedAt).toLocaleDateString()}
          </Typography>
        </div>
      </ScrollArea>
    </>
  );
}
