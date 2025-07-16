import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  width: string;
  height: string;
  overrides?: string;
}

export const Card = ({
  children,
  width = 'w-50',
  height = 'h-auto',
  overrides = '',
}: CardProps) => {
  return (
    <div
      className={`rounded-2xl flex-1 p-2 md:p-4 backdrop-blur-3xl bg-slate-700/30 shadow-2xl mx-5 ${width} ${height} ${overrides}`}
    >
      {children}
    </div>
  );
};
