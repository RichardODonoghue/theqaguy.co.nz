import Link from 'next/link';

type menuItem = { label: string; href: string };

interface MenuProps {
  menuItems: menuItem[];
}

export const Menu = ({ menuItems }: MenuProps) => {
  return (
    <div className="flex items-center w-[20vh] h-[100vh] mx-5 ">
      <div className="border-2 border-black rounded-2xl h-[95%] w-full">
        <ul className="flex">
          {menuItems.map((item: menuItem, index) => (
            <li key={index} className="block">
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
