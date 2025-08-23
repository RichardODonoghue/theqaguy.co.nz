'use client';

import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { Button } from '../ui/button';
import { updateBlogBySlug } from '@/lib/blogs';

interface ImageUploaderProps {
  slug: string;
  preset: string;
  label: string;
  action?: string;
  isBlogContent?: boolean;
  callback?: (url: string) => void;
}

export const ImageUploader = ({
  slug,
  preset,
  label,
  isBlogContent = false,
  callback,
}: ImageUploaderProps) => {
  return (
    <CldUploadWidget
      options={{ sources: ['local'], folder: 'theqaguy.co.nz/blog' }}
      uploadPreset={preset}
      signatureEndpoint="/api/sign-upload"
      onSuccess={async (results, { widget }) => {
        const uploadInfo = results.info as CloudinaryUploadWidgetInfo;
        if (!isBlogContent) {
          await updateBlogBySlug(slug, { image: uploadInfo.public_id });
        }
        if (isBlogContent && callback) {
          callback(uploadInfo.public_id);
        }
        widget.close();
      }}
    >
      {({ open }) => {
        return <Button onClick={() => open()}>{label}</Button>;
      }}
    </CldUploadWidget>
  );
};
