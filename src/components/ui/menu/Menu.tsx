'use client';
import { MobileMenu } from './mobile-menu';
import { DesktopMenu } from './desktop-menu';
import { useIsMobile } from '@/hooks/use-mobile';

export type MenuItem = { label: string; href: string };

export interface MenuProps {
  menuItems: MenuItem[];
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
