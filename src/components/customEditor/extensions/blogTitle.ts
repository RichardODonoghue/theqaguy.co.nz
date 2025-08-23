import { Node, mergeAttributes } from '@tiptap/core';
import { Node as ProseMirrorNode } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';

type BlogTitleStorage = {
  hasCheckedInitialBlogTitle: boolean;
};

export const BlogTitle = Node.create<{
  Storage: BlogTitleStorage;
}>({
  name: 'blogTitle',
  group: 'block',
  content: 'inline*',
  defining: true,

  parseHTML() {
    return [
      {
        tag: 'h1',
        getAttrs: (element) => {
          const el = element as HTMLElement;
          return el.id === 'blog-title' ? {} : false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['h1', mergeAttributes(HTMLAttributes, { id: 'blog-title' }), 0];
  },

  addStorage() {
    return {
      hasCheckedInitialBlogTitle: false,
    };
  },

  onUpdate() {
    const { editor } = this;
    const { state, view } = editor;
    if (this.storage.hasCheckedInitialBlogTitle) return;

    const firstNode = state.doc.content.firstChild;

    if (!firstNode || firstNode.type.name !== 'blogTitle') {
      const blogTitleNode = this.type.create(
        {},
        editor.schema.text('<Your Blog Title>')
      );
      const tr = state.tr.insert(0, blogTitleNode);
      view.dispatch(tr);
    }

    this.storage.hasCheckedInitialBlogTitle = true;
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('blogTitleEnforcer'),

        appendTransaction: (_transactions, _oldState, newState) => {
          const tr = newState.tr;
          let modified = false;
          const doc = newState.doc;

          const blogTitles: { node: ProseMirrorNode; pos: number }[] = [];

          doc.descendants((node, pos) => {
            if (node.type.name === 'blogTitle') {
              blogTitles.push({ node, pos });
            }
          });

          // Remove any extra blog titles
          if (blogTitles.length > 1) {
            for (let i = blogTitles.length - 1; i >= 1; i--) {
              tr.delete(
                blogTitles[i].pos,
                blogTitles[i].pos + blogTitles[i].node.nodeSize
              );
              modified = true;
            }
          }

          // Move to top if not first
          if (
            blogTitles.length &&
            doc.content.firstChild?.type.name !== 'blogTitle'
          ) {
            const { node, pos } = blogTitles[0];
            tr.delete(pos, pos + node.nodeSize);
            tr.insert(0, node);
            modified = true;
          }

          return modified ? tr : null;
        },

        props: {
          handleKeyDown(view, event) {
            const { state } = view;
            const { selection } = state;

            const $from = selection.$from;

            const inBlogTitle = $from.parent.type.name === 'blogTitle';
            const atNodeStart = $from.parentOffset === 0;

            const tryingToDeleteBlogTitleNode =
              inBlogTitle &&
              atNodeStart &&
              (event.key === 'Backspace' || event.key === 'Delete');

            if (tryingToDeleteBlogTitleNode) {
              event.preventDefault();
              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});
