import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';

const EXCLUDED_PREFIXES = [
  '/_next/static',
  '/_next/image',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/assets',
];

const EXCLUDED_EXT =
  /\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|woff2?)$/i;

export async function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const isProd = host === 'theqaguy.co.nz' || host === 'www.theqaguy.co.nz';
  const path = request.nextUrl.pathname;

  // Skip static assets and excluded paths
  if (
    EXCLUDED_PREFIXES.some((p) => path.startsWith(p)) ||
    EXCLUDED_EXT.test(path)
  ) {
    return NextResponse.next();
  }

  // helper to set robots header on responses for non-prod
  const setRobots = (res: NextResponse) => {
    if (!isProd) {
      res.headers.set(
        'X-Robots-Tag',
        'noindex, nofollow, noarchive, nosnippet'
      );
    }
    return res;
  };

  // Protect /admin with better-auth
  if (path.startsWith('/admin')) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return setRobots(NextResponse.redirect(new URL('/', request.url)));
    }
    return setRobots(NextResponse.next());
  }

  // All other matched routes: just set robots header
  return setRobots(NextResponse.next());
}

export const config = {
  matcher: ['/:path*']
};
