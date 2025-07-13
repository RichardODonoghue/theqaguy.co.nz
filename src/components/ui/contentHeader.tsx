'use client';
import { ReactNode } from 'react';
import { Typography } from './typography';
import { useIsMobile } from '@/hooks/use-mobile';
import { MenuIcon } from 'lucide-react';
import { useSidebar } from './sidebar';

interface ContentHeaderProps {
  children: ReactNode;
}

export const ContentHeader = ({ children }: ContentHeaderProps) => {
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();

  const handleShowMenu = () => {
    setOpenMobile(true);
  };

  return (
    <div className="text-right relative right-2 w-full mb-5">
      {isMobile && (
        <>
          <button
            className="absolute left-2 text-left z-10"
            data-testid="mobile-menu-button"
          >
            <MenuIcon className="w-10 h-10" onClick={handleShowMenu} />
          </button>
        </>
      )}
      <Typography variant="5xl/extrabold" as="h1" className="inline-block">
        <span className="text-accent">{'<'}</span>
        {children}
        <span className="text-accent">{'/>'}</span>
      </Typography>
    </div>
  );
};
