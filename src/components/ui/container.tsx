import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="flex flex-col w-full p-4">
      <div className="rounded-2xl flex-1 p-4 backdrop-blur-3xl bg-slate-700/30 shadow-2xl ">
        {children}
      </div>
    </div>
  );
};
