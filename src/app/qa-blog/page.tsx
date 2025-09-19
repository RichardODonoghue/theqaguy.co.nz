import { ContentHeader } from '@/components/ui/contentHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getPublishedBlogs } from '@/lib/blogs';
import { BlogCard } from './blogCard';
import { Typography } from '@/components/ui/typography';

export default async function BlogsPage() {
  const blogsData = await getPublishedBlogs();

  const blogs = blogsData.map((blog) => (
    <BlogCard key={blog.slug} blog={blog} />
  ));

  const noBlogs = blogs.length === 0 && (
    <Typography variant="4xl/normal" className="text-center w-full my-10">
      Sorry, there&apos;s nothing here yet.
      <br />I haven&apos;t finished writing! <br />
      <br />
      Come back soon!
    </Typography>
  );

  return (
    <>
      <ContentHeader>QA_Blog</ContentHeader>
      <ScrollArea className="h-full">
        <div className="w-full mx-auto text-center p-4">
          <Typography variant="6xl/bold" className="my-4">
            Welcome to the QA_Blog!
          </Typography>
          <Typography
            variant="2xl/normal"
            className="bg-slate-700/30 rounded-lg py-4 w-auto"
          >
            Here I will regularly share my experiences, thoughts, tips and
            tricks related to software testing and quality assurance.
          </Typography>
          {noBlogs}
        </div>
        <div className="grid grid-cols-1 my-5 gap-y-5 lg:grid-cols-3 mb-20">
          {blogs}
        </div>
      </ScrollArea>
    </>
  );
}
