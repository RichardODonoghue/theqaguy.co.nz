import { getBlogBySlug } from '@/lib/blogs';
import { ContentHeader } from '@/components/ui/contentHeader';
import { StaticRenderer } from '@/components/customEditor/staticRenderer';
import { ScrollArea } from '@/components/ui/scroll-area';

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
        <ScrollArea className="h-[calc(100vh-140px)]">
          <StaticRenderer content={JSON.parse(blog.contents)} />
        </ScrollArea>
      </>
    );
}
