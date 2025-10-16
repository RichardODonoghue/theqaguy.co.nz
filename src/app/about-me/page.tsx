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

export default function AboutMe() {
  const bioContent = (
    <div className="w-full md:w-2/3">
      <Typography variant="xl/normal" as="h3" className="mb-0">
        Hello Internet,{' '}
        <strong className="text-accent">I&apos;m Richard</strong>
      </Typography>
      <Typography
        variant="lg/normal"
        as="p"
        className="whitespace-pre-line mt-0 mb-4"
      >
        {`
        I am an experienced QA Engineer living in the beautiful Manawatu region of New Zealand with my wife, son, two cats, and dog.

        Most of my QA career has been in testing web applications; however, I also have experience testing hardware from previous roles and hobbies. When time allows, I contribute to testing my favourite Linux distribution (Fedora), video games, and mobile applications.

        I am a firm believer that software quality is not just a phase in the software development lifecycle or an automated test suite, but a value that should be integrated into every aspect of a business delivering software.

        We are living in a world where software is more complex than ever. We are delivering software faster than ever, and AI is changing the way we build software. These challenges make having a solid quality assurance framework more critical than ever. It has never been a more important and exciting time to be a QA Engineer.

        My goal with this website is to share my experiences, insights, and knowledge about software testing with others, and to further my own knowledge while doing so.

        As an added bonus, I will also share some of my personal projects.
        `}
      </Typography>
      <Typography variant="lg/normal" as="p">
        Outside of work I enjoy:
      </Typography>
      <Typography variant="lg/normal" as="ul" className="list-disc">
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
          <section className=" mx-5 ">
            <Typography variant="3xl/extrabold" className="my-2" as="h2">
              Bio
            </Typography>
            {bioContent}
          </section>
          <Separator className="my-10" />
          <section className="mx-5">
            <div className="">
              <Typography variant="3xl/extrabold" className="my-8" as="h3">
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
