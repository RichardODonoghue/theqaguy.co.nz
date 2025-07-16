import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/constants/projects';
import { Typography } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card
      width="w-96"
      height="h-auto"
      overrides="mx-auto my-5"
      key={project.name}
      data-testid={project.name}
    >
      <div className="mb-4">
        <Typography variant="2xl/bold" as="h3" className="inline my-2">
          {project.name}
        </Typography>
        {project.url && (
          <Link
            href={project.url}
            className="bg-secondary mx-2 px-2 py-0 rounded-lg inline"
            target="_blank"
          >
            <Typography variant="sm/normal" className="inline">
              Visit
            </Typography>
          </Link>
        )}
        {project.image && (
          <Image
            src={project.image}
            alt={project.name}
            width={400}
            height={400}
            className="my-2 object-contain"
          />
        )}
      </div>
      <Separator className="m-2" />
      <div className="h-20 my-2">
        {project.technologies &&
          project.technologies?.map((tech) => (
            <div
              key={`${project.name}-${tech}`}
              className="inline-block mx-1 my-2 bg-accent rounded-2xl shadow-2xl shadow-slate-700"
            >
              <Typography
                variant="sm/normal"
                as="div"
                className="text-slate-700 px-2"
              >
                {tech}
              </Typography>
            </div>
          ))}
      </div>
    </Card>
  );
};
