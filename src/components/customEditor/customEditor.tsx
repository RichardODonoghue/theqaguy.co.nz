'use client';
import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import extensions from './extensions/extensions';
import { Toolbar } from './toolbar';
import { ScrollArea } from '../ui/scroll-area';
import { Blog } from '@/lib/blogs';
import { BlogHeader } from '../blogHeader/blogHeader';

interface EditorProps {
  blog: Blog | null;
}

export const CustomEditor = ({ blog = null }: EditorProps) => {
  const editor = useEditor({
    extensions: extensions,
    content: blog ? JSON.parse(blog.contents) : '',
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  const [title, setTitle] = useState(blog?.title || '');
  const [summary, setSummary] = useState(blog?.summary || '');

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    blog!.title = newTitle;
  };

  const handleSummaryChange = (newSummary: string) => {
    setSummary(newSummary);
    blog!.summary = newSummary;
  };

  return (
    <>
      {editor && (
        <Toolbar
          title={title}
          summary={summary}
          editor={editor}
          isPublished={blog?.published || false}
          tags={blog?.tags || []}
        />
      )}
      <ScrollArea className="h-full">
        <BlogHeader
          enableEditing={true}
          title={title}
          summary={summary}
          onTitleChange={handleTitleChange}
          onSummaryChange={handleSummaryChange}
        />
        <div className="mb-20" data-testid="custom-editor">
          <EditorContent
            editor={editor}
            className="bg-slate-700/50 px-2 pb-20 flow-root mb-40 rounded-b-lg"
            data-testid="editor"
          />
        </div>
      </ScrollArea>
    </>
  );
};
