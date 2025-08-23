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
    // Change the wrapper to render as a <pre> tag
    <NodeViewWrapper as="pre" className="code-block">
      <select
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(event) => updateAttributes({ language: event.target.value })}
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
      {/* The content should be a <code> tag inside the <pre> */}
      <NodeViewContent as="code" />
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;
