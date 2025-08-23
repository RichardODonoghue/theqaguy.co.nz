import { Extensions } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { all, createLowlight } from 'lowlight';
import { BlogTitle } from './blogTitle';
import { CloudinaryImage } from './cloudinaryImage';
import { BlogSummary } from './blogSummary';
import { CustomCodeBlock } from './customCodeBlock';

const lowlight = createLowlight(all);

const extensions: Extensions = [
  BlogTitle,
  BlogSummary,
  StarterKit.configure({
    heading: { levels: [1, 2, 3, 4, 5] },
    codeBlock: false,
  }),
  Image.configure({ inline: true }),
  CloudinaryImage,
  // Configure and extend in one place.
  CustomCodeBlock.configure({
    // Pass the lowlight instance so `renderHTML` can use it
    lowlight,
    // Apply the class for styling
    HTMLAttributes: {
      class: 'code-block',
    },
  }),
];

export default extensions;
