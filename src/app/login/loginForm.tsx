'use client';

import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await authClient.signIn.email(
      {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        rememberMe: true,
      },
      {
        onError: (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials and try again.');
        },
        onSuccess: () => {
          console.log('Login successful!');
          // Redirect or perform any other action after successful login
          router.push('/admin/blog');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4">
        <label htmlFor="email" className="">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="block mx-auto mt-2 p-2 border border-gray-300 rounded-md bg-slate-500/30"
        />
      </div>
      <div className="p-4">
        <label htmlFor="password" className="">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="block mx-auto mt-2 p-2 border border-gray-300 rounded-md bg-slate-500/30"
        />
      </div>
      <Button type="submit" className=" mt-4">
        Continue
      </Button>
    </form>
  );
};
