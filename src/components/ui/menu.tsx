import Link from 'next/link';
import Image from 'next/image';
import { Typography } from './typography';
import { Separator } from './separator';

type MenuItem = { label: string; href: string };

interface MenuProps {
  menuItems: MenuItem[];
}

export const Menu = ({ menuItems }: MenuProps) => {
  return (
    <div className="flex flex-col w-96 min-h-screen p-4">
      <nav className="border-2 rounded-2xl flex-1 p-4">
        <Link href="/" className="m-0 w-full p-0">
          <Image
            src="/theqaguy.png"
            alt="theqaguy"
            width="250"
            height="250"
            className="rounded-lg mb-5"
          />
        </Link>
        <Separator />
        <ul className="flex flex-col space-y-2">
          {menuItems.map((item: MenuItem, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors my-2"
                aria-label={`Navigate to ${item.label}`}
              >
                <Typography variant="large">{item.label}</Typography>
              </Link>
            </li>
          ))}
          <Separator />
          <p>socials, and shit here</p>
        </ul>
      </nav>
    </div>
  );
};
