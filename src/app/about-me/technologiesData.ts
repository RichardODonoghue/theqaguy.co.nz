type Category =
  | 'Databases'
  | 'Dev Tools'
  | 'Infrastructure'
  | 'Languages'
  | 'Project Management'
  | 'Operating Systems'
  | 'Test Frameworks & Tools'
  | 'Web';

interface Technology {
  name: string;
  logo: string;
}

type Technologies = Record<Category, Technology[]>;

export const technologies: Technologies = {
  Databases: [
    { name: 'MongoDB', logo: 'MongoDB.svg' },
    { name: 'PostgreSQL', logo: 'PostgresSQL.svg' },
    { name: 'Redis', logo: 'redis.svg' },
  ],
  'Dev Tools': [
    {
      name: 'Bash',
      logo: 'Bash.svg',
    },
    { name: 'BitBucket', logo: 'BitBucket.svg' },
    { name: 'DBeaver', logo: 'DBeaver.svg' },
    { name: 'Docker', logo: 'Docker.svg' },
    { name: 'Git', logo: 'git.svg' },
  ],
  Infrastructure: [
    { name: 'AWS', logo: 'AWS.svg' },
    { name: 'GitHub Actions', logo: 'GitHub-Actions.svg' },
    { name: 'Kubernetes', logo: 'Kubernetes.svg' },
    { name: 'Terraform', logo: 'HashiCorp-Terraform.svg' },
    { name: 'Octopus Deploy', logo: 'octopus-deploy.svg' },
  ],
  Languages: [
    { name: 'HTML5', logo: 'HTML5.svg' },
    { name: 'JavaScript', logo: 'JavaScript.svg' },
    { name: 'TypeScript', logo: 'TypeScript.svg' },
  ],
  'Project Management': [
    { name: 'Confluence', logo: 'Confluence.svg' },
    { name: 'Jira', logo: 'Jira.svg' },
  ],
  'Operating Systems': [
    { name: 'Mac OS', logo: 'apple.svg' },
    { name: 'Linux', logo: 'Linux.svg' },
    { name: 'Windows', logo: 'Windows.svg' },
    { name: 'Android', logo: 'android.svg' },
  ],
  'Test Frameworks & Tools': [
    { name: 'Cypress', logo: 'Cypress.svg' },
    { name: 'Playwright', logo: 'Playwright.svg' },
    { name: 'Postman', logo: 'Postman.svg' },
    { name: 'Vitest', logo: 'vitest.svg' },
  ],
  Web: [
    { name: 'Bun', logo: 'bun.svg' },
    { name: 'Next.js', logo: 'Nextjs.svg' },
    { name: 'Node.js', logo: 'Node.js.svg' },
    { name: 'React', logo: 'React.svg' },
    { name: 'Tailwind CSS', logo: 'Tailwind-CSS.svg' },
    { name: 'Vite.js', logo: 'Vite.js.svg' },
  ],
};
