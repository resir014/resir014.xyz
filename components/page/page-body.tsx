import clsx from 'clsx';
import * as React from 'react';
import convert from 'htmr';
import { Container, ContainerProps } from '../layout';
import htmrTransform from '~/lib/htmr-transform';

export interface PageBodyProps extends React.ComponentPropsWithoutRef<'div'> {
  htmlContent?: string;
  containerSize?: ContainerProps['size'];
}

export const PageBody = React.forwardRef<HTMLDivElement, PageBodyProps>(
  ({ containerSize = 'md', children, className, htmlContent, ...rest }, ref) => {
    if (htmlContent) {
      return (
        <section className={clsx('px-4 lg:px-6 pt-12 pb-24', className)} ref={ref} {...rest}>
          <Container size={containerSize}>
            <div className="e-content prose lg:prose-lg prose-base prose-invert prose-chungking">
              {convert(htmlContent, {
                transform: htmrTransform,
              })}
            </div>
          </Container>
        </section>
      );
    }

    return (
      <section className={clsx('px-4 lg:px-6 pt-12 pb-24', className)} ref={ref} {...rest}>
        <Container size={containerSize}>
          <div className="e-content">{children}</div>
        </Container>
      </section>
    );
  }
);

PageBody.displayName = 'PageBody';
