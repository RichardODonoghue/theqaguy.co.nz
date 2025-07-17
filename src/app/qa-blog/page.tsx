import { ContentHeader } from '@/components/ui/contentHeader';
import { getPublishedBlogs } from '@/lib/blogs';
import { BlogCard } from './blogCard';

export default async function BlogsPage() {
  const blogsData = await getPublishedBlogs();

  const blogs = blogsData.map((blog) => (
    <BlogCard key={blog.slug} blog={blog} />
  ));

  return (
    <>
      <ContentHeader>QA_Blog</ContentHeader>
      <div className="grid grid-cols-1 my-5 gap-y-5 lg:grid-cols-3">
        {blogs}
      </div>
    </>
  );
}
