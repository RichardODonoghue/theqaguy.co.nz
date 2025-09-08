'use client';

import { useEditor, EditorContent, Content } from '@tiptap/react';
import extensions from './extensions/extensions';
import { Toolbar } from './toolbar';
import { ScrollArea } from '../ui/scroll-area';

interface EditorProps {
  content: Content;
}

export const CustomEditor = ({ content = null }: EditorProps) => {
  const editor = useEditor({
    extensions: extensions,
    content: content ? content : '',
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  return (
    <>
      {editor && <Toolbar editor={editor} />}
      <ScrollArea className="h-full">
        <div className="mb-20">
          <EditorContent
            editor={editor}
            className="bg-slate-700/50 px-2 pb-20 flow-root mb-40 rounded-b-lg"
          />
        </div>
      </ScrollArea>
    </>
  );
};
