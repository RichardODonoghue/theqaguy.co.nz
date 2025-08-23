'use client';

import { NodeViewWrapper, ReactNodeViewProps } from '@tiptap/react';
import { CldImage } from 'next-cloudinary';
import React from 'react';

export const CldImageWrapper = (props: ReactNodeViewProps) => {
  // Extract attributes from the node
  const { src, alt, width, height, float, ...rest } = props.node.attrs;

  const floatClass = float === 'right' ? 'float-right ml-4' : 'float-left mr-4';

  return (
    <NodeViewWrapper className={`react-component ${floatClass}`}>
      <CldImage src={src} alt={alt} width={width} height={height} {...rest} />
    </NodeViewWrapper>
  );
};
