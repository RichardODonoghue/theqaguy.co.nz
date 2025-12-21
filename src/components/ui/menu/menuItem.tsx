import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Typography } from '../typography';
import { MenuItemData } from './Menu';
import { usePathname } from 'next/navigation';

export interface MenuItemProps {
  item: MenuItemData;
  onClick?: () => void;
}

export const MenuItem = ({ item, onClick }: MenuItemProps) => {
  const pathname = usePathname();
  const [isSelected, setIsSelected] = useState(pathname.includes(item.href));

  useEffect(() => {
    setIsSelected(pathname.includes(item.href));
  }, [pathname, item.href]);

  return (
    <li
      className="my-4 w-40 h-12"
      data-testid={isSelected ? 'selected-menu-item' : undefined}
    >
      <Link
        href={item.href}
        className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label={`Navigate to ${item.label}`}
        onClick={onClick}
      >
        <div className="inline-block">
          <Typography variant="2xl/medium">{item.label}</Typography>
          <div
            className={`bg-accent h-1 ${isSelected ? 'visible' : 'invisible'}`}
          />
        </div>
      </Link>
    </li>
  );
};
