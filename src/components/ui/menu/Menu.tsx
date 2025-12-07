'use client';
import { MobileMenu } from './mobileMenu';
import { DesktopMenu } from './desktopMenu';
import { useIsMobile } from '@/hooks/use-mobile';
import { authClient } from '@/lib/auth/auth-client';

export type MenuItemData = { label: string; href: string };

export interface MenuProps {
  menuItems: MenuItemData[];
}

export const Menu = ({ isMobile }: { isMobile: boolean }) => {
  const isMobileClient = useIsMobile();

  const { data: session } = authClient.useSession();

  const menuItems = [
    { label: 'About Me', href: '/about-me' },
    { label: 'Projects', href: '/projects' },
    { label: 'QA Blog', href: '/qa-blog' },
  ];

  if (session?.user) {
    menuItems.push({ label: 'Admin', href: '/admin/blog' });
  }

  if (isMobile || isMobileClient) {
    return <MobileMenu menuItems={menuItems} />;
  } else {
    return <DesktopMenu menuItems={menuItems} />;
  }
};
