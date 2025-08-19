// src/components/customEditor/extensions/blogSummary.ts
import { Node, mergeAttributes } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Node as ProseMirrorNode } from 'prosemirror-model';

export const BlogSummary = Node.create({
  name: 'blogSummary',
  group: 'block',
  content: 'inline*',
  defining: true,

  parseHTML() {
    return [
      {
        tag: 'h2',
        getAttrs: (element) => {
          const el = element as HTMLElement;
          return el.id === 'blog-summary' ? {} : false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['h2', mergeAttributes(HTMLAttributes, { id: 'blog-summary' }), 0];
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('enforceBlogSummary'),
        appendTransaction: (transactions, oldState, newState) => {
          if (!transactions.some((tr) => tr.docChanged)) {
            return null;
          }

          let titleInfo: { node: ProseMirrorNode; pos: number } | undefined;

          // Find the blogTitle node and its position.
          newState.doc.descendants((node, pos) => {
            if (node.type.name === 'blogTitle') {
              titleInfo = { node, pos };
              return false; // Stop searching once found.
            }
          });

          // If we found a title, check for the summary.
          if (titleInfo) {
            const { node: titleNode, pos: titlePos } = titleInfo;
            const expectedSummaryPos = titlePos + titleNode.nodeSize;
            const nodeAfterTitle = newState.doc.nodeAt(expectedSummaryPos);

            // If the summary is missing, insert it.
            if (!nodeAfterTitle || nodeAfterTitle.type.name !== this.name) {
              const summaryNode = this.type.create(
                {},
                this.editor.schema.text('<Enter Blog Summary>')
              );
              // Return a new transaction with the change.
              return newState.tr.insert(expectedSummaryPos, summaryNode);
            }
          }

          // No changes needed.
          return null;
        },
      }),
    ];
  },
});
