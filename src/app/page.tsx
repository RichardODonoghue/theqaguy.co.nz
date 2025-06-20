import { Typography } from '@/components/ui/typography';
import { Container } from '@/components/ui/container';

export default function Home() {
  return (
    <Container>
      <div className="text-right">
        <Typography variant="super" className="mr-16 text-gradient">
          <span className="text-accent">{'<'}</span> Hello World!
        </Typography>
        <Typography variant="super">
          I&apos;m Richard <span className="text-accent">{'/>'}</span>
        </Typography>
        <Typography variant="h1">
          <span className="text-secondary">{'{{'}</span>{' '}
          Quality_Assurance_Engineer{' '}
          <span className="text-secondary">{'}}'}</span>
        </Typography>
      </div>
    </Container>
  );
}
