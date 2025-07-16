import { Typography } from '@/components/ui/typography';
import { getBlogBySlug } from '@/lib/blogs';
import { ContentHeader } from '@/components/ui/contentHeader';

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
        <Typography variant="lg/normal">{blog.title}</Typography>
      </>
    );
}
