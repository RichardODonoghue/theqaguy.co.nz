import { ContentHeader } from '@/components/ui/contentHeader';
import { CustomEditor } from '@/components/customEditor/customEditor';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TheQAGuy | Blog Editor',
};

export default function NewBlog() {
  return (
    <>
      <ContentHeader>New_Blog</ContentHeader>
      <CustomEditor blog={null} />
    </>
  );
}
