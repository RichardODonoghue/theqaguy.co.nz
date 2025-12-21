import { Card, CardContent } from '@/components/ui/card';
import { ContentHeader } from '@/components/ui/contentHeader';
import { LoginForm } from './loginForm';
import { Typography } from '@/components/ui/typography';

export default function LoginPage() {
  return (
    <>
      <ContentHeader>Login</ContentHeader>
      <div className="w-full mx-auto text-center p-4">
        <Card className="w-2/3 py-8 mx-auto h-full">
          <CardContent>
            <Typography variant="2xl/medium" className="mb-4">
              Please log in to access the editor
            </Typography>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
