import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';

const profileDetails = {
  Occupation: 'QA Engineer',
  Location: 'Manawatu, New Zealand',
  Pets: '1 Dog and 2 Cats',
  'Favourite Food': 'Burgers',
  'Favourite Game': 'Final Fantasy VII',
  'Favourite Band': 'Linkin Park',
};

export const ProfileCard = () => (
  <Card
    className="w-100 md:w-full max-w-md p-2 md:p-4"
    data-testid="profile-card"
  >
    <CardHeader className="p-0 h-10 mb-5">
      <CardTitle>
        <Typography
          variant="3xl/extrabold"
          className="mb-8 text-center"
          as="h2"
        >
          Profile
        </Typography>
      </CardTitle>
    </CardHeader>
    <Separator />
    <CardContent className="w-full mx-auto px-4" data-testid="profile-details">
      {Object.entries(profileDetails).map(([key, value]) => (
        <Typography
          key={key}
          variant="lg/normal"
          className="text-left mx-auto w-full"
        >
          {`${key}: `}
          <Typography variant="lg/normal" className="text-accent" as="span">
            {value}
          </Typography>
        </Typography>
      ))}
    </CardContent>
  </Card>
);
