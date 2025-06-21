import { Container } from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';

export default function AboutMe() {
  return (
    <Container>
      <div className="text-right">
        <Typography variant="super" className="mr-16">
          <span className="text-accent">{'<'}</span>AboutMe
          <span className="text-accent">{'>'}</span>
        </Typography>
      </div>
      <section>
        <Typography variant="h1">Bio</Typography>
        <Typography variant="p">
          Hello Internet, I am Richard. I am a QA Engineer living in Manawatu,
          New Zealand
        </Typography>
      </section>
      <Separator />
      <section>
        <Typography variant="h1">Technical Skills</Typography>
        <div></div>
      </section>
    </Container>
  );
}
