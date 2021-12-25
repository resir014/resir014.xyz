import Link, { LinkProps } from 'next/link';
import * as React from 'react';

export interface HomepageCallToActionProps extends LinkProps {
  className?: string;
  style?: React.CSSProperties;
  text: string;
}

export const HomepageCallToAction: React.FC<HomepageCallToActionProps> = ({
  children,
  className,
  style,
  href,
  as,
  text,
  ...rest
}) => {
  return (
    <Link href={href} as={as} {...rest}>
      <a className="group text-chungking-turquoise-400 text-lg lg:text-xl">
        <span className="group-hover:underline">{text}</span>{' '}
        <span role="presentation">&rarr;</span>
      </a>
    </Link>
  );
};
