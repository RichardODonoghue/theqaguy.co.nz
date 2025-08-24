import { Card } from '@/components/ui/card';
import { ContentHeader } from '@/components/ui/contentHeader';
import { LoginForm } from './loginForm';

export default function LoginPage() {
  return (
    <>
      <ContentHeader>Login</ContentHeader>
      <div className="w-full mx-auto text-center p-4">
        <Card width="w-2/3" height="h-full" overrides="py-8 mx-auto">
          <LoginForm />
        </Card>
      </div>
    </>
  );
}
