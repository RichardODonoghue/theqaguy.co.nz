import { Container } from "@/components/ui/container";
import { ContentHeader } from "@/components/ui/contentHeader";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { differenceInYears } from "date-fns";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { technologies } from "@/constants/technologies";
import { softSkills } from "@/constants/softSkills";
import { roles } from "@/constants/roles";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AboutMe() {
  const experience = differenceInYears(Date.now(), "2022-10-01");

  const bioContent = (
    <>
      <Typography variant="p" className="text-2xl">
        Hello Internet,{" "}
        <strong className="text-accent">I&apos;m Richard</strong>. <br />
        <br />I am a Software QA Engineer with {experience} years experience. I
        live in Manawatu, New Zealand with my wife, son (arriving soon), two
        cats and dog. <br />
      </Typography>
      <br />
    </>
  );

  const technologyExperience = Object.entries(technologies).map(
    ([category, tech]) => (
      <div key={category} className="">
        <Typography
          alignment="center"
          variant="h4"
          className="text-nowrap mb-5"
        >
          {category}
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-0 gap-y-2 w-48 mx-auto my-5">
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
      className="bg-accent mx-2 p-2 rounded-2xl inline text-slate-700 bold shadow-slate-700 shadow-sm "
    >
      {skill}
    </div>
  ));

  const myRoles = roles.map((role) => (
    <div key={role.name} className="">
      <Typography variant="h3" className="text-accent">
        {role.name}
      </Typography>
      <Typography variant="h4" className="">
        {role.company}
      </Typography>
      <Typography variant="p" className="">
        {role.description}
      </Typography>
      <Typography variant="p" className="text-secondary">
        {role.dateRange}
      </Typography>
    </div>
  ));

  return (
    <Container>
      <ContentHeader>AboutMe</ContentHeader>
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="pr-4">
          <section className="w-1/2 mx-5">
            <Typography variant="h1">Bio</Typography>
            {bioContent}
          </section>
          <Separator className="my-5" />
          <section className="mx-5">
            <Typography variant="h1" className="my-2">
              Skills
            </Typography>
            <div className="my-10">
              <Typography variant="h3" className="my-8">
                Soft Skills
              </Typography>
              <div className="my-5">{mySoftSkills}</div>
            </div>
            <div className="">
              <Typography variant="h3" className="my-8">
                Technology Skills
              </Typography>
              <div className="grid grid-cols-4 mt-5">
                {technologyExperience}
              </div>
            </div>
          </section>
          <Separator className="my-5" />
          <section className="mx-5">
            <Typography variant="h1" className="my-5">
              Roles
            </Typography>
            <div className="grid grid-cols-2 gap-12">{myRoles}</div>
          </section>
        </div>
      </ScrollArea>
    </Container>
  );
}
