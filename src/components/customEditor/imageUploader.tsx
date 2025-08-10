'use client';

import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { Button } from '../ui/button';
import { updateBlogBySlug } from '@/lib/blogs';

interface ImageUploaderProps {
  slug: string;
  preset: string;
  label: string;
  action?: string;
}

export const ImageUploader = ({ slug, preset, label }: ImageUploaderProps) => {
  return (
    <CldUploadWidget
      options={{ sources: ['local'], folder: 'theqaguy.co.nz/blog' }}
      uploadPreset={preset}
      signatureEndpoint="/api/sign-upload"
      onSuccess={async (results, { widget }) => {
        const uploadInfo = results.info as CloudinaryUploadWidgetInfo;
        await updateBlogBySlug(slug, { image: uploadInfo.public_id });
        widget.close();
      }}
    >
      {({ open }) => {
        return <Button onClick={() => open()}>{label}</Button>;
      }}
    </CldUploadWidget>
  );
};
