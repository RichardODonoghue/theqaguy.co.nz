"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { updateBlogBySlug } from "@/lib/blogs";

interface ImageUploaderProps {
  slug: string;
  preset: string;
  label: string;
  action?: string;
}

export const ImageUploader = ({ slug, preset, label }: ImageUploaderProps) => {
  return (
    <CldUploadWidget
      options={{ sources: ["local"], folder: "theqaguy.co.nz/blog" }}
      uploadPreset={preset}
      signatureEndpoint={"/api/sign-upload"}
      onSuccess={async (result, { widget }) => {
        const publicId: string = result.info.public_id;
        await updateBlogBySlug(slug, { image: publicId });
        widget.close();
      }}
    >
      {({ open }) => {
        return <Button onClick={() => open()}>{label}</Button>;
      }}
    </CldUploadWidget>
  );
};
