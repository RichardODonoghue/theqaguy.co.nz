'use client';
import { useCallback } from 'react';
import { Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';
import { Button } from '../ui/button';
import { createBlog, updateBlogBySlug } from '@/lib/blogs';
import { redirect, useParams } from 'next/navigation';
import { EditorDropdown } from './dropdown';
import { ImageUploader } from './imageUploader';

export const Toolbar = ({ editor }: { editor: Editor }) => {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  const { slug } = useParams<{ slug: string }>();
  const isNewBlog = !slug;

  const buildBlogObject = () => {
    // While it may not be the "react way", this is the easiest way I found to grab the title from the editor.
    const title = document.getElementById('blog-title')?.innerText;

    if (!title || title.length === 0) throw new Error('No blog title');

    const newSlug = title.trim().replaceAll(/\s+/g, '_').toLowerCase();
    const content = JSON.stringify(editor.getJSON());
    return {
      contents: content,
      title: title,
      slug: newSlug,
      tags: [],
      image: '',
    };
  };

  const addImage = useCallback(
    async (url: string) => {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'cloudinaryImage',
          attrs: {
            src: url,
            alt: 'description',
          },
        })
        .run();
      console.log('url: ', url);
      console.log(editor.getJSON());
    },
    [editor]
  );

  if (!editor) {
    return null;
  }

  const handleSave = async () => {
    const blog = buildBlogObject();

    if (isNewBlog) {
      await createBlog(blog);
      redirect(`/admin/blog/${blog.slug}`);
    } else {
      await updateBlogBySlug(slug, blog);
    }
  };

  return (
    <div className="control-group bg-slate-700/50 rounded-t-2xl">
      <div className="button-group p-2 min-w-full mx-auto flex gap-2 flex-wrap justify-baseline">
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? 'is-active' : ''}
        >
          Bold
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? 'is-active' : ''}
        >
          Italic
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? 'is-active' : ''}
        >
          Strike
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? 'is-active' : ''}
        >
          Code
        </Button>
        <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </Button>
        <Button onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </Button>
        <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? 'is-active' : ''}
        >
          Paragraph
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={editorState.isHeading1 ? 'is-active' : ''}
        >
          H1
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={editorState.isHeading2 ? 'is-active' : ''}
        >
          H2
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={editorState.isHeading3 ? 'is-active' : ''}
        >
          H3
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={editorState.isHeading4 ? 'is-active' : ''}
        >
          H4
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={editorState.isHeading5 ? 'is-active' : ''}
        >
          H5
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? 'is-active' : ''}
        >
          Bullet list
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? 'is-active' : ''}
        >
          Ordered list
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editorState.isCodeBlock ? 'is-active' : ''}
        >
          Code block
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? 'is-active' : ''}
        >
          Blockquote
        </Button>
        <Button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </Button>
        <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </Button>
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          Undo
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        >
          Redo
        </Button>
        <ImageUploader
          slug={slug}
          preset="qa-blogs"
          label="Upload Image"
          isBlogContent={true}
          callback={addImage}
        />
        <ImageUploader slug={slug} preset="qa-blogs" label="Upload Banner" />
        <Button onClick={handleSave}>Save</Button>
        <EditorDropdown
          label="test"
          options={['test', 'test1']}
          onClick={() => console.log('selected')}
          disabled={false}
          defaultValue=""
        />
      </div>
    </div>
  );
};
