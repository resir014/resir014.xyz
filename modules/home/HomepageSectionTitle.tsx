import * as React from 'react';
import { Heading, HeadingProps } from '@resir014/chungking-react';

interface HomepageSectionTitleProps extends HeadingProps {
  className?: string;
}

const HomepageSectionTitle: React.FC<HomepageSectionTitleProps> = ({
  children,
  className,
  ...rest
}) => (
  <Heading as="h2" variant="4xl" className={className} {...rest}>
    {children}
  </Heading>
);

export default HomepageSectionTitle;
