import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';

interface Highlight {
  title: string;
  description: string;
  testId: string;
}

export const highlights: Highlight[] = [
  {
    title: 'Craziest Bug',
    description: `A misconfiguration in a Drupal database viewer plugin, inadvertently
          left active in a production environment, created a critical security
          vulnerability. Despite middleware attempting to redirect
          unauthenticated users to a login page, the viewer remained fully
          interactive and visible on that page. By manipulating URL parameters,
          I was able to gain full access any table in the database.`,
    testId: 'highlight-craziest-bug',
  },
  {
    title: 'Greatest Achievement',
    description: `I developed a fast, robust Playwright testing framework from the
          ground up for a complex suite of web applications with shared
          components. My framework significantly reduced manual testing time,
          improved software quality, and integrated seamlessly with the CI/CD
          pipeline. I also engineered a K8s job for automated environment
          management, ensuring tests ran on every PR to provide rapid feedback
          and accelerate release cycles.`,
    testId: 'highlight-greatest-achievement',
  },
  {
    title: 'Greatest Challenge',
    description: `Being a solo QA Engineer in a fast-paced startup with a large team of
          developers posed significant challenges. I had to quickly establish
          testing processes, advocate for quality practices, and manage a
          growing backlog of testing tasks. Balancing these responsibilities
          while ensuring timely releases required strong prioritization,
          communication, and adaptability. Learning to compromise between ideal
          quality standards and practical constraints was a key part of my
          growth in this role.`,
    testId: 'highlight-greatest-challenge',
  },
];

export const Highlights = () => (
  <>
    {highlights.map(({ title, description, testId }) => (
      <Card
        key={testId}
        className="w-full max-w-md md:p-4"
        data-testid={testId}
      >
        <CardHeader className="p-0 h-10 mb-5">
          <CardTitle className="text-center p-0">
            <Typography variant="3xl/extrabold" as="h2" className="p-0 my-0">
              {title}
            </Typography>
          </CardTitle>
        </CardHeader>
        <Separator className="mt-0" />
        <CardContent className="text-left p-2">
          <Typography variant="lg/normal" className="block p-2 md:p-0" as="p">
            {description}
          </Typography>
        </CardContent>
      </Card>
    ))}
  </>
);
