import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Typography } from '../typography';
import { MenuItemData } from './Menu';
import { usePathname } from 'next/navigation';

export interface MenuItemProps {
  item: MenuItemData;
}

export const MenuItem = ({ item }: MenuItemProps) => {
  const pathname = usePathname();
  const [isSelected, setIsSelected] = useState(pathname === item.href);

  useEffect(() => {
    setIsSelected(pathname === item.href);
  }, [pathname, item.href]);

  return (
    <li
      className="my-4 w-40"
      data-testid={isSelected ? 'selected-menu-item' : undefined}
    >
      <Link
        href={item.href}
        className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label={`Navigate to ${item.label}`}
      >
        <div className="inline-block">
          <Typography variant="2xl/medium">{item.label}</Typography>
          {isSelected && <div className="bg-accent h-1 mt-1" />}
        </div>
      </Link>
    </li>
  );
};
