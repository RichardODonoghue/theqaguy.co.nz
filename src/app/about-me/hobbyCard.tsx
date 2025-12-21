import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';

export const HobbyCard = () => (
  <Card
    className="w-100 md:w-full max-w-md p-2 md:p-4"
    data-testid="hobby-card"
  >
    <CardHeader className="p-0 h-10 mb-5">
      <CardTitle>
        <Typography variant="3xl/extrabold" className="text-center" as="h2">
          Hobbies and Interests
        </Typography>
      </CardTitle>
    </CardHeader>
    <Separator className="" />
    <CardContent className="text-left text-nowrap" data-testid="hobbies-list">
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
    </CardContent>
  </Card>
);
