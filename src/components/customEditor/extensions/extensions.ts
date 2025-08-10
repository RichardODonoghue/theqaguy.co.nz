import { Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { BlogTitle } from "./BlogTitle";

const extensions: Extensions = [
  BlogTitle,
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5],
    },
  }),
  Image.configure({
    inline: true,
  }),
];

export default extensions;
