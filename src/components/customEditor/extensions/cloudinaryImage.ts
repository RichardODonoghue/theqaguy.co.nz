'use client';

import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { CldImageWrapper } from '../cloudinaryImageWrapper';

export const CloudinaryImage = Node.create({
  name: 'cloudinaryImage',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      src: {
        default: '',
      },
      alt: {
        default: '',
      },
      width: { default: 400 },
      height: { default: 300 },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'img',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    // In order to render the img with the correct src we need to patch it to include the full url.
    // This is an ugly hack becaue I wasn't able to get the static renderer to properly render react components nested within the content
    // TODO: Fix this shit

    const CLOUDINARY_BASE = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_limit,w_828/f_auto/q_auto/v1/`;

    // Use HTMLAttributes.src directly
    const src = HTMLAttributes.src;
    const patchedSrc =
      src && !src.startsWith('http') ? `${CLOUDINARY_BASE}${src}` : src;

    return [
      'img',
      mergeAttributes(HTMLAttributes, {
        src: patchedSrc,
        class: `my-4`,
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CldImageWrapper);
  },
});
