'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { updateBlogBySlug } from '@/lib/blogs';

export const TagDialog = ({
  blogSlug,
  blogTags,
}: {
  blogSlug: string;
  blogTags: string[];
}) => {
  const [tags, setTags] = useState<string[]>(blogTags || []);

  const onTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTags = event.target.value.split(',').map((tag) => tag.trim());
    setTags(newTags);
  };

  const saveTags = async () => {
    try {
      await updateBlogBySlug(blogSlug, { tags });
      // Optionally show success message
    } catch (error) {
      console.error('Failed to update tags:', error);
      // Show error message to user
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Tags</Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800">
        <DialogTitle className="mx-auto">Add Tags To Blog</DialogTitle>
        <div className="m-0">
          <p className="p-2">
            Add tags using the input field below. Separate tags with commas.
          </p>
          <p className="p-2">Current Tags: {tags.join(', ')}</p>
          <input
            type="text"
            placeholder="Enter tags..."
            className="w-full p-2 border rounded-md"
            value={tags.join(', ')}
            onChange={onTagChange}
          />
          <DialogFooter className="w-full mx-auto my-2">
            <DialogClose asChild>
              <Button type="button" onClick={saveTags}>
                Save Tags
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" onClick={() => {}}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
