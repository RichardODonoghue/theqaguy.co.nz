'use client';

import { NodeViewWrapper, ReactNodeViewProps } from '@tiptap/react';
import { CldImage } from 'next-cloudinary';
import React from 'react';

export const CldImageWrapper = (props: ReactNodeViewProps) => {
  // Extract attributes from the node
  const { src, alt, width, height, ...rest } = props.node.attrs;

  return (
    <NodeViewWrapper className="react-component">
      <CldImage src={src} alt={alt} width={width} height={height} {...rest} />
    </NodeViewWrapper>
  );
};
