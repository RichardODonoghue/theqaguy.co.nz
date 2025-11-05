import { getBlogs } from '@/lib/blogs';
import { DataTable } from '@/components/dataTable';
import { ContentHeader } from '@/components/ui/contentHeader';
import { columns } from '@/components/blogTable/columns';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <>
      <ContentHeader>Admin_Blogs</ContentHeader>
      <Card width="w-full" height="h-auto" overrides="mx-auto">
        <div className="flex my-5">
          <Button className="flex" asChild>
            <Link href="/admin/blog/new">New Blog</Link>
          </Button>
        </div>
        <DataTable columns={columns} data={blogs} testId="blog-table" />
      </Card>
    </>
  );
}
