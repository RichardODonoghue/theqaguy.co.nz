import { Container } from '@/components/ui/container';
import { ContentHeader } from '@/components/ui/contentHeader';
import { Typography } from '@/components/ui/typography';
import { Terminal } from '@/components/terminal';

export default function Home() {
  return (
    <Container>
      <ContentHeader>HelloWorld</ContentHeader>
      <div id="hero" className="text-center p-60">
        <Typography variant="hero" className="">
          I&apos;m <span className="text-accent">Richard</span>
        </Typography>
      </div>
      <Terminal />
    </Container>
  );
}
