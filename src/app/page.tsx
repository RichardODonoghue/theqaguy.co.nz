import { ContentHeader } from '@/components/ui/contentHeader';
import { Typography } from '@/components/ui/typography';
import { Terminal } from '@/components/terminal';

export default function Home() {
  return (
    <>
      <ContentHeader>HelloWorld</ContentHeader>
      <div
        id="hero"
        className="flex flex-col items-center justify-center text-center min-h-[60vh] md:min-h-0 md:block md:p-60"
      >
        <Typography variant="7xl/extrabold" as="h1" className="">
          I&apos;m <span className="text-accent">Richard</span>
        </Typography>
        <Typography variant="5xl/extrabold" as="h2">
          <span className="text-secondary">{'{ '}</span>
          {'QA Engineer'}
          <span className="text-secondary">{' }'}</span>
        </Typography>
      </div>
      <Terminal />
    </>
  );
}
