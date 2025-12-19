import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';

export const craziestBug = `A misconfiguration in a Drupal database viewer plugin, inadvertently
          left active in a production environment, created a critical security
          vulnerability. Despite middleware attempting to redirect
          unauthenticated users to a login page, the viewer remained fully
          interactive and visible on that page. By manipulating URL parameters,
          I was able to gain full access any table in the database.`;

export const greatestAchievement = `I developed a fast, robust Playwright testing framework from the
          ground up for a complex suite of web applications with shared
          components. My framework significantly reduced manual testing time,
          improved software quality, and integrated seamlessly with the CI/CD
          pipeline. I also engineered a K8s job for automated environment
          management, ensuring tests ran on every PR to provide rapid feedback
          and accelerate release cycles.`;

export const greatestChallenge = `Being a solo QA Engineer in a fast-paced startup with a large team of
          developers posed significant challenges. I had to quickly establish
          testing processes, advocate for quality practices, and manage a
          growing backlog of testing tasks. Balancing these responsibilities
          while ensuring timely releases required strong prioritization,
          communication, and adaptability. Learning to compromise between ideal
          quality standards and practical constraints was a key part of my
          growth in this role.`;

export const Highlights = () => (
  <>
    <Card
      width="w-full max-w-md"
      overrides="md:p-4"
      data-testid="highlight-craziest-bug"
    >
      <Typography variant="3xl/extrabold" className="mb-8 text-center" as="h2">
        Craziest Bug
      </Typography>
      <Separator className="mb-4" />
      <div className="text-left p-4">
        <Typography variant="lg/normal" className="block" as="p">
          {craziestBug}
        </Typography>
      </div>
    </Card>
    <Card
      width="w-full max-w-md"
      overrides="md:p-4"
      data-testid="highlight-greatest-achievement"
    >
      <Typography variant="3xl/extrabold" className="mb-8 text-center" as="h2">
        Greatest Achievement
      </Typography>
      <Separator className="mb-4" />
      <div className="text-left p-4">
        <Typography variant="lg/normal" className="block" as="p">
          {greatestAchievement}
        </Typography>
      </div>
    </Card>
    <Card
      width="w-full max-w-md"
      overrides="md:p-4"
      data-testid="highlight-greatest-challenge"
    >
      <Typography variant="3xl/extrabold" className="mb-8 text-center" as="h2">
        Greatest Challenge
      </Typography>
      <Separator className="mb-4" />
      <div className="text-left p-4">
        <Typography variant="lg/normal" className="block" as="p">
          {greatestChallenge}
        </Typography>
      </div>
    </Card>
  </>
);
