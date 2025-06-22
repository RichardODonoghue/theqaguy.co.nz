import Link from "next/link";
import Image from "next/image";
import { Typography } from "./typography";
import { Separator } from "./separator";

type MenuItem = { label: string; href: string };

interface MenuProps {
  menuItems: MenuItem[];
}

export const Menu = ({ menuItems }: MenuProps) => {
  return (
    <div className="flex flex-col w-96 h-dvh p-4">
      <nav className="rounded-2xl flex-1 p-4 backdrop-blur-3xl bg-slate-700/30 shadow-2xl ">
        <Link href="/" className="m-0 w-full p-0">
          <Image
            src="/theqaguy.png"
            alt="theqaguy"
            width="250"
            height="250"
            className="rounded-lg"
          />
        </Link>
        <Separator className="my-10" />
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
          <Separator className="my-10" />
          <Link
            href="https://github.com/RichardODonoghue"
            aria-label="Check out my Github Profile"
            className="rounded-md hover:bg-accent"
          >
            <Image
              src="/github-mark-white.svg"
              alt="Github logo"
              width="50"
              height="50"
              className="inline m-5"
            />
            <Typography variant="p" className="inline">
              Check Out My Profile
            </Typography>
          </Link>
          <Link
            href="https://www.linkedin.com/in/richard-o-donoghue"
            aria-label="Check out my LinkedIn Profile"
            className="rounded-md hover:bg-accent p-0"
          >
            <div>
              <Image
                src="/InBug-White.png"
                alt="LinkedIn In logo"
                width="50"
                height="50"
                className="inline m-5"
              />
              <Typography variant="p" className="p-0 inline">
                Network With Me
              </Typography>
            </div>
          </Link>
          <Link
            href="https://discordapp.com/users/324838492423061504"
            aria-label="Contact me on discord"
            className="rounded-md hover:bg-accent p-0"
          >
            <div>
              <Image
                src="/Discord-Symbol-White.svg"
                alt="LinkedIn In logo"
                width="50"
                height="50"
                className="inline m-5"
              />
              <Typography variant="p" className="p-0 inline">
                Get In Touch
              </Typography>
            </div>
          </Link>
        </ul>
      </nav>
    </div>
  );
};
