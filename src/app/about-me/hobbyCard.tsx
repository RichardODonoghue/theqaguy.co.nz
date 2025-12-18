import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';

export const HobbyCard = () => (
  <Card width="w-full max-w-md" data-testid="hobby-card" overrides="md:p-4">
    <Typography variant="3xl/extrabold" className=" text-center" as="h2">
      Hobbies and Interests
    </Typography>
    <Separator className="" />
    <div className="text-left text-nowrap p-4" data-testid="hobbies-list">
      <Typography
        variant="lg/normal"
        as="ul"
        className="list-inside"
        data-testid="about-me-hobbies"
      >
        <li className=" list-disc">Building software and tools</li>
        <li className=" list-disc">Contributing to FOSS software</li>
        <li className=" list-disc">Attending my local Linux user group</li>
        <li className=" list-disc">Playing and building video games</li>
        <li className=" list-disc">Spending time with my family</li>
      </Typography>
    </div>
  </Card>
);
