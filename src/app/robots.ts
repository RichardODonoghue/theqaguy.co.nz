import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const requestHeaders = await headers();
  const host = requestHeaders.get('host') ?? '';
  const isProd = host === 'theqaguy.co.nz' || host === 'www.theqaguy.co.nz';

  if (!isProd) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      sitemap: [],
    };
  }

  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/admin' },
      { userAgent: '*', disallow: '/login' },
    ],
    sitemap: ['https://theqaguy.co.nz/sitemap.xml'],
    host: 'https://theqaguy.co.nz',
  };
}
