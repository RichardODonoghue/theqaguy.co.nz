import { ContentHeader } from '@/components/ui/contentHeader';
import {CustomEditor} from "@/components/customEditor/customEditor";

export default function NewBlog() {
  return (
    <>
      <ContentHeader>New_Blog</ContentHeader>
      <CustomEditor content={null}/>
    </>
  );
}
