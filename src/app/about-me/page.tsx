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
    <>
      <Typography variant="lg/normal" as="p">
        Hello Internet,{' '}
        <strong className="text-accent">I&apos;m Richard</strong>. <br />
        <br />I am an experienced Software QA Engineer. I live in Manawatu, New
        Zealand with my wife, son (arriving soon), two cats and dog. <br />
      </Typography>
      <br />
    </>
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
          <Separator className="my-5" />
        </div>
      </ScrollArea>
    </>
  );
}
