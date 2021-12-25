import * as React from 'react';
import { HomepageCallToAction, HomepageCallToActionProps } from './homepage-call-to-action';
import { Container, ContainerSizes } from '~/components/layout';

export interface CallToActionSchema {
  title: string;
  href: string;
  as?: string;
}

export interface HomepageSectionProps extends React.ComponentPropsWithoutRef<'section'> {
  className?: string;
  style?: React.CSSProperties;
  size?: ContainerSizes;
  title: string;
  description?: string;
  callToAction?: HomepageCallToActionProps;
}

export const HomepageSection: React.FC<HomepageSectionProps> = ({
  children,
  className,
  style,
  size = 'md',
  title,
  description,
  callToAction,
  ...rest
}) => {
  return (
    <section className={className} style={style} {...rest}>
      <Container className="space-y-9" size={size}>
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
      </Container>
    </section>
  );
};

export default HomepageSection;
