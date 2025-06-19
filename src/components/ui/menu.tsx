import Link from 'next/link';

type MenuItem = { label: string; href: string };

interface MenuProps {
  menuItems: menuItem[];
}

export const Menu = ({ menuItems }: MenuProps) => {
  return (
    <div className="flex flex-col w-64 min-h-screen p-4">
      <nav className="border-2 border-border rounded-2xl flex-1 p-4">
        <ul className="flex flex-col space-y-2">
          {menuItems.map((item: MenuItem, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
