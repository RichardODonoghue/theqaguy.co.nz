import { ContentHeader } from '@/components/ui/contentHeader';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { aboutMeBlurb } from '@/constants/aboutMeBlurb';
import { technologies } from '@/constants/technologies';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
  const bioContent = (
    <div className="w-full md:w-2/3 text-center mx-auto">
      <Typography variant="xl/normal" as="h3" className="mb-0">
        Hello Internet,{' '}
        <strong className="text-accent">I&apos;m Richard</strong>
      </Typography>
      <Typography
        variant="lg/normal"
        as="p"
        className="whitespace-pre-line mt-0 mb-4"
        data-testid="about-me-blurb"
      >
        {aboutMeBlurb}
      </Typography>
      <Typography variant="lg/normal" as="p">
        Outside of work I enjoy:
      </Typography>
      <Typography
        variant="lg/normal"
        as="ul"
        className="list-inside"
        data-testid="about-me-hobbies"
      >
        <li className="ml-4">Building software and tools</li>
        <li className="ml-4">Contributing to testing of FOSS software</li>
        <li className="ml-4">Attending my local linux user group</li>
        <li className="ml-4">Playing video games</li>
        <li className="ml-4">Spending time with my family</li>
      </Typography>
    </div>
  );

  const technologyExperience = Object.entries(technologies).map(
    ([category, tech]) => (
      <div key={category}>
        <Typography
          variant="xl/normal"
          as="h2"
          className="text-nowrap mb-5 text-center"
        >
          {category}
        </Typography>
        <div className="grid grid-cols-3 gap-x-1 md:gap-x-0 gap-y-2 w-48 mx-auto my-5">
          {tech.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center justify-center text-center"
              data-testid={`tech-${item.name
                .toLowerCase()
                .replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center justify-center h-16 w-16">
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src={`/technologies/${item.logo}`}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </TooltipTrigger>
                  <TooltipContent>{item.name}</TooltipContent>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );

  return (
    <>
      <ContentHeader>AboutMe</ContentHeader>
      <ScrollArea className="h-full">
        <div className="pr-4 mb-20">
          <section
            id="about-me-bio"
            aria-labelledby="about-me-bio"
            className="mx-5"
          >
            <Typography
              variant="3xl/extrabold"
              className="my-2 text-center"
              as="h2"
            >
              Bio
            </Typography>
            {bioContent}
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
                Technologies I have experience with
              </Typography>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-5">
                {technologyExperience}
              </div>
            </div>
          </section>
        </div>
      </ScrollArea>
    </>
  );
}
