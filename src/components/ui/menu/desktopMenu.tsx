'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Typography } from '../typography';
import { Separator } from '../separator';
import { MenuItemData, MenuProps } from './Menu';
import { MenuItem } from './menuItem';

export const DesktopMenu = ({ menuItems }: MenuProps) => {
  return (
    <div className="flex flex-col p-4 h-full" data-testid="desktop-menu">
      <nav className="rounded-2xl flex-1 p-4 backdrop-blur-3xl bg-slate-700/30 shadow-2xl">
        <div className="h-50">
          <Link href="/" className="m-0 w-full p-0">
            <Image
              src="/theqaguy.png"
              alt="theqaguy"
              width="250"
              height="250"
              className="rounded-lg mx-auto"
            />
          </Link>
        </div>
        <Separator className="my-5" />
        <div className="flex flex-col justify-center h-80 gap-y-3">
          <ul>
            {menuItems.map((item: MenuItemData, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </ul>
        </div>
        <Separator className="my-10" />
        <div className="h-60 lg:h-80 flex flex-col justify-center space-y-4">
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
              className="inline my-5 mx-2"
            />
            <Typography variant="md/medium" className="inline">
              View My Projects
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
                className="inline my-5 mx-2"
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
                className="inline my-5 mx-2"
              />
              <Typography
                variant="md/medium"
                className="p-0 inline text-center"
              >
                Get In Touch
              </Typography>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};
