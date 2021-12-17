import * as React from 'react';
import { Box } from '@resir014/chungking-react';

interface HomepageSectionProps {
  className?: string;
  style?: React.CSSProperties;
}

const HomepageSectionFooter: React.FC<HomepageSectionProps> = ({
  children,
  className,
  style,
  ...rest
}) => (
  <Box className={className} style={style} {...rest}>
    {children}
  </Box>
);

export default HomepageSectionFooter;
