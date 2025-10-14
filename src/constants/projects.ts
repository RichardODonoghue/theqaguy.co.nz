type Classification = 'Software' | 'Other';

export interface Project {
  name: string;
  description: string;
  status: 'Development' | 'Complete';
  technologies?: string[];
  image: string;
  url?: string;
}

export const projects: Record<Classification, Project[]> = {
  Software: [
    {
      name: 'theqaguy.co.nz',
      description: `My Personal website to share a bit about me and blog about software quality assurance.
      
      The site features a WYSIWIG editor and static renderer built from TipTap, with various extensions such as highlighted code blocks and image upload to provide the richest content possible.
      
      As a fun gimmic I also set up a button on the home page that allows a user to run an automated test suite on the website. Try it out if you haven't already.
`,
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
      status: 'Complete',
    },
    {
      name: 'MDR Terminal',
      description: `After binge watching Severance with my wife, I couldn't help but try to build my own spin on the MDR terminal.
        
         While I consider this to be complete, there are some features I would like to revisit in the future such as adding a proper algorithm for detetecting valid/invalid data in selected clusters.
        `,
      technologies: ['Typescript', 'React', 'Vite', 'Tailwind CSS'],
      image: '/projects/mdr.png',
      url: 'https://macro-data-refinement.theqaguy.co.nz/',
      status: 'Complete',
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
      image: '/projects/MassageLogo.svg',
      url: '',
      status: 'Development',
    },
    {
      name: 'ETextToZen',
      description: `A Zendesk plugin that integrates with Spark's E-Text service, allowing users to send text messages to customers within support tickets`,
      technologies: ['Javascript', 'Zendesk API'],
      image: '',
      url: '',
      status: 'Complete',
    },
  ],
  Other: [
    {
      name: 'The Open Source Racecar',
      description: `Building a hobbiest racecar is an expensive endeavour with one of the most expensive parts being engine management.
         Luckily for me there are some incredibly talented people that have made opensource daughter boards and fimrware for the Arduino Mega 2560 to control engines.

         This is a requirement for the build as the car has been turbocharged and the standard Toyota ECU cannot be reflashed to run the required fueling and ignition maps.

         All the fabrication and plumbing work has been done for the car and it has run on a basic tune using the speeduino firmware. All that remains is to tidy up the wiring harness and dial in the car.`,
      image: '/projects/echo.png',
      technologies: ['speeduino', 'arduino', 'tunerstudio'],
      status: 'Development',
    },
  ],
};
