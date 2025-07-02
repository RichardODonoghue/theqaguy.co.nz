'use client';
import { ReactNode } from 'react';
import { Typography } from './typography';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MenuIcon } from 'lucide-react';

interface ContentHeaderProps {
  children: ReactNode;
}

export const ContentHeader = ({ children }: ContentHeaderProps) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const handleShowMenu = () => {};

  return (
    <div className="text-right relative right-2 w-full mb-5">
      {isMobile && (
        <button className="absolute left-0 text-left" onClick={handleShowMenu}>
          <MenuIcon className="w-10 h-10" />
        </button>
      )}
      <Typography variant="5xl/extrabold" as="h1" className="inline-block">
        <span className="text-accent">{'<'}</span>
        {children}
        <span className="text-accent">{'/>'}</span>
      </Typography>
    </div>
  );
};
