import clsx from 'clsx';
import * as React from 'react';
import { HomepageCallToAction, HomepageCallToActionProps } from './homepage-call-to-action';

export interface CallToActionSchema {
  title: string;
  href: string;
  as?: string;
}

export interface HomepageSectionProps extends React.ComponentPropsWithoutRef<'section'> {
  className?: string;
  style?: React.CSSProperties;
  title: string;
  description?: string;
  callToAction?: HomepageCallToActionProps;
}

export const HomepageSection: React.FC<HomepageSectionProps> = ({
  children,
  className,
  style,
  title,
  description,
  callToAction,
  ...rest
}) => {
  return (
    <section className={clsx('space-y-9', className)} style={style} {...rest}>
      <header className="space-y-2">
        <h2 className="text-3xl lg:text-4xl font-semibold">{title}</h2>
        {description && <p className="text-lg lg:text-xl font-light">{description}</p>}
      </header>
      <section>{children}</section>
      {callToAction && (
        <footer>
          <HomepageCallToAction {...callToAction} />
        </footer>
      )}
    </section>
  );
};

export default HomepageSection;
