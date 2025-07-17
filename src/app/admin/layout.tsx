import { Background } from '@/components/ui/background';
import { Container } from '@/components/ui/container';
import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Background />
      <Container>{children}</Container>
    </>
  );
}
