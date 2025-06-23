import { Container } from '@/components/ui/container';
import { ContentHeader } from '@/components/ui/contentHeader';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';
import { Project, projects } from '@/constants/projects';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
// import Image from "next/image";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div key={project.name} className="rounded-2xl mx-10 my-5 w-96 h-42">
      <div className="my-4">
        <Typography variant="h2" className="inline">
          {project.name}
        </Typography>
        {project.url && (
          <Link
            href={project.url}
            className="bg-secondary mx-2 px-2 py-0 rounded-lg inline"
          >
            <Typography variant="small">Visit</Typography>
          </Link>
        )}
      </div>
      <ScrollArea className="h-[calc(100%-40px)]">
        <Typography variant="p">{project.description}</Typography>
      </ScrollArea>
      <Separator className="m-2" />
      <div className="h-20">
        {project.technologies &&
          project.technologies?.map((tech) => (
            <div
              key={`${project.name}-${tech}`}
              className="inline-block my-2 mx-1 bg-accent text-slate-700 px-2 rounded-2xl shadow-2xl shadow-slate-700"
            >
              <Typography variant="small">{tech}</Typography>
            </div>
          ))}
      </div>
    </div>
  );
};

export default function Projects() {
  return (
    <Container>
      <ContentHeader>Projects</ContentHeader>
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="grid grid-cols-1 gap-y-36">
          {Object.entries(projects).map(([classification, projects]) => (
            <div key={classification} className="mx-5">
              <Typography variant="h1" alignment="left" className="">
                {classification}
              </Typography>
              <div className="grid grid-cols-3 my-5">
                {projects.map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Container>
  );
}
