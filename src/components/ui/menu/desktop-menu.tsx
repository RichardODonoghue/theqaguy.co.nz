'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Typography } from '../typography';
import { Separator } from '../separator';
import { usePathname } from 'next/navigation';
import { MenuProps, MenuItem } from './Menu';

export const DesktopMenu = ({ menuItems }: MenuProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-96 h-dvh p-4" data-testid="desktop-menu">
      <nav className="rounded-2xl flex-1 p-4 backdrop-blur-3xl bg-slate-700/30 shadow-2xl ">
        <Link href="/" className="m-0 w-full p-0">
          <Image
            src="/theqaguy.png"
            alt="theqaguy"
            width="250"
            height="250"
            className="rounded-lg mx-auto"
          />
        </Link>
        <Separator className="my-10" />
        <ul className="flex flex-col space-y-2">
          {menuItems.map((item: MenuItem, index) => (
            <li key={index} className="my-4 w-40">
              <Link
                href={item.href}
                className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label={`Navigate to ${item.label}`}
              >
                <div className="inline-block">
                  <Typography variant="2xl/medium">{item.label}</Typography>
                  {pathname === item.href && (
                    <div className="bg-accent h-1 mt-1" />
                  )}
                </div>
              </Link>
            </li>
          ))}
          <Separator className="my-10" />
          <Link
            href="https://github.com/RichardODonoghue"
            aria-label="Check out my Github Profile"
            className="rounded-md hover:bg-accent"
            target="_blank"
          >
            <Image
              src="/github-mark-white.svg"
              alt="Github logo"
              width="50"
              height="50"
              className="inline m-5"
            />
            <Typography variant="md/medium" className="inline">
              Check Out My Profile
            </Typography>
          </Link>
          <Link
            href="https://www.linkedin.com/in/richard-o-donoghue"
            aria-label="Check out my LinkedIn Profile"
            className="rounded-md hover:bg-accent p-0"
            target="_blank"
          >
            <div>
              <Image
                src="/InBug-White.png"
                alt="LinkedIn In logo"
                width="50"
                height="50"
                className="inline m-5"
              />
              <Typography variant="md/medium" className="p-0 inline">
                Network With Me
              </Typography>
            </div>
          </Link>
          <Link
            href="https://discordapp.com/users/324838492423061504"
            aria-label="Contact me on discord"
            className="rounded-md hover:bg-accent p-0"
            target="_blank"
          >
            <div>
              <Image
                src="/Discord-Symbol-White.svg"
                alt="LinkedIn In logo"
                width="50"
                height="50"
                className="inline m-5"
              />
              <Typography variant="md/medium" className="p-0 inline">
                Get In Touch
              </Typography>
            </div>
          </Link>
        </ul>
      </nav>
    </div>
  );
};
