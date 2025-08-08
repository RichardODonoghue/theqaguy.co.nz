"use client";

import { useEditor, EditorContent, Content } from "@tiptap/react";
import extensions from "./extensions";
import { Toolbar } from "./toolbar";

interface EditorProps {
  content: Content;
}

export const CustomEditor = ({ content = null }: EditorProps) => {
  const editor = useEditor({
    extensions: extensions,
    content: content ? content : "",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  return (
    <>
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} className="bg-slate-700/50 p-2" />
    </>
  );
};
