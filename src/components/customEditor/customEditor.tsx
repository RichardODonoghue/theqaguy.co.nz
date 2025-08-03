'use client';

import {useEditor, EditorContent, Extensions, Content} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Toolbar} from './toolbar'

interface EditorProps {
    content: Content;
}

export const CustomEditor = ({content = null}: EditorProps) => {

    const extensions: Extensions = [StarterKit.configure({
        heading: {
            levels: [1,2,3,4,5],
        }
    })]

    const editor = useEditor({
        extensions: extensions,
        content: content ?  content : '<p>Hello world</p>',
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
    })

    return (<>
        {editor && <Toolbar editor={editor} />}
        <EditorContent editor={editor}/>
    </>)
}