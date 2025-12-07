import { NodeViewContent, NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import React from 'react';

const CodeBlockComponent: React.FC<NodeViewProps> = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}) => {
  return (
    <NodeViewWrapper
      as="pre"
      // Ensure it cannot exceed container width, only scroll horizontally.
      className="relative w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden p-4 md:p-5 rounded-lg font-mono bg-slate-800 text-xs md:text-sm leading-relaxed scrollbar-thin"
      data-code-block
      data-testid="code-block"
    >
      <select
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(event) => updateAttributes({ language: event.target.value })}
        className="absolute top-2 right-2 rounded-md border border-border bg-muted px-2 py-1 text-xs text-muted-foreground"
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {extension.options.lowlight
          .listLanguages()
          .map((lang: string, index: number) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
      </select>
      <NodeViewContent
        className="block min-w-full text-white whitespace-pre break-normal bg-slate-800"
        data-testid="code-block-content"
      />
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;
