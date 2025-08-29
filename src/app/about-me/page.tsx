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
    <div className="">
      <Typography variant="xl/normal" as="h3">
        Hello Internet,{' '}
        <strong className="text-accent">I&apos;m Richard</strong>
      </Typography>
      <Typography variant="lg/normal" as="p">
        I am an experienced QA Engineer. I live in the beautiful and marvelous
        Manawatu region of New Zealand with my wife, son and two cats and dog.{' '}
        <br />
        <br />I have a fiery passion for Software Quality. I am a firm believer
        that software quality is not just a phase in the software development
        lifecycle or an automated test suite, but a value that should be
        integrated into every aspect of a business delivering software.
        <br />
        <br />
        We are living in a world where software is more complex than ever. We
        are delivering faster than ever and AI is changing the way we build
        software. These challenges make quality assurance and testing more
        critical than ever. It has never been a more important and exciting time
        to be a QA Engineer.
        <br />
        <br />
        My goal with this website is to share my experiences, insights, and
        knowledge with others in the field.
      </Typography>
      <Typography variant="3xl/extrabold" className="my-2" as="h2">
        Hobbies
      </Typography>
      <Typography variant="lg/normal" as="p">
        In my free time I enjoy:
      </Typography>
      <Typography variant="lg/normal" as="ul">
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
      <div key={category} className="">
        <Typography
          variant="xl/normal"
          as="h2"
          className="text-nowrap mb-5 text-center"
        >
          {category}
        </Typography>
        <div className="grid grid-cols-3 gap-x-0 gap-y-2 w-48 mx-auto my-5">
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
      <ScrollArea className="h-[calc(100vh-120px)] lg:h-[calc(100vh-180px)]">
        <div className="pr-4">
          <section className=" mx-5">
            <Typography variant="3xl/extrabold" className="my-2" as="h2">
              Bio
            </Typography>
            {bioContent}
          </section>
          <Separator className="my-5" />
          <section className="mx-5">
            <Typography variant="3xl/extrabold" className="my-2" as="h2">
              Skills
            </Typography>
            <div className="">
              <Typography variant="2xl/extrabold" className="my-8" as="h3">
                Technology Skills
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
