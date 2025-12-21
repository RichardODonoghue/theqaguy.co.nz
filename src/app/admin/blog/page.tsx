import { getBlogs } from '@/lib/blogs';
import { DataTable } from '@/components/dataTable';
import { ContentHeader } from '@/components/ui/contentHeader';
import { columns } from '@/components/blogTable/columns';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <>
      <ContentHeader>Admin_Blogs</ContentHeader>
      <Card className="w-full h-auto mx-auto">
        <CardAction className="flex my-5 ml-6">
          <Button className="flex" asChild>
            <Link href="/admin/blog/new">New Blog</Link>
          </Button>
        </CardAction>
        <CardContent>
          <DataTable columns={columns} data={blogs} testId="blog-table" />
        </CardContent>
      </Card>
    </>
  );
}
