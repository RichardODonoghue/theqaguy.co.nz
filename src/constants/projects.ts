type Classification = 'Software' | 'Other';

export interface Project {
  name: string;
  description: string;
  technologies?: string[];
  image: string;
  url?: string;
}

export const projects: Record<Classification, Project[]> = {
  Software: [
    {
      name: 'theqaguy.co.nz',
      description:
        "My own personal website to blog about the world of software quality assurance, share some projects I am working on and tell the internet and potential employers about me! If you're on this page, you're probably viewing this project right now.. ",
      technologies: [
        'Typescript',
        'Next.js',
        'ShadCN',
        'Vitest',
        'Playwright',
        'Tailwind CSS',
        'Prisma ORM',
        'PostgreSQL',
        'Redis',
      ],
      image: '/projects/qaguy.png',
      url: 'https://theqaguy.co.nz/',
    },
    {
      name: 'MDR Terminal',
      description:
        "After binge watching Severance with my wife, I couldn't help but try to build my own spin on the MDR terminal.",
      technologies: ['Typescript', 'React', 'Vite', 'Tailwind CSS'],
      image: '/projects/mdr.png',
      url: 'https://macro-data-refinement.theqaguy.co.nz/',
    },
    {
      name: 'Massage+ByTheSquare',
      description:
        'A local business looking to modernise. After years of running a basic Wix site, this business is wanting to move to fully digital booking management and provide a better experience to customers. This full stack web application provides innovative booking experience for clients and a fully featured admin panel that gives management new reporting capabilities and the ability to more efficiently manage their business. ',
      technologies: [
        'Better Auth',
        'Next.js',
        'Prisma',
        'PostgreSQL',
        'Tailwind CSS',
        'Playwright',
      ],
      image: '',
      url: '',
    },
  ],
  Other: [
    {
      name: 'The Open Source Racecar',
      description:
        'Building a hobbiest racecar is an expensive endeavour. The most costly part often being engine management. Luckily for me there are some incredibly talented people that have made opensource daughter boards and fimrware for Arduino boards to control engines',
      image: '/projects/echo.png',
      technologies: ['speeduino', 'arduino', 'tunerstudio'],
    },
  ],
};
