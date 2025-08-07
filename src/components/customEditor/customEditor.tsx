'use client';

import { useEditor, EditorContent, Extensions, Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Document from '@tiptap/extension-document'
import { BlogTitle } from './BlogTitle'

import { Toolbar } from './toolbar'

interface EditorProps {
    content: Content;
}

export const CustomEditor = ({ content = null }: EditorProps) => {

    const extensions: Extensions = [BlogTitle, StarterKit.configure({
        heading: {
            levels: [1, 2, 3, 4, 5],
        }
    }), Image.configure({
        inline: true
    }), Document]

    const editor = useEditor({
        extensions: extensions,
        content: content ? content : '',
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
    })

    return (<>
        {editor && <Toolbar editor={editor} />}
        <EditorContent editor={editor} className='bg-slate-700/50 p-2' />
    </>)
}