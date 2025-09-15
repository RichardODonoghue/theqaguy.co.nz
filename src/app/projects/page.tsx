import { ContentHeader } from "@/components/ui/contentHeader";

import { Typography } from "@/components/ui/typography";
import { projects } from "@/constants/projects";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectCard } from "./projectCard";

export default function Projects() {
  return (
    <>
      <ContentHeader>Projects</ContentHeader>
      <ScrollArea className="h-full">
        <div className="grid grid-cols-1 mb-20">
          {Object.entries(projects).map(([classification, projects]) => (
            <div key={classification} className="mx-5">
              <Typography
                variant="3xl/bold"
                as="h2"
                className="text-left md:my-5"
              >
                {classification}
              </Typography>
              <div className="grid lg:grid-cols-2">
                {projects.map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
