import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockComponent from '../codeblock';
import type { ElementContent } from 'hast';

export const CustomCodeBlock = CodeBlockLowlight.extend({
  // This adds the React component for the interactive editor.
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },

  // This provides the logic for the static HTML renderer.
  renderHTML({ node, HTMLAttributes }) {
    const lowlight = this.options.lowlight;
    const language = node.attrs.language || this.options.defaultLanguage;

    const preAttrs = {
      ...HTMLAttributes,
      class: `p-2 overflow-scroll md:p-5 rounded-lg font-mono bg-slate-800 text-xs md:text-sm`,
    };

    // Helper function to convert lowlight's HAST tree to Tiptap's renderHTML format.
    const hastToTiptap = (hastNode: ElementContent): unknown => {
      if (hastNode.type === 'text') {
        return hastNode.value;
      }

      if (hastNode.type === 'element') {
        const attrs = { ...hastNode.properties };
        if (Array.isArray(attrs.className)) {
          attrs.class = attrs.className.join(' ');
          delete attrs.className;
        }

        const children = hastNode.children.map(hastToTiptap);
        return [hastNode.tagName, attrs, ...children];
      }

      // Ignore comments and other node types
      return null;
    };

    // If the language isn't supported, render the code block as plain text.
    if (!language || !lowlight.registered(language)) {
      return ['pre', preAttrs, ['code', {}, node.textContent]];
    }

    // Get the highlighted HAST tree from lowlight.
    const highlighted = lowlight.highlight(language, node.textContent);
    // Convert the HAST tree to Tiptap's renderable array format.
    const codeContent = highlighted.children.map(hastToTiptap);

    // Merge the class from HTMLAttributes with the language class.
    const codeAttrs = {
      class: `language-${language} text-white p-2`,
    };

    // Return the final structure for Tiptap to render.
    return ['pre', preAttrs, ['code', codeAttrs, ...codeContent]];
  },
});
