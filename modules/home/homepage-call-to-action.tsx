import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import * as React from 'react';

export interface HomepageCallToActionProps extends LinkProps {
  className?: string;
  style?: React.CSSProperties;
  text: string;
}

export function HomepageCallToAction({
  children,
  className,
  style,
  href,
  as,
  text,
  ...rest
}: React.PropsWithChildren<HomepageCallToActionProps>) {
  return (
    <Link
      href={href}
      as={as}
      className={clsx('group text-chungking-turquoise-400 text-lg lg:text-xl', className)}
      {...rest}
    >
      <span className="group-hover:underline">{text}</span> <span>&rarr;</span>
    </Link>
  );
}
