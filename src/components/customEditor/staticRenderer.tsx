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

  return (
    <div id="blog" className="tiptap flow-root p-2">
      {output}
    </div>
  );
};
