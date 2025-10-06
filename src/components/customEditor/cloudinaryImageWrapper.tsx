'use client';

import { NodeViewWrapper, ReactNodeViewProps } from '@tiptap/react';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';

export const CldImageWrapper = (props: ReactNodeViewProps) => {
  // Extract attributes from the node
  const { updateAttributes } = props;
  const { src, alt, size, ...rest } = props.node.attrs;

  return (
    <NodeViewWrapper>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <Image
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${src}`}
            width={800}
            height={800}
            alt={alt}
            className={`${size} mx-auto rounded-sm`}
            {...rest}
          />
        </TooltipTrigger>
        <TooltipContent className="flex flex-row gap-2 p-2">
          <Button
            variant="secondary"
            size="sm"
            className="hover:bg-accent hover:cursor-pointer"
            onClick={() => updateAttributes({ size: 'w-1/3' })}
          >
            Small
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="hover:bg-accent hover:cursor-pointer"
            onClick={() => updateAttributes({ size: 'w-2/3' })}
          >
            Medium
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="hover:bg-accent hover:cursor-pointer"
            onClick={() => updateAttributes({ size: 'w-full' })}
          >
            Large
          </Button>
        </TooltipContent>
      </Tooltip>
    </NodeViewWrapper>
  );
};
