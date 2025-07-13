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
  title: 'TheQAGuy',
  description: "Personal website - Richard O'Donoghue",
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
        <Background />
        <div className="flex overflow-y-clip">
          <SidebarProvider defaultOpen={false}>
            <Menu isMobile={isMobile} />
            <Container>{children}</Container>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
