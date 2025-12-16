import { ContentHeader } from '@/components/ui/contentHeader';
import Image from 'next/image';
import { Typography } from '@/components/ui/typography';

export default function NotFound() {
  return (
    <>
      <ContentHeader>
        <span className="text-red-600 underline decoration-wavy decoration-2">
          ERROR
        </span>
      </ContentHeader>
      <div className="text-center">
        <div className="p-8">
          <Typography variant="6xl/extrabold" className="mb-8" as="h2">
            <span className="text-accent font-extrabold">Oops!</span> I think
            you took a wrong turn!
          </Typography>
        </div>
        <Image
          src="/not_found.png"
          alt="Error 404: Page Not Found"
          width={600}
          height={500}
          className="mx-auto my-5 rounded-4xl"
        />
      </div>
    </>
  );
}
