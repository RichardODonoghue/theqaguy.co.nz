import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/app/projects/projects';
import { Typography } from '@/components/ui/typography';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const ProjectDialog = ({ project }: { project: Project }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          Learn More
        </Button>
      </DialogTrigger>
      <DialogContent className="backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold">
            {project.name}
          </DialogTitle>
          <span className="inline text-md font-semibold">
            Development Stage:{' '}
            <strong
              className={
                project.status === 'Development'
                  ? 'text-yellow-400'
                  : 'text-green-400'
              }
            >
              {project.status}
            </strong>
          </span>
          <pre className="whitespace-pre-line text-sm md:text-lg text-indigo-50">
            {project.description}
          </pre>
        </DialogHeader>
        <DialogFooter>
          {project.technologies && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-secondary text-white text-sm md:text-sm px-2 py-1 rounded-xl"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card
      key={project.name}
      data-testid={`project-${project.name}`}
      className="py-2 px-0 w-80 md:w-100"
    >
      <CardHeader>
        <CardTitle className="text-center">
          <Typography variant="2xl/bold" className="inline" as="h3">
            {project.name}
          </Typography>
          {project.url && (
            <Link
              href={project.url}
              className="bg-secondary mx-2 px-2 py-0 rounded-lg inline"
              target="_blank"
            >
              <Typography
                variant="sm/normal"
                className="inline text-secondary-foreground"
              >
                Visit
              </Typography>
            </Link>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {project.image && (
          <Image
            src={project.image}
            alt={project.name}
            width={400}
            height={400}
            className="mb-2 object-contain w-full rounded-lg h-50"
          />
        )}
        <CardAction className="mx-auto w-full p-2">
          <ProjectDialog project={project} />
        </CardAction>
      </CardContent>
    </Card>
  );
};
