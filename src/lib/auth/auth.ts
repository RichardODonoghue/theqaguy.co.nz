import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/prisma';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  advanced: {
    useSecureCookies: true,
  },
  onAPIError: {
    throw: false,
    onError: (error) => {
      console.error('Auth error:', error);
    },
  },
  plugins: [nextCookies()],
});
