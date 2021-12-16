import * as React from 'react';
import { Box, BoxProps } from '@resir014/chungking-react';
import { Container } from '~/components/layout';

interface HomepageSectionProps extends BoxProps {
  className?: string;
  style?: React.CSSProperties;
  size?: 'md' | 'lg' | 'xl' | 'fluid';
}

const HomepageSection: React.FC<HomepageSectionProps> = ({
  children,
  className,
  style,
  size = 'fluid',
  ...rest
}) => (
  <Box as="section" className={className} style={style} {...rest}>
    <Container size={size}>{children}</Container>
  </Box>
);

export default HomepageSection;
