'use client';

import { mergeAttributes } from '@tiptap/core';
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
} from '@tiptap/extension-table';
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from '@tiptap/react';

const TableNode = () => {
  return (
    <NodeViewWrapper className="my-4 flex justify-center w-full">
      <div className="rounded-md border w-full max-w-full">
        <div className="relative w-full">
          <table className="w-full caption-bottom text-sm table-fixed">
            <NodeViewContent
              // @ts-ignore needs to be specified for DOM semantics
              as="tbody"
              className="[&_tr:last-child]:border-0 text-center"
            />
          </table>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

const CustomTable = Table.extend({
  addNodeView() {
    return ReactNodeViewRenderer(TableNode);
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        'data-slot': 'table-wrapper',
        class: 'my-4 flex justify-center w-full',
      },
      [
        'div',
        {
          class: 'rounded-md border w-full max-w-full',
        },
        [
          'div',
          {
            'data-slot': 'table-container',
            class: 'relative w-full',
          },
          [
            'table',
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              'data-slot': 'table',
              class: 'w-full caption-bottom text-sm table-fixed',
            }),
            [
              'tbody',
              {
                'data-slot': 'table-body',
                class: '[&_tr:last-child]:border-0 text-center w-full',
              },
              0,
            ],
          ],
        ],
      ],
    ];
  },
});

const CustomTableRow = TableRow.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      'tr',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-slot': 'table-row',
        class:
          'border-b transition-colors hover:bg-secondary/50 data-[state=selected]:bg-muted text-center w-full',
      }),
      0,
    ];
  },
});

const CustomTableHeader = TableHeader.extend({
  renderHTML({ HTMLAttributes }) {
    const attrs: Record<string, any> = { ...HTMLAttributes };
    if (attrs.colspan !== undefined) {
      attrs.colSpan = attrs.colspan;
      delete attrs.colspan;
    }
    if (attrs.rowspan !== undefined) {
      attrs.rowSpan = attrs.rowspan;
      delete attrs.rowspan;
    }

    return [
      'th',
      mergeAttributes(this.options.HTMLAttributes, attrs, {
        'data-slot': 'table-head',
        class:
          'text-base text-center text-foreground px-2 align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] bg-slate-700 first:rounded-tl-md last:rounded-tr-md break-words',
      }),
      0,
    ];
  },
});

const CustomTableCell = TableCell.extend({
  renderHTML({ HTMLAttributes }) {
    const attrs: Record<string, any> = { ...HTMLAttributes };
    if (attrs.colspan !== undefined) {
      attrs.colSpan = attrs.colspan;
      delete attrs.colspan;
    }
    if (attrs.rowspan !== undefined) {
      attrs.rowSpan = attrs.rowspan;
      delete attrs.rowspan;
    }

    return [
      'td',
      mergeAttributes(this.options.HTMLAttributes, attrs, {
        'data-slot': 'table-cell',
        class:
          'text-base px-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center',
      }),
      0,
    ];
  },
});

export const CustomTableExtensions = [
  CustomTable.configure({ resizable: false }),
  CustomTableRow,
  CustomTableCell,
  CustomTableHeader,
];
