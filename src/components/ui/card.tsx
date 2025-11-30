import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  width?: string;
  height?: string;
  overrides?: string;
  'data-testid'?: string;
}

export const Card = ({
  children,
  width = 'w-50',
  height = 'h-auto',
  overrides = '',
  'data-testid': dataTestId,
}: CardProps) => {
  return (
    <div
      className={`rounded-2xl flex-1 p-2 md:p-4 backdrop-blur-3xl mx-5 ${width} ${height} ${overrides}`}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
};
