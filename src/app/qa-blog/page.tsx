import { ContentHeader } from '@/components/ui/contentHeader';
import { unstable_cache } from 'next/cache';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getPublishedBlogs } from '@/lib/blogs';
import { BlogCard } from './blogCard';
import { Typography } from '@/components/ui/typography';

export async function generateMetadata() {
  return {
    title: 'The QA Blog | The QA Guy',
    description:
      'Shared experiences, tips and insights on software testing and quality assurance.',
    keywords: [
      'QA Blog',
      'Software Testing',
      'Quality Assurance',
      'Test Automation',
      'Testing Tips',
      'QA Insights',
      'Software Quality',
      'Testing Strategies',
      'Bug Reporting',
      'Test Management',
      'Agile Testing',
      'Performance Testing',
      'Security Testing',
      'Manual Testing',
      'Continuous Integration',
      'DevOps',
      'Test Frameworks',
      'QA Best Practices',
      'Software Development',
      'Quality Engineering',
      'Test Automation Tools',
    ],
    openGraph: {
      title: 'The QA Blog | The QA Guy',
      description:
        'Shared experiences, tips and insights on software testing and quality assurance.',
      url: '/qa-blog',
      images: [
        {
          url: '/theqaguy.png',
          width: 1200,
          height: 630,
          alt: 'The QA Blog | The QA Guy',
        },
      ],
    },
  };
}

const fetchPublishedBlogs = unstable_cache(
  async () => getPublishedBlogs(),
  ['published-blogs'],
  { revalidate: 300, tags: ['blog'] }
);

export default async function BlogsPage() {
  const blogsData = await fetchPublishedBlogs();

  // Because of how Next.js unstable_cache works, the dates are mutated into strings,
  // so we need to convert them back to date objects
  const formattedBlogs = blogsData.map((blog) => ({
    ...blog,
    createdAt: blog.createdAt ? new Date(blog.createdAt) : undefined,
    updatedAt: blog.updatedAt ? new Date(blog.updatedAt) : undefined,
    publishedAt: blog.publishedAt ? new Date(blog.publishedAt) : undefined,
  }));

  const blogs = formattedBlogs.map((blog) => (
    <BlogCard key={blog.slug} blog={blog} />
  ));

  const noBlogs = blogs.length === 0 && (
    <Typography variant="3xl/normal" className="text-center w-full my-10">
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
          <Typography variant="5xl/bold" className="my-4">
            Welcome to the QA_Blog!
          </Typography>
          <Typography
            variant="lg/normal"
            className="bg-slate-700/30 rounded-lg py-4 px-2 w-2/3 mx-auto"
          >
            Here I will regularly share my experiences, thoughts, tips and
            tricks related to software testing and quality assurance.
          </Typography>
          {noBlogs}
        </div>
        <div className="grid grid-cols-1 mx-auto my-5 gap-y-5 lg:grid-cols-4 mb-20 justify-items-center">
          {blogs}
        </div>
      </ScrollArea>
    </>
  );
}
