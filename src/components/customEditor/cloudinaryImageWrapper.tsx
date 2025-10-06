'use client';

import { NodeViewWrapper, ReactNodeViewProps } from '@tiptap/react';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useState } from 'react';
import { Button } from '../ui/button';

export const CldImageWrapper = (props: ReactNodeViewProps) => {
  const [imageSize, setImageSize] = useState<'w-1/3' | 'w-2/3' | 'w-full'>(
    'w-2/3'
  );
  // Extract attributes from the node
  const { src, alt, ...rest } = props.node.attrs;

  const handleResize = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small':
        setImageSize('w-1/3');
        break;
      case 'medium':
        setImageSize('w-2/3');
        break;
      case 'large':
        setImageSize('w-full');
        break;
    }
    props.updateAttributes({ size: imageSize });
  };

  console.log(src);

  return (
    <NodeViewWrapper>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <Image
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${src}`}
            width={800}
            height={800}
            alt={alt}
            className={`${imageSize} mx-auto rounded-sm`}
            {...rest}
          />
        </TooltipTrigger>
        <TooltipContent className="flex flex-row gap-2 p-2">
          <Button
            variant="secondary"
            size="sm"
            className="hover:bg-accent hover:cursor-pointer"
            onClick={() => handleResize('small')}
          >
            Small
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="hover:bg-accent hover:cursor-pointer"
            onClick={() => handleResize('medium')}
          >
            Medium
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="hover:bg-accent hover:cursor-pointer"
            onClick={() => handleResize('large')}
          >
            Large
          </Button>
        </TooltipContent>
      </Tooltip>
    </NodeViewWrapper>
  );
};
