import { ContentHeader } from "@/components/ui/contentHeader";
import { CustomEditor } from "@/components/customEditor/customEditor";
import { getBlogBySlug } from "@/lib/blogs";

export default async function EditBlog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  return (
    <>
      <ContentHeader>Edit_Blog</ContentHeader>
      {blog && <CustomEditor content={JSON.parse(blog.contents)} />}
    </>
  );
}
