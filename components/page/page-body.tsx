import clsx from 'clsx';
import * as React from 'react';
import { Container, ContainerProps } from '../layout';

interface PageBodyProps extends React.ComponentPropsWithoutRef<'div'> {
  containerSize?: ContainerProps['size'];
}

export const PageBody = React.forwardRef<HTMLDivElement, PageBodyProps>(
  ({ containerSize = 'md', children, className, ...rest }, ref) => {
    return (
      <section className={clsx('px-4 pt-12 pb-24', className)} ref={ref} {...rest}>
        <Container size={containerSize}>
          <div className="e-content">{children}</div>
        </Container>
      </section>
    );
  }
);

PageBody.displayName = 'PageBody';
