import { Extensions } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { BlogTitle } from './blogTitle';
import { CloudinaryImage } from './cloudinaryImage';
import { BlogSummary } from './blogSummary';

const extensions: Extensions = [
  BlogTitle,
  BlogSummary,
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5],
    },
  }),
  Image.configure({
    inline: true,
  }),
  CloudinaryImage,
];

export default extensions;
