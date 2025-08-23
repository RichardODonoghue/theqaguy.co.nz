import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockComponent from '../codeblock';

export const CustomCodeBlock = CodeBlockLowlight.extend({
  // This adds the React component for the interactive editor.
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },

  // This provides the logic for the static HTML renderer.
  renderHTML({ node, HTMLAttributes }) {
    const lowlight = this.options.lowlight;
    const language = node.attrs.language || this.options.defaultLanguage;

    // Helper function to convert lowlight's HAST tree to Tiptap's renderHTML format.
    const hastToTiptap = (hastNode) => {
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

      return null;
    };

    // If the language isn't supported, render the code block as plain text.
    if (!language || !lowlight.registered(language)) {
      return ['pre', HTMLAttributes, ['code', {}, node.textContent]];
    }

    // Get the highlighted HAST tree from lowlight.
    const highlighted = lowlight.highlight(language, node.textContent);
    // Convert the HAST tree to Tiptap's renderable array format.
    const codeContent = highlighted.children.map(hastToTiptap);

    // Merge the class from HTMLAttributes with the language class.
    const codeAttrs = {
      class: `language-${language}`,
    };

    // Return the final structure for Tiptap to render.
    return ['pre', HTMLAttributes, ['code', codeAttrs, ...codeContent]];
  },
});
