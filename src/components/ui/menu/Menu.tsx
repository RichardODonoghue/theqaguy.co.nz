'use client';
import { MobileMenu } from './mobileMenu';
import { DesktopMenu } from './desktopMenu';
import { useIsMobile } from '@/hooks/use-mobile';

export type MenuItemData = { label: string; href: string };

export interface MenuProps {
  menuItems: MenuItemData[];
}

const menuItems = [
  { label: 'About Me', href: '/about-me' },
  { label: 'Projects', href: '/projects' },
  { label: 'QA Blog', href: '/qa-blog' },
];

export const Menu = ({ isMobile }: { isMobile: boolean }) => {
  const isMobileClient = useIsMobile();

  if (isMobile || isMobileClient) {
    return <MobileMenu menuItems={menuItems} />;
  } else {
    return <DesktopMenu menuItems={menuItems} />;
  }
};
