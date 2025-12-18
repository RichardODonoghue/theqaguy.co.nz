import { ContentHeader } from '@/components/ui/contentHeader';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { technologies } from '@/constants/technologies';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';
import { Section } from 'lucide-react';

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

const profileDetails = {
  Occupation: 'QA Engineer',
  Location: 'Manawatu, New Zealand',
  Pets: '1 Dog and 2 Cats',
  'Favourite Food': 'Burgers',
  'Favourite Game': 'Final Fantasy VII',
  'Favourite Band': 'Linkin Park',
};

const ProfileCard = () => (
  <Card width="w-full max-w-md" overrides="md:p-4" data-testid="profile-card">
    <Typography variant="3xl/extrabold" className="mb-8 text-center" as="h2">
      Profile
    </Typography>
    <Separator className="mb-4" />
    <div className="w-full mx-auto px-4" data-testid="profile-details">
      {Object.entries(profileDetails).map(([key, value]) => (
        <Typography
          key={key}
          variant="lg/normal"
          className="text-left mx-auto w-full"
        >
          {`${key}: `}
          <Typography variant="lg/normal" className="text-accent" as="span">
            {value}
          </Typography>
        </Typography>
      ))}
    </div>
  </Card>
);

const HobbyCard = () => (
  <Card width="w-full max-w-md" data-testid="hobby-card" overrides="md:p-4">
    <Typography variant="3xl/extrabold" className=" text-center" as="h2">
      Hobbies and Interests
    </Typography>
    <Separator className="" />
    <div className="text-left text-nowrap p-4" data-testid="hobbies-list">
      <Typography
        variant="lg/normal"
        as="ul"
        className="list-inside"
        data-testid="about-me-hobbies"
      >
        <li className=" list-disc">Building software and tools</li>
        <li className=" list-disc">Contributing to FOSS software</li>
        <li className=" list-disc">Attending my local Linux user group</li>
        <li className=" list-disc">Playing and building video games</li>
        <li className=" list-disc">Spending time with my family</li>
      </Typography>
    </div>
  </Card>
);

const Highlights = () => (
  <>
    <Card width="w-full max-w-md" overrides="md:p-4">
      <Typography variant="3xl/extrabold" className="mb-8 text-center" as="h2">
        Craziest Bug
      </Typography>
      <Separator className="mb-4" />
      <div className="text-left p-4">
        <Typography variant="lg/normal" className="block" as="p">
          A misconfiguration in a Drupal database viewer plugin, inadvertently
          left active in a production environment, created a critical security
          vulnerability. Despite middleware attempting to redirect
          unauthenticated users to a login page, the viewer remained fully
          interactive and visible on that page. By manipulating URL parameters,
          I was able to gain full access any table in the database.
        </Typography>
      </div>
    </Card>
    <Card width="w-full max-w-md" overrides="md:p-4">
      <Typography variant="3xl/extrabold" className="mb-8 text-center" as="h2">
        Greatest Achievement
      </Typography>
      <Separator className="mb-4" />
      <div className="text-left p-4">
        <Typography variant="lg/normal" className="block" as="p">
          I developed a fast, robust Playwright testing framework from the
          ground up for a complex suite of web applications with shared
          components. My framework significantly reduced manual testing time,
          improved software quality, and integrated seamlessly with the CI/CD
          pipeline. I also engineered a K8s job for automated environment
          management, ensuring tests ran on every PR to provide rapid feedback
          and accelerate release cycles.
        </Typography>
      </div>
    </Card>
    <Card width="w-full max-w-md" overrides="md:p-4">
      <Typography variant="3xl/extrabold" className="mb-8 text-center" as="h2">
        Greatest Challenge
      </Typography>
      <Separator className="mb-4" />
      <div className="text-left p-4">
        <Typography variant="lg/normal" className="block" as="p">
          Being a solo QA Engineer in a fast-paced startup with a large team of
          developers posed significant challenges. I had to quickly establish
          testing processes, advocate for quality practices, and manage a
          growing backlog of testing tasks. Balancing these responsibilities
          while ensuring timely releases required strong prioritization,
          communication, and adaptability. Learning to compromise between ideal
          quality standards and practical constraints was a key part of my
          growth in this role.
        </Typography>
      </div>
    </Card>
  </>
);

const Technologies = () => (
  <>
    {Object.entries(technologies).map(([category, tech]) => (
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
    ))}
  </>
);

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
