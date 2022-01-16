import clsx from 'clsx';
import * as React from 'react';
import { Container } from '.';

export interface HeroWrapperProps {
  className?: string;
}

export const HeroWrapper: React.FC<HeroWrapperProps> = ({ children, className }) => {
  return (
    <div className={clsx('relative px-6 pt-12', className)}>
      <Container>{children}</Container>
    </div>
  );
};
