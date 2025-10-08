import { getBlogBySlug } from '@/lib/blogs';
import { ContentHeader } from '@/components/ui/contentHeader';
import { StaticRenderer } from '@/components/customEditor/staticRenderer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function Blog({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (blog)
    return (
      <>
        <ContentHeader>QA_Blog</ContentHeader>
        <ScrollArea className="h-full md:pr-2.5">
          <StaticRenderer content={JSON.parse(blog.contents)} />
          <Separator className="mt-4" />
          <div className="flex flex-wrap w-full items-center gap-y-1 py-1 mb-15 px-2">
            {blog.tags.map((tag) => (
              <Typography
                variant="sm/normal"
                as="span"
                key={tag}
                className="mr-1 py-0"
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
