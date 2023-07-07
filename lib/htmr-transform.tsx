import * as React from 'react';
import Link from 'next/link';
import { HtmrOptions } from 'htmr/src/types';
import clsx from 'clsx';

import { MessageBox } from '~/components/ui/message-box';

const htmrTransform: HtmrOptions['transform'] = {
  iframe: ({ className, title, ...rest }: JSX.IntrinsicElements['iframe']) => (
    <iframe
      title={title}
      className={clsx('w-full aspect-video rounded-lg drop-shadow-lg overflow-hidden', className)}
      {...rest}
    />
  ),
  pre: ({ className, ...rest }: JSX.IntrinsicElements['pre']) => (
    <pre
      className={clsx('rounded-lg drop-shadow-lg overflow-hidden lg:-mx-12', className)}
      {...rest}
    />
  ),
  figure: ({ className, ...rest }: JSX.IntrinsicElements['figure']) => (
    <figure className={clsx('not-prose space-y-2 text-center lg:-mx-12', className)} {...rest} />
  ),
  figcaption: ({ className, ...rest }: JSX.IntrinsicElements['figcaption']) => (
    <figcaption className={clsx('text-sm', className)} {...rest} />
  ),
  img: ({ className, alt, ...rest }: JSX.IntrinsicElements['img']) => (
    <img
      className={clsx('mx-auto rounded-lg drop-shadow-lg bg-chungking-grey-800', className)}
      alt={alt}
      {...rest}
    />
  ),
  div: (node: React.ComponentPropsWithoutRef<'div'>) => {
    const { className: cn, children, ...rest } = node;

    if (cn?.includes('message')) {
      if (cn.includes('message--warning')) {
        return (
          <MessageBox variant="warning" {...rest}>
            {children}
          </MessageBox>
        );
      }

      return (
        <MessageBox variant="default" {...rest}>
          {children}
        </MessageBox>
      );
    }

    return <div {...rest}>{children}</div>;
  },
  a: (node: JSX.IntrinsicElements['a']) => {
    const { href, children, ref, ...rest } = node;

    if (href) {
      if (href.substr(0, 4) === 'http') {
        return (
          <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" {...rest}>
            {children}
          </a>
        );
      }

      return (
        <Link href={href} passHref {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a ref={ref} href={href} {...rest}>
        {children}
      </a>
    );
  },
};

export default htmrTransform;
