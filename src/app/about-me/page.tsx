import { ContentHeader } from '@/components/ui/contentHeader';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProfileCard } from './profileCard';
import { HobbyCard } from './hobbyCard';
import { Highlights } from './highlights';
import { Technologies } from './technologies';

export async function generateMetadata() {
  return {
    title: 'TheQAGuy | About Me',
    description:
      "Learn about me - Richard O'Donoghue, QA Engineer based in New Zealand.",
    keywords: [
      "Richard O'Donoghue",
      'About',
      'The QA Guy',
      'Quality Assurance',
      'Software Testing',
      'Bio',
      'Professional Profile',
      'Manawatu',
    ],
  };
}

export default function AboutMe() {
  return (
    <>
      <ContentHeader>AboutMe</ContentHeader>
      <ScrollArea className="h-full">
        <div className="w-full mb-20 text-center mx-auto">
          <Typography variant="3xl/normal" as="h2" className="mb-4 mx-auto">
            Hello Internet,{' '}
            <strong className="text-accent">I&apos;m Richard</strong>
          </Typography>
          <section
            id="about-me-bio"
            aria-labelledby="about-me-bio"
            className="flex flex-col items-center justify-center gap-10 my-5 md:flex-row md:items-stretch"
          >
            <ProfileCard />
            <HobbyCard />
          </section>
          <Separator className="my-10" />
          <section
            id="about-me-highlights"
            aria-labelledby="about-me-highlights"
            className="mx-5"
          >
            <Typography variant="3xl/normal" as="h2" className="mb-4 mx-auto">
              Professional Highlights & Achievements
            </Typography>
            <div className="flex flex-col items-center justify-center gap-10 my-5 md:flex-row md:items-stretch">
              <Highlights />
            </div>
          </section>
          <Separator className="my-10" />
          <section
            id="about-me-technologies"
            aria-labelledby="about-me-technologies"
            className="mx-5"
          >
            <div className="">
              <Typography
                variant="3xl/extrabold"
                className="my-8 text-center"
                as="h3"
              >
                Technologies I have professional experience with
              </Typography>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-5">
                <Technologies />
              </div>
            </div>
          </section>
        </div>
      </ScrollArea>
    </>
  );
}
