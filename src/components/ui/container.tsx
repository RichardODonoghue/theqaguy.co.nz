import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="flex flex-col w-full p-4">
      <div className="border-2 border-border rounded-2xl flex-1 p-4">
        {children}
      </div>
    </div>
  );
};
