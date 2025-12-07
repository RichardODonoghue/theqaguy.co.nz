'use client';
import { Separator } from '../ui/separator';
import { Typography } from '../ui/typography';

interface BlogHeaderProps {
  title: string;
  summary: string;
  published?: Date | null;
  lastUpdated?: Date | null;
  enableEditing: boolean;
  onTitleChange?: (newTitle: string) => void;
  onSummaryChange?: (newSummary: string) => void;
}

// TODO: There is a lot more prop drilling than I would like here.
// I need to refactor this to use ContextAPI for Blog data.

export const BlogHeader = ({
  title = '',
  summary = '',
  published = null,
  lastUpdated = null,
  enableEditing = false,
  onTitleChange,
  onSummaryChange,
}: BlogHeaderProps) => {
  if (enableEditing && (!onTitleChange || !onSummaryChange)) {
    throw new Error(
      'onTitleChange and onSummaryChange must be provided when enableEditing is true'
    );
  }

  const classes = enableEditing
    ? 'blog-header-editable p-4 bg-slate-700/50 my-0 mx-auto'
    : 'blog-header p-4 my-0 mx-auto';

  const editableHeader = (
    <>
      <input
        id="blog-title"
        type="text"
        value={title}
        onChange={(e) => onTitleChange?.(e.target.value)}
        className="w-full text-4xl font-bold sm:text-5xl md:text-6xl rounded text-center"
        placeholder="Enter blog title"
      />
      <textarea
        id="blog-summary"
        value={summary}
        onChange={(e) => onSummaryChange?.(e.target.value)}
        className="w-full text-xl font-normal sm:text-2xl md:text-3xl rounded text-center"
        placeholder="Enter blog summary"
      />
    </>
  );

  const readOnlyHeader = (
    <>
      <Typography
        id="blog-title"
        as="h2"
        variant="6xl/bold"
        className="text-center"
      >
        {title}
      </Typography>
      <Typography
        id="blog-summary"
        variant="4xl/normal"
        className="text-center"
      >
        {summary}
      </Typography>
    </>
  );

  return (
    <div className={classes}>
      {enableEditing ? editableHeader : readOnlyHeader}
      <div className="flex flex-wrap w-full items-center justify-center gap-x-4 gap-y-1 py-2 px-2">
        <Typography variant="lg/normal" as="span" className="py-0">
          Published: {new Date(published!).toLocaleDateString()}
        </Typography>
        <Typography variant="lg/normal" as="span" className="py-0">
          Last Updated: {new Date(lastUpdated!).toLocaleDateString()}
        </Typography>
      </div>
      <Separator className="mb-5" />
    </div>
  );
};
