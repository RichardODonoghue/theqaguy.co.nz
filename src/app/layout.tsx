import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Background } from '@/components/ui/background';
import { Container } from '@/components/ui/container';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getDeviceType } from '@/lib/getDeviceType';
import { Menu } from '@/components/ui/menu/Menu';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Richard O'Donoghue | QA Engineer",
  description: "Personal website of Richard O'Donoghue | QA Engineer",
  keywords: [
    "Richard O'Donoghue",
    'QA Engineer',
    'Quality Assurance',
    'Software Testing',
    'Automation',
    'SDET',
    'Cypress',
    'Playwright',
    'Selenium',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Blog',
    'ISTQB',
  ],
  authors: [{ name: "Richard O'Donoghue", url: 'https://theqaguy.co.nz' }],
  creator: "Richard O'Donoghue",
  openGraph: {
    title: "Richard O'Donoghue | QA Engineer",
    description: "Personal website of Richard O'Donoghue | QA Engineer",
    url: 'https://theqaguy.co.nz',
    siteName: "Richard O'Donoghue | QA Engineer",
    images: ['/theqaguy.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const userAgent = headerList.get('user-agent') || '';
  const isMobile =
    getDeviceType(userAgent) === 'mobile' ||
    getDeviceType(userAgent) === 'tablet';

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip link for keyboard users */}
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <Background />
        <main id="main-content" role="main" className="flex">
          <SidebarProvider defaultOpen={false}>
            <Menu isMobile={isMobile} />
            <Container>{children}</Container>
          </SidebarProvider>
        </main>
      </body>
    </html>
  );
}
