import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Menu } from '@/components/ui/menu';
import { Backgrund } from '@/components/ui/background';

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

const menuItems = [
  { label: 'About Me', href: '/about-me' },
  { label: 'Projects', href: '/projects' },
  { label: 'QA Blog', href: '/qa-blog' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Backgrund />
        <div className="flex">
          <Menu menuItems={menuItems} />
          {children}
        </div>
      </body>
    </html>
  );
}
