import { getBlogBySlug } from '@/lib/blogs';
import { ContentHeader } from '@/components/ui/contentHeader';
import { StaticRenderer } from '@/components/customEditor/staticRenderer';

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
        <StaticRenderer content={JSON.parse(blog.contents)} />
      </>
    );
}
