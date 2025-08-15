'use client';

import { useMemo } from 'react';
import { renderToReactElement } from '@tiptap/static-renderer';
import { JSONContent } from '@tiptap/react';
import extensions from './extensions/extensions';

export const StaticRenderer = ({ content }: { content: JSONContent }) => {
  const output = useMemo(() => {
    return renderToReactElement({
      extensions: extensions,
      content: content,
    });
  }, [content]);

  return <div className="tiptap static-render">{output}</div>;
};
