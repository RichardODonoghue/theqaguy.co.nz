import { ContentHeader } from '@/components/ui/contentHeader';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { technologies } from '@/constants/technologies';
import { softSkills } from '@/constants/softSkills';
import { roles } from '@/constants/roles';
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

  const mySoftSkills = softSkills.map((skill) => (
    <div
      key={skill}
      className="bg-accent px-2 py-1 m-1 rounded-2xl shadow-slate-700 shadow-sm"
    >
      <Typography
        variant="sm/normal"
        as="p"
        className="text-nowrap text-slate-700 bold"
      >
        {skill}
      </Typography>
    </div>
  ));

  const myRoles = roles.map((role, index) => (
    <div key={role.name} data-testid={`role-${index}`} className="">
      <Typography variant="2xl/extrabold" as="h3" className="text-accent">
        {role.name}
      </Typography>
      <Typography variant="xl/medium" as="span" className="my-2">
        {role.company}
      </Typography>
      <Typography variant="lg/normal" as="p" className="my-5">
        {role.description}
      </Typography>
      <Typography variant="lg/normal" as="p" className="text-secondary my-2">
        {role.dateRange}
      </Typography>
    </div>
  ));

  return (
    <>
      <ContentHeader>AboutMe</ContentHeader>
      <ScrollArea className="h-[calc(100vh-60px)]">
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
            <div className="my-10">
              <Typography variant="2xl/extrabold" className="my-8" as="h3">
                Soft Skills
              </Typography>
              <div className="my-5 flex flex-wrap justify-start md:justify-center">
                {mySoftSkills}
              </div>
            </div>
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
          <section className="m-5">
            <Typography variant="3xl/extrabold" className="my-5" as="h2">
              Roles
            </Typography>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12">
              {myRoles}
            </div>
          </section>
        </div>
      </ScrollArea>
    </>
  );
}
