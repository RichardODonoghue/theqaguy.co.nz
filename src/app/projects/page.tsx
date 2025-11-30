import { ContentHeader } from '@/components/ui/contentHeader';

import { Typography } from '@/components/ui/typography';
import { projects } from '@/constants/projects';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProjectCard } from './projectCard';

export async function generateMetadata() {
  return {
    title: 'TheQAGuy | Projects',
    description: 'Explore the projects I have worked on',
    keywords: [
      'TheQAGuy',
      'Software Projects',
      'QA Engineer',
      'Software Testing',
      'Quality Assurance',
      'React.js',
      'Next.js',
      'Node.js',
      'Open Source',
      'Portfolio',
      'GitHub',
      'Project Showcase',
      'Automation',
      'Testing Tools',
      'Web Development',
      'Software Development',
      'Tech Projects',
      'Personal Projects',
      'Professional Work',
      'Coding',
      'Programming',
      'Tech Stack',
      'Software Engineering',
      'Project Management',
      'Continuous Integration',
    ],
  };
}

export default function Projects() {
  return (
    <>
      <ContentHeader>Projects</ContentHeader>
      <ScrollArea className="h-full">
        <div className="grid grid-cols-1 mb-20">
          {Object.entries(projects).map(([classification, projects]) => (
            <section
              aria-labelledby={`${classification}-projects`}
              key={classification}
              id={classification.toLowerCase() + '-projects'}
              className="mx-5"
            >
              <Typography
                variant="3xl/bold"
                as="h2"
                className="text-center md:my-5"
              >
                {classification}
              </Typography>
              <div className="grid lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
